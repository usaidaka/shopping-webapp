import {
  ArrowLeftIcon,
  MinusIcon,
  PlusIcon,
  BuildingStorefrontIcon
} from "@heroicons/react/24/outline";
import toRupiah from "@develoka/angka-rupiah-js";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axios";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [item, setItem] = useState("");
  const [count, setCount] = useState(0);
  const [errMsg, setErrMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState("");

  useEffect(() => {
    axios.get(`/products/${id}`).then((res) => setItem(res.data.data));
  }, [id]);

  const handleAddToCart = async () => {
    try {
      if (count > 0) {
        await axios.post(
          "/cart",
          { product_id: item.id, qty: count },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCount(0);
        setIsSuccess("transaction success");
        setTimeout(() => {
          navigate("/cart");
        }, 3000);
      } else {
        setErrMsg("you have to put quantity to checkout");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!item) {
    return <p></p>;
  }

  return (
    <div className="h-fit">
      {isSuccess ? (
        <div className="w-full flex bg-blue-200 text-blue-700 h-10 rounded-lg text-justify justify-center items-center mt-2 lg:flex lg:justify-center lg:w-[500px] lg:mx-auto lg:my-5">
          <p className="bg-inherit">{isSuccess}</p>
        </div>
      ) : errMsg ? (
        <div className="w-full flex bg-red-200 text-red-700 h-10 rounded-lg justify-center items-center mt-2 lg:flex lg:justify-center lg:w-[500px] lg:mx-auto lg:my-5">
          <p className="bg-inherit">{errMsg}</p>
        </div>
      ) : null}
      {/*     {isSuccess ? (
        <div className="w-full bg-blue-200 text-blue-700 h-10 rounded-lg flex justify-center items-center mt-2 lg:hidden">
          <p className="bg-inherit">{isSuccess}</p>
        </div>
      ) : null}

      {}
      {errMsg ? (
        <div className="w-full flex bg-red-200 text-red-700 h-10 rounded-lg justify-center items-center mt-2 lg:flex lg:justify-center lg:w-[500px] lg:mx-auto lg:my-5">
          <p className="bg-inherit">{errMsg}</p>
        </div>
      ) : null} */}

      <div className="grid grid-rows-6 mx-3 mb-16 gap-2 lg:grid lg:grid-rows-1 lg:grid-cols-3">
        <div className="row-span-1 w-7 lg:hidden ">
          <Link to="/homepage">
            <ArrowLeftIcon />
          </Link>
        </div>

        <div className="row-span-5 w-40 mx-auto lg:w-64 lg:mx-32">
          <img src={`${item.image_product}`} alt="" />
        </div>
        <div className="row-span-1 lg:bg-green-footer lg:w-full lg:p-6 lg:gap-2">
          <p className="text-sm font-bold lg:bg-inherit lg:text-2xl lg:my-auto">
            {item.name_item}
          </p>
          <p className="text-xs lg:bg-inherit lg:mt-4 lg:text-xl">
            {item.product_description}
          </p>
          <div className="w-auto flex lg:mt-4 bg-inherit">
          <BuildingStorefrontIcon className="w-6 bg-inherit text-gray-500"/>
          <p className="text-xs lg:bg-inherit lg:my-auto lg:ml-[10px] lg:text-xl text-gray-500">
            {item.User?.store_name}</p>
          </div>
          <p className="hidden lg:block lg:mt-20 lg:bg-inherit lg:text-3xl lg:font-bold   lg:text-green-strong">
            {toRupiah(item.price)}
          </p>
        </div>
        <div className="row-span-1 grid grid-cols-2 justify-center items-center lg:gap-1 lg:flex lg:flex-col lg:py-5 lg:w-96 lg:bg-green-footer rounded-lg">
          <div className="hidden lg:block lg:bg-inherit">
            <h1 className="lg:bg-inherit lg:font-bold">Set Amount</h1>
          </div>
          <div className="col-span-1 mx-auto lg:flex lg:bg-inherit">
            <h1 className="hidden lg:block lg:font-semibold lg:text-2xl lg:bg-inherit">
              subtotal: {toRupiah(item.price * count)}
            </h1>
            <h1 className="font-bold text-base lg:bg-inherit lg:hidden">
              {toRupiah(item.price * count)}
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
              <h1 className="text-2xl bg-inherit ">{count}</h1>
              <button className="w-10 block  bg-green-strong rounded-lg">
                <PlusIcon
                  className="bg-inherit text-yellow-active rounded-lg"
                  onClick={() => setCount(count + 1)}
                />
              </button>
            </div>
            <div>
              <button
                className="hidden lg:block lg:bg-green-strong lg:w-52 h-9 lg:text-yellow-active lg:rounded-md"
                onClick={() => {
                  handleAddToCart();
                }}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
        <div>
          <button
            className="bg-green-strong w-full h-9 text-yellow-active rounded-md lg:hidden"
            onClick={() => handleAddToCart()}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
