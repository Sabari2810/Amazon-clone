import React from "react";
import Header from "../../components/Header";
import Image from "next/image";
import { getProviders } from "next-auth/react";
import { signIn as LogIn } from "next-auth/react";
import Head from "next/head";

const SignIn = ({ providers }) => {
  return (
    <div>
      <Head>
        <title>Amazon - SignIn</title>
      </Head>
      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col items-center">
          <Image
            onClick={() => router.push("/")}
            src="https://cdn.worldvectorlogo.com/logos/amazon-2.svg"
            height={100}
            width={100}
            objectFit="contain"
            className="cursor-pointer"
          />
          <div className="border p-4 w-80">
            <p className="font-normal text-3xl">Sign-In</p>
            <div className="mt-2">
              {Object.values(providers).map((provider) => (
                <button
                  onClick={() =>
                    LogIn(provider.id, {
                      callbackUrl: "/",
                    })
                  }
                  className="button"
                >
                  Sign in with {provider.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default SignIn;
