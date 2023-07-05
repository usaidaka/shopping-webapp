import {
  ArrowLeftIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SingleProduct = () => {
  const [item, setItem] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/1")
      .then((res) => setItem(res.data));
  }, []);
  return (
    <div className="h-fit">
      <div className="grid grid-rows-6 mx-3 mb-16 gap-2 lg:grid lg:grid-rows-1 lg:grid-cols-3">
        <div className="row-span-1 w-7 lg:hidden ">
          <Link to="/homepage">
            <ArrowLeftIcon />
          </Link>
        </div>
        <div className="row-span-5 w-40 mx-auto lg:w-64 lg:mx-32">
          <img src={`${item.image}`} alt="" />
        </div>
        <div className="row-span-1 lg:bg-green-footer lg:w-full lg:p-6 lg:gap-2">
          <p className="text-sm font-bold lg:bg-inherit lg:text-2xl">
            {item.title}
          </p>
          <p className="text-xs lg:bg-inherit lg:mt-4 lg:text-xl">
            {item.description}
          </p>
          <p className="hidden lg:block lg:mt-20 lg:bg-inherit lg:text-3xl lg:font-bold   lg:text-green-strong">
            {item.price}
          </p>
        </div>
        <div className="row-span-1 grid grid-cols-2 justify-center items-center lg:gap-1 lg:flex lg:flex-col lg:py-5 lg:w-96 lg:bg-green-footer rounded-lg">
          <div className="hidden lg:block lg:bg-inherit">
            <h1 className="lg:bg-inherit">Atur Jumlah</h1>
          </div>
          <div className="col-span-1 mx-auto lg:flex lg:bg-inherit">
            <h1 className="hidden lg:block lg:font-bold lg:text-2xl lg:bg-inherit">
              subtotal: {item.price}
            </h1>
            <h1 className="font-bold text-2xl lg:bg-inherit lg:hidden">
              {item.price}
            </h1>
          </div>
          <div className="col-span-1 flex justify-center gap-4 items-center lg:grid lg:bg-inherit">
            <div className="flex gap-3 lg:flex lg:justify-center lg:bg-inherit">
              <button
                className="w-10 block bg-green-strong rounded-lg"
                onClick={() => {
                  count > 0 ? setCount(count - 1) : setCount(0);
                }}
              >
                <MinusIcon className="bg-inherit text-yellow-active rounded-lg" />
              </button>
              <h1 className="text-2xl ">{count}</h1>
              <button className="w-10 block  bg-green-strong rounded-lg">
                <PlusIcon
                  className="bg-inherit text-yellow-active rounded-lg"
                  onClick={() => setCount(count + 1)}
                />
              </button>
            </div>
            <div>
              <button className="hidden lg:block lg:bg-green-strong lg:w-52 h-9 lg:text-yellow-active lg:rounded-md">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
        <div>
          <button className="bg-green-strong w-full h-9 text-yellow-active rounded-md lg:hidden">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
