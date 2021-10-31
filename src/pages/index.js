import { ArrowUpIcon } from "@heroicons/react/outline";
import Head from "next/head";
import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

export default function Home({ products }) {
  var scroll = 0;
  var scrollPrev = 0;
  const [isScrollingDown, setisScrollingDown] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      scrollPrev = scroll;
      scroll = window.scrollY;
      if (scrollPrev < scroll) {
        setisScrollingDown(true);
      } else {
        setisScrollingDown(false);
      }
    });
  }, []);
  return (
    <div className="bg-gray-200 h-full">
      <Head>
        <title>Amazon - Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="max-w-screen-2xl mx-auto">
        <Banner />

        <ProductFeed products={products} />
      </main>
      <Footer />
      {isScrollingDown && (
        <div
          onClick={() => {
            scrollTo({
              top: 0,
            });
          }}
          className="cursor-pointer fixed transition-all bg-gray-300 transform duration-200 right-2 bottom-2 z-50 rounded-full"
        >
          <ArrowUpIcon className="h-10 p-2" />
        </div>
      )}
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
