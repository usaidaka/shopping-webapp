import {
  HomeIcon,
  ListBulletIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";

const FooterMobile = () => {
  return (
    <div className="fixed bottom-0 lg:hidden ">
      <div className="bg-green-strong w-screen h-12 grid grid-cols-4 justify-center items-center">
        <div className="bg-inherit text-white col-span-1">
          <Link
            to=""
            className="bg-inherit flex flex-col justify-center items-center"
          >
            <HomeIcon className="w-6 mt-1 bg-inherit" />
            <h1 className="bg-inherit text-xs ">Home</h1>
          </Link>
        </div>
        <div className="bg-inherit text-white col-span-1">
          <Link
            to=""
            className="bg-inherit flex flex-col justify-center items-center"
          >
            <ShoppingCartIcon className="w-6 mt-1 bg-inherit" />
            <h1 className="bg-inherit text-xs ">Category</h1>
          </Link>
        </div>
        <div className="bg-inherit text-white col-span-1">
          <Link
            to=""
            className="bg-inherit flex flex-col justify-center items-center"
          >
            <ListBulletIcon className="w-6 mt-1 bg-inherit" />
            <h1 className="bg-inherit text-xs ">Cart</h1>
          </Link>
        </div>
        <div className="bg-inherit text-white col-span-1">
          <Link
            to=""
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
