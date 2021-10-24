import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

export default function Home({ products }) {
  return (
    <div className="min-h-screen bg-gray-200">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="max-w-screen-2xl mx-auto">
        <Banner />
        {/* banner */}

        <ProductFeed products={products} />
        {/* product feed */}
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );
  return {
    props: {
      products,
    },
  };
}
