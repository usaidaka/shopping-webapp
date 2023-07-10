import React, { useEffect, useState } from "react";
import { Carousel } from "flowbite-react";
import { Link } from "react-router-dom";
import axios from "../../../api/axios";
import toRupiah from "@develoka/angka-rupiah-js";
import { BuildingStorefrontIcon, TagIcon } from "@heroicons/react/24/outline";

const TopSellingProduct = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/order-line/top-selling").then((res) => {
      setProducts(res.data.data);
    });
  }, []);
  console.log(products);
  if (products.length === 0) {
    return <p></p>;
  }

  const customTheme = {
    root: {
      base: "relative h-full w-full",
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
  const isTopSellingExist = products[0].Product;
  return (
    <>
      <div className="flex justify-center items-center mt-0 w-full h-52">
        <Carousel theme={customTheme}>
          {isTopSellingExist === null ? (
            <div className="w-60 h-[100px] justify-center items-center grid  mx-auto shadow-lg rounded-md lg:w-[800px] transition-all hover:bg-slate-200">
              <div className="flex justify-center items-center bg-inherit">
                <h1 className="bg-inherit">no purchases yet</h1>
              </div>
            </div>
          ) : (
            products.map((product) => (
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
                  <div className=" row-span-1 col-span-3 bg-inherit">
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
                    <p className="font-bold py-auto text-green-400 px-[10px] bg-inherit">
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
    </>
  );
};

export default TopSellingProduct;
