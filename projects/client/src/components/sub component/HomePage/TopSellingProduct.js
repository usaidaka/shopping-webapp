import React, { useEffect, useState } from "react";
import { Carousel } from "flowbite-react";
import { Link } from "react-router-dom";
import axios from "../../../api/axios";

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
  return (
    <>
      <div className="flex justify-center items-center mt-0 w-full h-52">
        <Carousel theme={customTheme}>
          {products.map((product) => (
            <div className={product?.Product?.id}>
              <div
                key={product?.Product?.id}
                className="w-60 h-[85px] grid grid-cols-4 grid-rows-3 mx-auto shadow-lg rounded-md lg:w-[800px]"
              >
                <div className="justify-center flex row-span-3 col-span-1">
                  <img
                    src={product?.Product?.image_product}
                    alt=""
                    className="object-contain h-[85px]"
                  ></img>
                </div>
                <div className="col-span-3">
                  <p className="font-bold whitespace-nowrap overflow-hidden text-ellipsis py-auto px-[10px]">
                    {product?.Product?.name_item}
                  </p>
                </div>
                <div className="col-span-3">
                  <p className="whitespace-nowrap overflow-hidden text-ellipsis py-auto px-[10px]">
                    {product?.Product?.product_description}
                  </p>
                </div>
                <div className="col-span-3">
                  <p className="font-bold py-auto text-green-400 px-[10px]">
                    {product?.Product?.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default TopSellingProduct;
