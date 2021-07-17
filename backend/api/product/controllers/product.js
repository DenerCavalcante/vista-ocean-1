const { sanitizeEntity } = require('strapi-utils');
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
  async create(ctx){
    const { product } = ctx.request.body
    if(!product){
      return ctx.throw(400, 'Please specify a product')
    }

    const realProduct = await strapi.services.product.findOne({ id: product.id})
    if(!realProduct) {
      return ctx.throw(404, 'Noproduct with sush id')
    }

    const { user } = ctx.state

    const BASE_URL = ctx.request.headers.origin || 'http://localhost:3000'

    const session = await stripe.checkout.session.create({
      payment_method_types: ['card'],
      customer_email: user.email,
      mode:'payment',
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



    return  entities.map(entity => sanitizeEntity( entity, { model: strapi.models.product }));
  },
  async findWithCover(ctx) {
    const entities = await strapi.services.product.find({
      _where: [{
       // // cover: true
      }]
    });


    return  entities.map(entity => sanitizeEntity( entity, { model: strapi.models.product }));
  },
};
