import '../styles/globals.css'
import Layout from '../components/layout/Layout'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Next Meetup Page</title>
        <meta name='description' content='Brouse a Huge List of Highly active React Meetups ' />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
