import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "flowbite-react";

import toRupiah from "@develoka/angka-rupiah-js";
import { Link } from "react-router-dom";

export const ProductCard = (props) => {
  const [productData, setProductData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/products?page=${currentPage}&category=${props.category}&search=${props.searchInput}&sortBy[${props.sort.sortBy}]=${props.sort.orderBy}`
      )
      .then((res) => {
        setProductData(res.data);
        setTotalPage(Math.ceil(res.data.pagination.totalData / 9));
      });
  }, [
    props.category,
    props.searchInput,
    props.sort.sortBy,
    props.sort.orderBy,
    currentPage,
  ]);

  function handlePage(page) {
    setCurrentPage(page);
  }

  if (!totalPage) {
    return <p></p>;
  }

  return (
    <>
      <div className="w-full lg:w-auto flex gap-6 flex-wrap justify-center mx-auto after:w-[160px] lg:after:w-[500px] mb-20">
        {productData.data?.map((product) => (
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
                <div className="row-span-1 w-[160px] lg:row-span 1 lg:col-span-2 lg:w-auto bg-inherit">
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
  );
};
