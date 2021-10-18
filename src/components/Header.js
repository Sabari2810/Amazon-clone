import React from "react";
import Image from "next/image";
import {
  SearchIcon,
  ShoppingCartIcon,
  MenuIcon,
} from "@heroicons/react/outline";

const Header = () => {
  return (
    <header className="sticky top-0 z-50">
      {/* top nav */}
      <div className="bg-amazon_blue-default flex-grow flex items-center p-1 py-2 px-2">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
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
          <div className="link">
            <p>Hello, Sabari Manikandan</p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>
          <div className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>
          <div className="link flex relative items-center">
            <p className="absolute font-bold rounded-full bg-yellow-300 text-black top-0 left-8 h-4 items-center flex justify-center w-4">
              1
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
        <p className="flex items-center link">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
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
