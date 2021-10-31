import React, { useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/BasketSlice";

const MAX_RATE = 5;
const MIN_RATE = 1;

const Product = ({ id, title, category, description, price, image }) => {
  const dispatch = useDispatch();
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATE - MIN_RATE) + 1)
  );
  const [hasPrime] = useState(Math.random() < 0.5);

  const addProductToBasket = () => {
    const product = {
      id,
      title,
      category,
      description,
      price,
      image,
      rating,
      hasPrime,
    };
    dispatch(addToBasket(product));
  };

  return (
    <div className="bg-white z-30 hover:scale-105 duration-200 relative rounded-md flex flex-col m-5 p-10">
      <p className="absolute top-2 right-2 text-xs italic">{category}</p>
      <div className="border rounded-lg flex p-2 justify-center">
        <Image
          className="hover:scale-150 duration-200"
          src={image}
          height={200}
          width={200}
          objectFit="contain"
        />
      </div>

      <h4 className="my-2">{title}</h4>

      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon className="h-5 text-yellow-500" />
          ))}
      </div>

      <p className="text-xs my-2 line-clamp-2">{description}</p>

      <div className="mb-5">
        <Currency quantity={price * 60} currency="INR" />
      </div>

      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img src="https://links.papareact.com/fdw" className="w-12" alt="" />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}

      <button onClick={addProductToBasket} className="mt-auto button">
        Add to Basket
      </button>
    </div>
  );
};

export default Product;
