import { CheckCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React from "react";
import CustomDrawer from "../components/CustomDrawer";
import Header from "../components/Header";

const success = () => {
  const router = useRouter();
  return (
    <div className="bg-gray-100 h-screen">
      <Header />
      <CustomDrawer />
      <main className="max-w-screen-lg mx-auto">
        <div className="p-10 flex flex-col bg-white">
          <div className="flex items-center space-x-2">
            <CheckCircleIcon className="text-green-500 h-10" />
            <h1 className="text-3xl">
              Thank you!, Your order has been confirmed
            </h1>
          </div>
          <p className="mt-5">
            Thank you for shopping with us. We'll send a confirmation once your
            order has been shipped. If you would like to check the status of
            your order(s), please press the link below.
          </p>
          <button
            onClick={() => router.push("/orders")}
            className="button mt-4"
          >
            Go to My orders
          </button>
        </div>
      </main>
    </div>
  );
};

export default success;
