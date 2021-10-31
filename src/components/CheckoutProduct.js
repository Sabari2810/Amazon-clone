import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/BasketSlice";
import { PlusIcon } from "@heroicons/react/outline";
import { MinusIcon } from "@heroicons/react/outline";

const CheckoutProduct = ({
  id,
  title,
  category,
  description,
  price,
  image,
  rating,
  count,
  hasPrime,
}) => {
  const dispatch = useDispatch();
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
  const removeProductFromBasket = () => {
    dispatch(removeFromBasket({ id }));
  };
  return (
    <div className="sm:grid flex flex-col sm:flex-row items-center grid-cols-5">
      <Image src={image} width={200} height={200} objectFit="contain" />
      <div className="col-span-3 mx-4">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map(() => (
              <StarIcon className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="line-clamp-2 text-xs my-2">{description}</p>
        <Currency quantity={price * 60} currency="INR" />

        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              src="https://links.papareact.com/fdw"
              className="w-12"
              alt=""
            />
            <p className="text-xs text-gray-400">FREE Next-Day delivery</p>
          </div>
        )}
      </div>

      <div className="flex mt-2 flex-col items-center sm:my-auto space-y-2 justify-self-end">
        <div className="flex">
          <button onClick={removeProductFromBasket} className="mt-auto button">
            <MinusIcon className="h-5" />
          </button>
          <p className="my-2 mx-2">{count}</p>
          <button onClick={addProductToBasket} className="mt-auto button">
            <PlusIcon className="h-5" />
          </button>
        </div>
        <div>
          <Currency quantity={price * count * 60} currency="INR" />
        </div>
      </div>
    </div>
  );
};

export default CheckoutProduct;
