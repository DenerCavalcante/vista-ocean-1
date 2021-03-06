import App from "next/app"
import Head from "next/head"
import Layout from "../components/Layout"
import { getCategories } from "../utils/api"
import "../styles/index.css"
import React from "react"

const MyApp = ({ Component, pageProps }) => {


   React.useEffect(() => {

    // document.addEventListener("DOMContentLoaded", function(){

      document.addEventListener('snipcart.ready', function() {
        Snipcart.api.session.setCurrency('brl');
         Snipcart.api.session.setLanguage('pt-BR', {
            "payment": {
                "methods": {
                    "deferred_payment": "Pay at delivery"
                }
            }
        });
      })
    // });

    return null;
   })
  return (
    <Layout categories={pageProps.categories}>
      <Head>
        <link rel="preconnect" href="https://app.snipcart.com" />
        <link rel="preconnect" href="https://cdn.snipcart.com" />
        <link
          rel="stylesheet"
          href="https://cdn.snipcart.com/themes/v3.0.16/default/snipcart.css"
        />
        <script
          async
          src="https://cdn.snipcart.com/themes/v3.0.16/default/snipcart.js"
        />
        <script >
          
  
</script>
       
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So [[...slug]] pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx)
  // Fetch global site settings from Strapi
  const categories = await getCategories()
  // Pass the data to our page via props
  return { ...appProps, pageProps: { categories, path: ctx.pathname } }
 }

export default MyApp
