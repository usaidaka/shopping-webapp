import {
  HomeIcon,
  ListBulletIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const FooterMobile = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 lg:hidden ">
      <div className="bg-green-strong w-screen h-12 grid grid-cols-4 justify-center items-center">
        <div
          className={`bg-inherit ${
            location.pathname === "/homepage"
              ? "text-yellow-active"
              : "text-white"
          } col-span-1`}
        >
          <Link
            to="/homepage"
            className="bg-inherit flex flex-col justify-center items-center"
          >
            <HomeIcon className="w-6 mt-1 bg-inherit" />
            <h1 className="bg-inherit text-xs ">Home</h1>
          </Link>
        </div>
        <div
          className={`bg-inherit ${
            location.pathname === "/category"
              ? "text-yellow-active"
              : "text-white"
          } col-span-1`}
        >
          <Link
            to="/category"
            className="bg-inherit flex flex-col justify-center items-center"
          >
            <ShoppingCartIcon className="w-6 mt-1 bg-inherit" />
            <h1 className="bg-inherit text-xs ">Category</h1>
          </Link>
        </div>
        <div
          className={`bg-inherit ${
            location.pathname === "/cart" ? "text-yellow-active" : "text-white"
          } col-span-1`}
        >
          <Link
            to=""
            className="bg-inherit flex flex-col justify-center items-center"
          >
            <ListBulletIcon className="w-6 mt-1 bg-inherit" />
            <h1 className="bg-inherit text-xs ">Cart</h1>
          </Link>
        </div>
        <div
          className={`bg-inherit ${
            location.pathname === "/profile" ||
            location.pathname === "/profile/my-transaction" ||
            location.pathname === "/profile/store-transaction" ||
            location.pathname === "/profile/sell-product" ||
            location.pathname === "/profile/my-store" ||
            location.pathname === "/profile/my-store/edit-category" ||
            location.pathname === "/profile/my-store/edit-product"
              ? "text-yellow-active"
              : "text-white"
          } col-span-1`}
        >
          {/* nanti di rapihin ke /profile */}
          <Link
            to="/profile/my-transaction"
            className="bg-inherit flex flex-col justify-center items-center"
          >
            <UserIcon className="w-6 mt-1 bg-inherit" />
            <h1 className="bg-inherit text-xs ">Profile</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterMobile;
