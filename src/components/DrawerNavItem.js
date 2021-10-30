import { ArrowRightIcon } from "@heroicons/react/solid";

const DrawerNavItem = ({ label, show = true, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex mt-2 hover:bg-gray-200 items-center cursor-pointer justify-between py-3"
    >
      <p className="pl-6 text-sm text-black font-semibold">{label}</p>
      {show && <ArrowRightIcon className="h-6 pr-6 text-black" />}
    </div>
  );
};

export default DrawerNavItem;
