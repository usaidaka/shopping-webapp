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
      <div className="w-full lg:w-auto flex gap-[22px] flex-wrap justify-center mx-auto after:w-[160px] lg:after:w-[500px] mb-20">
        {productData.data?.map((product) => (
          <div key={product.id}>
            <Link to={`/products/${product.id}`}>
              <div
                key={product.id}
                className="grid grid-rows-13 lg:grid-rows-3 lg:grid-cols-3 h-[260px] lg:h-[150px] w-[160px] lg:w-[500px] rounded-md shadow-lg"
              >
                <div className="row-span-8 lg:row-span-3 lg:col-span-1 flex justify-center">
                  <img
                    src={product.image_product}
                    alt="product"
                    className="h-[160px] lg:h-[150px]"
                  />
                </div>
                <div className="row-span-2 lg:row-span-1 lg:col-span-2 w-[160px] lg:w-auto">
                  <p className="font-bold px-[10px] whitespace-nowrap overflow-hidden text-ellipsis py-auto lg:mt-[13px]">
                    {product.name_item}
                  </p>
                </div>
                <div className="row-span-2 lg:row-span-1 lg:col-span-2 w-[160px] lg:w-auto">
                  <p className="px-[10px] whitespace-nowrap overflow-hidden text-ellipsis py-auto lg:mt-[13px]">
                    {product.product_description}
                  </p>
                </div>
                <div className="row-span-1 lg:row-span-1 lg:col-span-2 w-[160px] lg:w-auto">
                  <p className="font-bold px-[10px]  py-auto text-green-400 lg:mt-[13px]">
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
