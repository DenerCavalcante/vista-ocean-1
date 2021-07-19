import Head from "next/head"
import ProductsList from "../components/ProductsList"
import { getCovers, getProducts } from "../utils/api"

const HomePage = ({ products }) => {
  return (
    <div>
      <Head>
        <title>Vista Oceane - Barcos</title>
        <script>
        {/* document.addEventListener('stripe.ready', function() {
        stripe.api.session.setLanguage('pt-BR', {
            "payment": {
                "methods": {
                    "deferred_payment": "Pay at delivery"
                }
            }
        })
    }) */}
        </script>
      </Head>
      <ProductsList products={products} />
    </div>
  )
}

export async function getStaticProps() {
  const products = await getProducts()
  const covers = await getCovers()
  return { props: { products , covers} }
}

export default HomePage
