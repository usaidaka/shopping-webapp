import React from "react";
import { Link, useLocation } from "react-router-dom";

const CardNavbarEditCategory = () => {
  const location = useLocation();

  return (
    <div className="lg:col-span-1">
      <nav className="lg:bg-green-footer lg:h-52 lg:flex lg:items-center lg:rounded-md">
        <div className="grid grid-rows-4 w-full h-40 gap-2 lg:bg-inherit ">
          <Link
            to="/profile/my-transaction"
            className={`row-span-1 ${
              location.pathname === "/profile/my-transaction"
                ? "bg-green-strong"
                : "bg-green-soft"
            } ${
              location.pathname === "/profile/my-transaction"
                ? "text-yellow-active"
                : "text-white"
            }   mx-2 flex flex-col justify-center items-center rounded-md`}
          >
            <button className="">My Transaction</button>
          </Link>
          <Link
            to="/profile/store-transaction"
            className={`row-span-1 ${
              location.pathname === "/profile/store-transaction"
                ? "bg-green-strong"
                : "bg-green-soft"
            } ${
              location.pathname === "/profile/store-transaction"
                ? "text-yellow-active"
                : "text-white"
            }   mx-2 flex flex-col justify-center items-center rounded-md`}
          >
            <button>Store Transaction</button>
          </Link>
          <Link
            to="/profile/sell-product"
            className={`row-span-1 ${
              location.pathname === "/profile/sell-product"
                ? "bg-green-strong"
                : "bg-green-soft"
            } ${
              location.pathname === "/profile/sell-product"
                ? "text-yellow-active"
                : "text-white"
            }   mx-2 flex flex-col justify-center items-center rounded-md`}
          >
            <button>Sell Product</button>
          </Link>
          <Link
            to="/profile/my-store"
            className={`row-span-1 ${
              location.pathname === "/profile/my-store"
                ? "bg-green-strong"
                : "bg-green-soft"
            } ${
              location.pathname === "/profile/my-store"
                ? "text-yellow-active"
                : "text-white"
            }   mx-2 flex flex-col justify-center items-center rounded-md`}
          >
            <button>My Store</button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default CardNavbarEditCategory;
