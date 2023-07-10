import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TopSellingProduct from "../subComponent/HomePage/TopSellingProduct";
import axios from "axios";
import { ProductCard } from "../subComponent/HomePage/ProductCard";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [getByCategory, setGetByCategory] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("createdAt");
  const [orderValue, setOrderValue] = useState("desc");

  useEffect(() => {
    axios.get("http://localhost:8000/api/category").then((res) => {
      setCategories(res.data);
    });
  }, []);

  function onClickCategory(cat) {
    setGetByCategory(cat);
  }

  function handleSearch(value) {
    setSearchValue(value);
  }

  function handleSort(value) {
    setSortValue(value);
  }

  function handleOrder(value) {
    setOrderValue(value);
  }

  return (
    <div className="mx-3 ">
      <form className="flex lg:justify-center gap-2">
        <input
          type="text"
          placeholder="Search"
          className="border-1 w-full rounded-md border-green-soft lg:w-1/2"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </form>
      <header className="flex justify-center">
        <div className="flex w-full mt-4 lg:w-[800px]">
          <h1 className="text-md font-bold text-lg">
            Top Selling Product
          </h1>
        </div>
      </header>
      <div>
        <TopSellingProduct />
      </div>
      <div className="w-auto flex justify-center">
        <div className="flex overflow-x-auto gap-2.5 mt-8 no-scrollbar">
          <button
            onClick={() => {
              onClickCategory(``);
            }}
            className="bg-green-soft text-white w-auto px-[10px] text-center rounded-[6px] hover:text-yellow-active hover:bg-green-strong transition-all"
          >
            All
          </button>
          {categories.result?.map((category) => (
            <button
              onClick={() => {
                onClickCategory(`${category.id}`);
              }}
              className="flex-none bg-green-soft text-white w-fit px-[10px] text-center rounded-[6px] hover:text-yellow-active hover:bg-green-strong transition-all"
              key={category.id}
            >
              {category.category_name}
            </button>
          ))}
        </div>
      </div>
      <div className="flex w-full gap-2 mx-auto my-8 lg:w-auto justify-center ">
        <div>
          <select
            id="sortby"
            className="h-[32x] w-24 rounded-[6px] lg:w-[400px] border-green-soft"
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="createdAt">--Sort By--</option>
            <option value="name_item" id="alphabet">
              Alphabet
            </option>
            <option value="price" id="price">
              Price
            </option>
          </select>
        </div>
        <div>
          <select
            id="orderby"
            className="h-[32x] w-24 rounded-[6px] lg:w-[400px] border-green-soft"
            onChange={(e) => handleOrder(e.target.value)}
          >
            <option value="desc">--Order By--</option>
            <option value="asc" id="ascending">
              Ascending
            </option>
            <option value="desc" id="descending">
              Descending
            </option>
          </select>
        </div>
      </div>
      <div>
        <ProductCard
          category={getByCategory}
          searchInput={searchValue}
          sort={{ sortBy: sortValue, orderBy: orderValue }}
        />
      </div>
    </div>
  );
};

export default HomePage;
