import { collection, getDocs, orderBy, query } from "@firebase/firestore";
import moment from "moment";
import { getSession, useSession } from "next-auth/react";
import { db } from "../../firebase";
import Header from "../components/Header";
import Order from "../components/Order";
import Head from "next/head";
const orders = ({ orders }) => {
  console.log(`orders`, orders);
  const { data: session } = useSession();
  return (
    <div className="bg-gray-50 h-screen ">
      <Head>
        <title>Amazon - Your Orders</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b border-yellow-500 mb-2 pb-1">
          Your Orders
        </h1>

        {session ? (
          <h2 className="font-bold">{orders?.length} Orders</h2>
        ) : (
          <h2 className="font-bold">Please sign in to see your orders</h2>
        )}

        {session && (
          <div className="mt-2 space-y-4">
            {orders?.map(
              ({ id, amount, amountShipping, images, items, timestamp }) => (
                <Order
                  key={id}
                  id={id}
                  amount={amount}
                  amountShipping={amountShipping}
                  images={images}
                  items={items}
                  timestamp={timestamp}
                />
              )
            )}{" "}
          </div>
        )}
      </main>
    </div>
  );
};

export default orders;

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET);

  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  const q = query(
    collection(db, "users", session.user.email, "orders"),
    orderBy("timestamp", "desc")
  );
  const data = await getDocs(q);
  console.log(`data.docs`, data.docs);
  const stripeOrders = data.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  console.log(`stripeOrders`, stripeOrders);
  const orders = await Promise.all(
    stripeOrders.map(async (order) => ({
      id: order.id,
      amount: order.amount,
      amountShipping: order.amount_shipping,
      images: order.images,
      timestamp: moment(order.timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  return {
    props: {
      orders: orders,
    },
  };
}
