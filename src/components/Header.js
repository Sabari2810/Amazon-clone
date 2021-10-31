import React from "react";
import Image from "next/image";
import {
  SearchIcon,
  ShoppingCartIcon,
  MenuIcon,
} from "@heroicons/react/outline";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { selectItems } from "../slices/BasketSlice";
import { selectDrawerState, setIsDrawerOpen } from "../slices/DrawerSlice";
import { XIcon } from "@heroicons/react/solid";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);
  const dispatch = useDispatch();
  const isOpen = useSelector(selectDrawerState);

  return (
    <header className="sticky top-0 z-50">
      {isOpen && (
        <div className="absolute z-[999] top-0 left-80">
          <XIcon
            onClick={() => {
              setIsDrawerOpen(false);
            }}
            className="h-10 text-white cursor-pointer"
          />
        </div>
      )}
      {/* top nav */}
      <div className="bg-amazon_blue-default flex-grow flex items-center p-1 py-2 px-2">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            onClick={() => router.push("/")}
            src="https://links.papareact.com/f90"
            height={40}
            width={150}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>
        <div className="hidden sm:flex cursor-pointer h-10 flex-grow rounded-lg bg-yellow-400 items-center hover:bg-yellow-500">
          <input
            className="flex rounded-l-lg flex-grow p-2 h-full focus:outline-none"
            type="text"
          />
          <SearchIcon className="h-12 p-4 cursor-pointer" />
        </div>
        <div className="flex text-white items-center space-x-6 text-xs px-2">
          <div onClick={!session ? signIn : signOut} className="link">
            <p>{session ? `Hello, ${session?.user?.name}` : "Sign In"}</p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>
          <div onClick={() => router.push("/orders")} className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>
          <div
            onClick={() => router.push("/checkout")}
            className="link flex relative items-center"
          >
            <p className="absolute font-bold rounded-full bg-yellow-300 text-black top-0 left-8 h-4 items-center flex justify-center w-4">
              {items?.length}
            </p>
            <ShoppingCartIcon className="h-10" />
            <p className="font-extrabold md:text-sm hidden md:inline mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>
      {/* bottom nav */}
      <div className="bg-amazon_blue-light flex items-center p-2 pl-6 text-sm justify-start space-x-4 text-white">
        <p
          onClick={() => {
            dispatch(setIsDrawerOpen(true));
          }}
          className="relative flex items-center group link"
        >
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <div className="relative group">
          <p className="link">Prime Video</p>
          {/* <div className="absolute top-8 scale-0 group-focus:scale-100">
            <div className="">
              <div className="w-16 absolute top-0 left-10 overflow-hidden inline-block">
                <div className="w-3 h-3 bg-white origin-bottom-left transform rotate-45"></div>
              </div>
              <div className="w-40 p-2 bg-white text-black">
                <p>body</p>
                <p>body</p>
                <p>body</p>
                <p>body</p>
              </div>
            </div>
          </div> */}
        </div>
        <p className="link">Amazon Business</p>
        <p className="link">Today's Deals</p>
        <p className="link hidden lg:inline-block">Electronics</p>
        <p className="link hidden lg:inline-block">Food & Grocery</p>
        <p className="link hidden lg:inline-block">Shopper Toolkit</p>
        <p className="link hidden lg:inline-block">Health & Personal Care</p>
      </div>
    </header>
  );
};

export default Header;
