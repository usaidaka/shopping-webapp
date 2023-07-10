import { BuildingStorefrontIcon, TagIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios'
import { Carousel } from "flowbite-react";
import { Pagination } from "flowbite-react";
import cateogryIllustration from "../../assets/3487927.png"
import toRupiah from "@develoka/angka-rupiah-js";
import { Link } from "react-router-dom";

import withAuth from "../../withAuth";

const Category = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [sortValue, setSortValue] = useState("createdAt")
  const [orderValue, setOrderValue] = useState("desc")

  useEffect(() => {
    axios.get(`http://localhost:8000/api/order-line/top-selling/${categoryId}`).then((res) => {
      setTopProducts(res.data.data);
    });
  }, [categoryId]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/category").then((res) => {
      setCategoryOptions(res.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/products?page=${currentPage}&category=${categoryId}&search=&sortBy[${sortValue}]=${orderValue}`
      )
      .then((res) => {
        setProductsByCategory(res.data);
        setTotalPage(Math.ceil(res.data.pagination.totalData / 9));
      });
  }, [
    categoryId,
    sortValue,
    orderValue,
    currentPage,
  ]);

  function handlePage(page) {
    setCurrentPage(page);
  }

  function handleSort(value) {
    setSortValue(value);
  }

  function handleOrder(value) {
    setOrderValue(value);
  }

  const handleCategorySelect = (value) => {
    setCategoryId(value)
  }

  if(categoryId === "") {
    return (
      <div className="mx-3 ">
      <form className="flex gap-2">
        <select className="border-1 border-green-soft w-full rounded-md" onChange={(e) => handleCategorySelect(e.target.value)}>
          <option value="">--Select Category--</option>
          {categoryOptions.result?.map((category) => (
            <option key={category.id} value={category.id}>{category.category_name}</option>
          ))}
        </select>
      </form>
      <form className="gap-2 flex w-full mt-3 ">
        <select
          name=""
          id=""
          placeholder="Sort by"
          className="border-1 border-green-soft w-full rounded-md "
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="createdAt">--Sort by--</option>
          <option value="name_item">Alphabet</option>
          <option value="price">Price</option>
        </select>
        <select
          name=""
          id=""
          placeholder="Order by"
          className="border-1 border-green-soft w-full rounded-md"
          onChange={(e) => handleOrder(e.target.value)}
        >
          <option value="desc">--Order by--</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </form>
      <div className="w-fulll flex justify-center mt-16 mb-8 font-bold">Please Select A Category</div>
      <div className="w-full flex justify-center mb-24">
        <img src={cateogryIllustration} alt="Select a Category" className="w-80 h-80"/>
      </div>
      </div>
    )
  }

  const customTheme = {
    root: {
      base:"relative h-full w-full",
      leftControl:
        "absolute top-0 left-0 flex h-full items-center justify-center px-4 focus:outline-none bg-white/0",
      rightControl:
        "absolute top-0 right-0 flex h-full items-center justify-center px-4 focus:outline-none bg-white/0",
    },
    indicators: {
      active: {
        off: "bg-black/50 hover:bg-black/70 dark:bg-gray-800/50 dark:hover:bg-gray-800",
        on: "bg-black",
      },
      base: "h-2 w-2 rounded-full",
    },
  };
  const isTopSellingExist = topProducts[0]?.Product;
  return (
    <div className="mx-3 ">
      <form className="flex gap-2">
        <select className="border-2 w-full rounded-md" onChange={(e) => handleCategorySelect(e.target.value)}>
          <option value="">--Select Category--</option>
          {categoryOptions.result?.map((category) => (
            <option key={category.id} value={category.id}>{category.category_name}</option>
          ))}
        </select>
      </form>
      <form className="gap-2 flex w-full mt-3 ">
        <select
          name=""
          id=""
          placeholder="Sort by"
          className="border-2 w-full rounded-md "
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="">--Sort by--</option>
          <option value="name_item">Alphabet</option>
          <option value="price">Price</option>
        </select>
        <select
          name=""
          id=""
          placeholder="Order by"
          className="border-2 w-full rounded-md"
          onChange={(e) => handleOrder(e.target.value)}
        >
          <option value="">--Order by--</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </form>
      <div className="mt-10 font-bold ml-40">
        Top Selling Products
      </div>
      {topProducts.length === 0 ? (<div className="ml-40 mt-5">No products in this category are sold</div>) : (
      <div className="flex justify-center items-center mt-0 w-full h-52">
        <Carousel theme={customTheme}>
          {isTopSellingExist === null ? (
            <div className="w-60 h-[100px] justify-center items-center grid  mx-auto shadow-lg rounded-md lg:w-[800px] transition-all hover:bg-slate-200">
              <div className="flex justify-center items-center bg-inherit">
                <h1 className="bg-inherit">no purchases yet</h1>
              </div>
            </div>
          ) : (
            topProducts.map((product) => (
              <Link to={`/products/${product?.Product?.id}`} className="bg-inherit">
              <div key={product?.Product?.id}>
                <div
                  key={product?.Product?.id}
                  className="w-60 h-[120px]  grid grid-cols-4 grid-rows-4 mx-auto shadow-lg rounded-md lg:w-[800px] transition-all hover:bg-slate-200"
                >
                  <div className="justify-center flex row-span-4 items-center col-span-1 bg-inherit">
                    <img
                      src={product?.Product?.image_product}
                      alt=""
                      className="object-contain h-[120px] bg-inherit"
                    ></img>
                  </div>
                  <div className="row-span-1 col-span-3 bg-inherit">
                    <p className="font-bold whitespace-nowrap overflow-hidden text-ellipsis py-auto px-[10px] bg-inherit">
                      {product?.Product?.name_item}
                    </p>
                  </div>
                  <div className="row-span-1 col-span-3 bg-inherit">
                    <p className="whitespace-nowrap overflow-hidden text-ellipsis py-auto px-[10px] bg-inherit">
                      {product?.Product?.product_description}
                    </p>
                  </div>
                  <div className="flex row-span-1 col-span-3 bg-inherit">
                    <BuildingStorefrontIcon className="w-6 bg-inherit text-gray-500 ml-[10px]"/>
                    <p className="whitespace-nowrap overflow-hidden text-ellipsis py-auto px-[10px] bg-inherit text-gray-500">
                      {product?.Product?.User?.store_name}
                    </p>
                  </div>
                  <div className="row-span-1 col-span-2 bg-inherit">
                    <p className="row-span-1 font-bold py-auto text-green-400 px-[10px] bg-inherit">
                      {toRupiah(product?.Product?.price)}
                    </p>
                  </div>
                  <div className="flex justify-end col-span-1 bg-inherit">
                    <TagIcon className="w-6 text-gray-500 bg-inherit" />
                    <div className="py-auto bg-inherit px-[10px] text-gray-500">
                      {product?.count}
                    </div>
                  </div>
                </div>
              </div>
              </Link>
            ))
          )}
        </Carousel>
      </div>
      )}
      <div className="mt-10 mb-5 font-bold ml-40">Products</div>
      {productsByCategory.data?.length === 0 ? (<div className="ml-40">No products to be displayed</div>) : (
      <>
      <div className="w-full lg:w-auto flex gap-[22px] flex-wrap justify-center mx-auto after:w-[160px] lg:after:w-[500px] mb-20">
        {productsByCategory.data?.map((product) => (
          <div
            key={product.id}
            className="hover:bg-slate-200 rounded-md transition-all"
          >
            <Link to={`/products/${product.id}`} className="bg-inherit">
              <div
                key={product.id}
                className="grid grid-rows-13 lg:grid-rows-4 lg:grid-cols-3 h-[260px] lg:h-[150px] w-[160px] lg:w-[500px] rounded-md shadow-lg bg-inherit"
              >
                <div className="row-span-8 lg:row-span-4 lg:col-span-1 flex justify-center bg-inherit">
                  <img
                    src={product.image_product}
                    alt="product"
                    className="h-[160px] lg:h-[150px] bg-inherit"
                  />
                </div>
                <div className="row-span-2 lg:row-span-1 lg:col-span-2 w-[160px] lg:w-auto bg-inherit">
                  <p className="font-bold px-[10px] whitespace-nowrap overflow-hidden text-ellipsis py-auto lg:mt-1 bg-inherit">
                    {product.name_item}
                  </p>
                </div>
                <div className="row-span-1 lg:row-span-1 lg:col-span-2 w-[160px] lg:w-auto bg-inherit">
                  <p className="px-[10px] whitespace-nowrap overflow-hidden text-ellipsis py-auto lg:mt-1 bg-inherit">
                    {product.product_description}
                  </p>
                </div>
                <div className="flex row-span-1 w-[160px] lg:row-span 1 lg:col-span-2 lg:w-auto bg-inherit">
                  <BuildingStorefrontIcon className="w-6 bg-inherit text-gray-500 ml-[10px]"/>
                  <p className="px-[10px] whitespace-nowrap overflow-hidden text-ellipsis text-gray-500 py-auto lg:mt-1 bg-inherit">
                    {product.User?.store_name}</p>
                </div>
                <div className="row-span-1 lg:row-span-1 lg:col-span-2 w-[160px] lg:w-auto bg-inherit">
                  <p className="font-bold px-[10px]  py-auto text-green-400 lg:mt-1 bg-inherit">
                    {toRupiah(product.price)}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-center mb-20">
        <Pagination
          currentPage={currentPage}
          onPageChange={handlePage}
          totalPages={totalPage}
        />
      </div>
      </>
      )}
    </div>
  );
};

export default withAuth(Category);
