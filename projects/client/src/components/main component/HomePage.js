import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TopSellingProduct from "../sub component/HomePage/TopSellingProduct";
import axios from "axios";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products?limit=5").then((res) => {
      setCategories(res.data);
    });
  }, []);
  return (
    <div className="mx-3">
      <form className="flex gap-2">
        <input
          type="text"
          placeholder="Search"
          className="border-2 w-full rounded-md"
        />
        <button className="bg-green-strong h-7 w-7 rounded-md flex justify-center items-center">
          <MagnifyingGlassIcon className="text-yellow-active bg-inherit w-4  " />
        </button>
      </form>
      <header>
        <div className="flex justify-between items-end mt-2">
          <h1 className="text-md font-bold">Top Selling Product</h1>
          <Link to="" className="text-sm">
            See All
          </Link>
        </div>
      </header>
      <div className="mt-2 h-28 w-full ">
        <TopSellingProduct />
      </div>
      <div></div>
    </div>
  );
};

export default HomePage;
