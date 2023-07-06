import axios from "axios";
import { Checkbox } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/outline";

const DetailCart = () => {
  const [item, setItem] = useState("");

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/1")
      .then((res) => setItem(res.data));
  }, []);
  if (!item) {
    return <p></p>;
  }

  return (
    <div>
      <div className="lg:mx-10">
        <h1 className="font-semibold mt-4 text-2xl">Cart</h1>
      </div>
      <div className="lg:col-span-3 lg:mr-10 mx-2 lg:mx-10 lg:flex">
        <div>
          <h1 className="text-xs">21 June 2023</h1>
          {/* CARD */}
          <div className="drop-shadow-2xl mx-3 h-[120px] my-2 grid grid-cols-4 items-center p-2 rounded-lg bg-green-footer lg:w-fit">
            <div className="col-span-1 gap-2 flex flex-row justify-center items-center bg-inherit">
              <div className="flex items-center gap-2 bg-inherit">
                <Checkbox id="remember" className="bg-inherit lg:mr-10" />
              </div>
              <img
                src={item.image}
                alt=""
                className="w-10 mr-2 lg:w-16 bg-inherit"
              />
            </div>
            <div className="col-span-3 grid grid-rows-7 bg-inherit lg:w-fit">
              <div className="row-span-6 flex flex-col gap-y-1 bg-inherit">
                <div className="flex bg-inherit justify-between">
                  <h1 className="text-xs font-bold text-green-strong bg-inherit">
                    {item.title}
                  </h1>
                  <h1 className="text-xs bg-inherit font-semibold">Qty:1</h1>
                </div>
                <h1 className="text-xs bg-inherit lg:hidden">
                  {item.description.substring(0, 50)}...
                </h1>
                <h1 className="hidden lg:block lg:text-xs lg:bg-inherit">
                  {item.description}
                </h1>
                <div className="row-span-1 h-fit flex justify-between items-end bg-inherit">
                  <h1 className="text-xs font-bold text-green-strong bg-inherit">
                    {item.price}
                  </h1>

                  <div className="w-fit h-fit bg-inherit">
                    <TrashIcon className="w-5 text-red-500 bg-inherit" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block lg:w-96 lg:bg-green-footer lg:rounded-lg">
          <div className=" lg:grid lg:grid-rows-2 lg:bg-inherit lg:gap-2 lg:rounded-lg">
            <div className="lg:row-span-1 lg:bg-inherit lg:p-3  lg:rounded-lg">
              <h1 className="lg:text-2xl lg:text-green-strong lg:font-semibold lg:bg-inherit">
                Order Summary
              </h1>
              <h1 className="lg:text-sm lg:font-semibold lg:text-green-strong lg:bg-inherit">
                Total Price (1 barang) :
              </h1>
              <h1 className="lg:text-xl lg:font-semibold lg:text-green-strong lg:bg-inherit">
                Rp 70.000
              </h1>
            </div>
            <div className="lg:row-span-1 lg:bg-inherit lg:rounded-lg">
              <div className="hidden lg:grid lg:relative lg:w-full lg:bg-inherit lg:h-11 lg:mb-14 lg:bottom-0 lg:rounded-lg">
                <div className="lg:bg-inherit">
                  <hr className="lg:h-[5px] lg:bg-green-strong lg:mx-3 lg:mb-1 lg:bg-inherit" />
                </div>
                <div className="bg-inherit lg:mx-3 lg:bg-inherit lg:mt-5">
                  <div className="lg:flex lg:justify-center lg:items-center lg:bg-inherit">
                    <Link className="bg-green-strong lg:w-full lg:h-10  lg:flex lg:justify-center lg:items-center lg:rounded-md">
                      <button className="lg:text-yellow-active lg:font-semibold ">
                        Check Out
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* checkout mobile */}
      <div className="relative w-full h-11 mb-14 bottom-0 lg:hidden">
        <div>
          <hr className="h-[3px] bg-green-soft mx-3 mb-1" />
        </div>
        <div className="bg-inherit mx-3">
          <h1 className="bg-inherit font-bold text-sm text-green-soft">
            Total Transaction :
          </h1>
          <div className="flex justify-between">
            <h1 className="bg-inherit font-semibold text-xl text-green-strong">
              {item.price}
            </h1>
            <Link className="bg-green-strong w-28 flex justify-center items-center rounded-md">
              <button className="text-yellow-active font-semibold">
                Check Out
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCart;
