import React from "react";
import { Link } from "react-router-dom";

const CardNavbarEditCategory = () => {
  return (
    <div className="lg:col-span-1">
      <nav className="lg:bg-green-footer lg:h-52 lg:flex lg:items-center lg:rounded-md">
        <div className="grid grid-rows-4 w-full h-40 gap-2 lg:bg-inherit ">
          <Link
            to=""
            className="row-span-1 bg-green-soft text-white mx-2 flex flex-col justify-center items-center rounded-md "
          >
            <button className="">My Transaction</button>
          </Link>
          <Link
            to=""
            className="row-span-1 bg-green-soft text-white  mx-2 flex flex-col justify-center items-center rounded-md"
          >
            <button>Store Transaction</button>
          </Link>
          <Link
            to=""
            className="row-span-1 bg-green-soft text-white  mx-2 flex flex-col justify-center items-center rounded-md"
          >
            <button>Sell Product</button>
          </Link>
          <Link
            to=""
            className="row-span-1 bg-green-strong text-yellow-active   mx-2 flex flex-col justify-center items-center rounded-md"
          >
            <button>My Store</button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default CardNavbarEditCategory;
