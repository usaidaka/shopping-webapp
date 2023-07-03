import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TopSellingProduct from "../sub component/HomePage/TopSellingProduct";
import axios from "axios";
import { ProductCard } from "../sub component/HomePage/ProductCard";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [getByCategory, setGetByCategory] = useState("")

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products?limit=15").then((res) => {
      setCategories(res.data);
    });
  }, []);

  const uniqueCategories = [...new Set(categories.map((category) => category.category))]

  function onClickCategory(cat) {
    setGetByCategory(cat)
  }
  return (
    <div className="mx-3">
      <form className="flex gap-[10px]">
        <input
          type="text"
          placeholder="Search"
          className="border-1 w-full rounded-md border-green-soft"
        />
        <button className="bg-green-strong h-[44px] w-[44px] rounded-md flex justify-center items-center">
          <MagnifyingGlassIcon className="text-yellow-active bg-inherit w-4" />
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
      <div>
        <TopSellingProduct />
      </div>
      <div className="w-auto flex justify-center">
        <div className="flex overflow-x-auto gap-[10px] mt-[10px] mb-[20px]">
          <button onClick={() => {onClickCategory(``)}} className="bg-green-soft text-white w-auto px-[10px] text-center rounded-[6px]">All</button>
          {uniqueCategories.map((category) => (
           <button onClick={() => {onClickCategory(`category/${category}`)}} className="flex-none bg-green-soft text-white w-auto px-[10px] text-center rounded-[6px]" key={category}>{category}</button> 
          ))}
        </div>
      </div>
      <div className="flex w-[342px] gap-[10px] mx-auto mb-[20px] lg:w-auto justify-center">
        <div>
            <select id="sortby" className="h-[32x] rounded-[6px] lg:w-[400px] border-green-soft">
                <option value="">-Sort By-</option>
                <option value="alphabet" id="alphabet">Alphabet</option>
                <option value="price" id="price">Price</option>
            </select>
        </div>
        <div>
            <select id="orderby" className="h-[32x] rounded-[6px] lg:w-[400px] border-green-soft">
                <option value="">-Order By-</option>
                <option value="ascending" id="ascending">Ascending</option>
                <option value="descending" id="descending">Descending</option>
            </select>
        </div>
        <button className="w-[100px] bg-green-strong rounded-[6px] text-yellow-active">Go</button>
      </div>
      <div>
        <ProductCard category={getByCategory}/>
      </div>
    </div>
  );
};

export default HomePage;
