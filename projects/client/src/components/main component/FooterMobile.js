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
      <div className="bg-green-strong w-screen h-16 grid grid-cols-4 justify-center items-center">
        <div className="bg-inherit text-white col-span-1">
          <Link
            to=""
            className="bg-inherit flex flex-col justify-center items-center"
          >
            <HomeIcon className="w-8 bg-inherit" />
            <h1 className="bg-inherit ">Home</h1>
          </Link>
        </div>
        <div className="bg-inherit text-white col-span-1">
          <Link
            to=""
            className="bg-inherit flex flex-col justify-center items-center"
          >
            <ShoppingCartIcon className="w-8 bg-inherit" />
            <h1 className="bg-inherit ">Category</h1>
          </Link>
        </div>
        <div className="bg-inherit text-white col-span-1">
          <Link
            to=""
            className="bg-inherit flex flex-col justify-center items-center"
          >
            <ListBulletIcon className="w-8 bg-inherit" />
            <h1 className="bg-inherit ">Cart</h1>
          </Link>
        </div>
        <div className="bg-inherit text-white col-span-1">
          <Link
            to=""
            className="bg-inherit flex flex-col justify-center items-center"
          >
            <UserIcon className="w-8 bg-inherit" />
            <h1 className="bg-inherit ">Profile</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterMobile;
