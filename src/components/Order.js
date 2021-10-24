import moment from "moment";
import Currency from "react-currency-formatter";
import Image from "next/image";

const Order = ({ id, amount, amountShipping, images, items, timestamp }) => {
  return (
    <div className="relative border rounded-md">
      <div className="bg-gray-100 flex items-center text-gray-600 space-x-10 p-5">
        <div>
          <p className="text-xs font-bold">ORDER PLACED</p>
          <p>{moment.unix(timestamp).format("DD MMM YYYY")}</p>
        </div>
        <div className="">
          <p className="text-xs font-bold">TOTAL</p>
          <p>
            <Currency quantity={amount} currency="INR" /> - Next-Day Delivery{" "}
            <Currency quantity={amountShipping} currency="INR" />
          </p>
        </div>
        <p className="whitespace-nowrap self-end text-sm sm:text-xl text-right text-blue-400 flex-1">
          {items.length} items
        </p>

        <p className="absolute top-2 w-40 lg:w-72 truncate right-2 whitespace-nowrap">
          ORDER # {id}
        </p>
      </div>
      <div>
        <div className="p-5 flex space-x-6 overflow-x-auto">
          {images.map((image) => (
            <img
              src={image}
              className="h-20 hover:scale-110 duration-150 ease-out sm:h-32 object-contain"
            ></img>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
