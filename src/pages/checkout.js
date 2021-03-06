import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import Currency from "react-currency-formatter";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import CustomDrawer from "../components/CustomDrawer";
import Header from "../components/Header";
import { selectItems, selectTotal } from "../slices/BasketSlice";
const stripePromise = loadStripe(process.env.stripe_key);

const Checkout = () => {
  const items = useSelector(selectItems);
  const { data: session } = useSession();
  const total = useSelector(selectTotal);
  const countGroup = {};
  const priceGroup = {};
  items.forEach((item) => {
    if (countGroup[item?.id]) {
      countGroup[item?.id] += 1;
    } else {
      countGroup[item?.id] = 1;
    }

    if (priceGroup[item?.id]) {
      priceGroup[item?.id] += item.price;
    } else {
      priceGroup[item?.id] = item.price;
    }
  });

  var flag = [];
  var groupedItems = [];
  // items.forEach((item) => {
  //   if (!flag.includes(item.id)) {
  //     flag.push(item.id);
  //     groupedItems.push({
  //       ...item,
  //       quantity: countGroup[item.id],
  //       amount: priceGroup[item.id],
  //     });
  //   }
  // });

  for (var i = 0; i < items.length; i++) {
    if (!flag.includes(items[i].id)) {
      flag.push(items[i].id);
      groupedItems.push({
        ...items[i],
        quantity: countGroup[items[i].id],
        amount: priceGroup[items[i].id],
      });
    }
  }

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: groupedItems,
      email: session.user.email,
    });

    const id = checkoutSession.data.id;
    console.log(`id`, id);
    const res = await stripe.redirectToCheckout({
      sessionId: id,
    });

    if (res.error) alert((await res).error.message);
  };
  return (
    <div className="bg-gray-100 h-full">
      <Head>
        <title>Amazon - checkout</title>
      </Head>
      <Header />

      <div className="lg:flex max-w-screen-2xl h-auto mx-auto relative">
        {/* left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />

          <div className="bg-white p-5 flex flex-col space-y-10">
            <h1 className="text-3xl border-b pb-5">
              {items.length === 0
                ? "Your Amazon Basket is empty"
                : "Shopping Basket"}
            </h1>
            {groupedItems.map((item, i) => {
              // if (!rendered.includes(item.id)) {
              //   rendered.push(item.id);
              return (
                <CheckoutProduct
                  id={item.id}
                  image={item.image}
                  title={item.title}
                  count={item.quantity}
                  category={item.category}
                  description={item.description}
                  rating={item.rating}
                  hasPrime={item.hasPrime}
                  price={item.price}
                  key={item.id}
                />
              );
              // }
            })}
          </div>
        </div>
        {items.length > 0 && (
          <div className="flex sticky flex-col top-20 h-full right-0 bg-white p-10">
            {items.length > 0 && (
              <>
                <h2 className="whitespace-nowrap">
                  Subtotal ({items.length} items) :{" "}
                  <span className="font-bold">
                    <Currency quantity={total * 60} currency="INR" />
                  </span>
                </h2>
                <button
                  role="link"
                  onClick={createCheckoutSession}
                  disabled={!session}
                  className={`button mt-2 ${
                    !session &&
                    " from-gray-200 border-gray-200  focus:ring-gray-200 cursor-not-allowed to-gray-400"
                  }`}
                >
                  {!session ? "Sign in to Checkout" : "Proceed to Checkout"}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
