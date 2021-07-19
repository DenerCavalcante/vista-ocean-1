const { sanitizeEntity } = require('strapi-utils');
const config = require('strapi-utils/lib/config');
const stripe = require('stripe')(process.env.STRIPE_SK)

/**
 * Given a dollar amount, return the amount in cents
 * @param {number} number
 */
const fromDecimalToInt = (number) => parseInt(number * 100)

module.exports = {
  /**
   * Retrieve a record.
   *
   * @return {Object}
   */

  async findOne(ctx) {
    const { slug } = ctx.params;

    const entity = await strapi.services.product.findOne({ slug });
    return sanitizeEntity(entity, { model: strapi.models.product });
  },

  /**
   * create an order and sets up the stripe checkout sessions for the frontend
   * @param {any} ctx
   */
// module.exports = {
//   setUpStripe: async (ctx) => {
//     let total = 100
//     let validatedCart = []
//     let receiptCart = []

//     //Through ctx.request.body
//     //We will receive the products and the qty
//     const { cart } = ctx.request.body

//     await Promise.all(cart.map)(async product => {
//       const validatedProduct = await strapi.services.product.findOne({
//         id: product.id
//       })

//       console.log("validatedProduct", validatedCart)
//       if (validatedProduct) {
//         validatedProduct.qty = product.qty

//         validatedCart.push(validatedProduct)

//         receiptCart.push({
//           id: product.id,
//           qty: product.qty
//         })
//       }

//       return validatedProduct
//     }))

//     console.log("validatedCart", validatedCart)
//     //Use the data from strapi to calculate the price or each procuct
//     //Basically calculate the total that way

//     total = strapi.config.functions.cart.cartTotal(validatedCart)

//     console.log("total", total)


//     try {
//       const paymentIntent = await stripe.paymentIntents.create({
//         amount: total,
//         currency: 'usd',
//         //verify your integration in this quide by including this parameter
//         metadata: { cart: JSON.stringify(receiptCart) },
//       });
//       return paymentIntent
//     } catch (err) {
//       return { error: err.raw.message }
//     }
//   },

//   create: async (ctx) => {
//     const {
//       paymentIntent,

//       shipping_name,
//       shipping_address,
//       shipping_state,
//       shipping_country,
//       shipping_zip,

//       cart
//   } = ctx.request.body

//   // parament intent for validation
//   let paymentInfo

//   try{
//     paymentInfo = await stripe.paymentIntent.retrivel(paymentIntent.id)
//     if(paymentInfo.status !== 'succeeded'){
//       throw {message: "you still have to pay"}
//     }
//   } catch(err){
//     ctx.response.status = 402
//     return {error: err.message}
//   }

//   //check if paymentIntent was not already used to generate an order
//   const alreadyExistingOrder = await strapi.sertvices.order.find({
//     payment_intent_id: paymentIntent.id
//   })

//   if(alreadyExistingOrder && alreadyExistingOrder.length > 0){
//     ctx.response.status = 402
//     return {error: "This payment intent was already used"}
//   }

//   const payment_intent_id = paymentIntent.id
//   //Check if the data is proper
//   console.log("order.create cart", cart)
//   let product_qty = []
//   let products = []
//   let sanitizedCart = []

//   await Promise.all(cart.map(async product => {
//   }))

//   console.log("order.create product_qty", product_qty)
//   console.log("order.create products", products)
//   console.log("order.create sanitizedCart", sanitizedCart)

//   //Fetch the products and add then to the products array, also set up product_qty

//   let subtotal_in_cents = strapi.config.function.cart.cartSubtotal(sanitizedCart)
//   let taxes_in_cents = strapi.config.function.cart


// }
  async create(ctx) {
    const { product } = ctx.request.body
    if (!product) {
      return ctx.throw(400, 'Please specify a product')
    }

    const realProduct = await strapi.services.product.findOne({ id: product.id })
    if (!realProduct) {
      return ctx.throw(404, 'Noproduct with sush id')
    }

    const { user } = ctx.state

    const BASE_URL = ctx.request.headers.origin || 'http://localhost:3000'

    const session = await stripe.checkout.session.create({
      payment_method_types: ['card'],
      customer_email: user.email,
      mode: 'payment',
      success_url: `${BASE_URL}/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: BASE_URL,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: realProduct.name
            },
            unit_amount: fromDecimalToInt(realProduct.price)
          },
          quantity: 1
        }
      ]
    })
    const newOrder = await strapi.service.order.create({
      user: user.id,
      product: realProduct.price,
      status: 'unpaid',
      checkout_session: session.id
    })

    return { id: session.id }

  },


  async findWithNotCover(ctx) {
    const entities = await strapi.services.product.find({
      _where: [{
        // // cover: false
      }]
    });



    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.product }));
  },
  async findWithCover(ctx) {
    const entities = await strapi.services.product.find({
      _where: [{
        // // cover: true
      }]
    });


    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.product }));
  },
};
