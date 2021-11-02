import { ExclamationCircleIcon } from "@heroicons/react/solid";
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
            <ExclamationCircleIcon className="text-red-500 h-10" />
            <h1 className="text-3xl">
              Oops!, Something went wrong during checkout
            </h1>
          </div>
          <button onClick={() => router.push("/")} className="button mt-4">
            Go to Home
          </button>
        </div>
      </main>
    </div>
  );
};

export default success;
