import { Checkbox } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import toRupiah from "@develoka/angka-rupiah-js";
import { useDispatch, useSelector } from "react-redux";
import { setTotalCart } from "../../../thunk/cartSlice";

import axios from "../../../api/axios";
import withAuth from "../../../withAuth";

const DetailCart = () => {
  const dispatch = useDispatch();
  const totalCart = useSelector((state) => state.cart.value);
  const [items, setItems] = useState("");
  const [count, setCount] = useState(0);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("/cart", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setItems(res.data)
        localStorage.setItem("totalPayment", toRupiah(res.data.total))
      });
  }, [token]);

  useEffect(() => {
    dispatch(setTotalCart(items.message?.length));
  }, [dispatch, items.message?.length]);

  const handleDelete = async (id) => {
    try {
      await axios
        .delete(`/cart/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          axios
            .get("/cart", {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setItems(res.data));
        });
    } catch (error) {
      console.log(error);
    }
  };

  if (!items) {
    return <p></p>;
  }
  console.log(items)
  console.log(items.length);
  console.log("haiiii", totalCart);

  return (
    <div>
      <div className="lg:mx-64 ">
        <h1 className="font-semibold mt-4 text-2xl">Cart</h1>
      </div>

      <div className="lg:flex lg:justify-center">
        <div
          className={`lg:col-span-3  lg:mr-10 mx-2 lg:mx-10 lg:block ${
            items.length === 0 ? "lg:w-[755px]" : null
          }`}
        >
          {items.message?.map((item) => (
            <div key={item.id}>
              <div>
                <h1 className="text-xs font-semibold">
                  {dayjs(item.createdAt).format("D MMMM YYYY")}
                </h1>
                {/* CARD */}
                <div className="drop-shadow-2xl mx-3 h-[120px] my-2 grid grid-cols-4 items-center p-2 rounded-lg bg-green-footer lg:w-full">
                  <div className="col-span-1 gap-2 flex flex-row justify-center items-center bg-inherit">
                    <div className="flex items-center gap-2 bg-inherit lg:justify-center lg:ml-10">
                      <Checkbox
                        id="remember"
                        className="bg-inherit lg:mr-10 border-2 border-green-strong"
                        onClick={(e) =>
                          e.target.checked
                            ? setCount(count + 1)
                            : setCount(count - 1)
                        }
                      />
                    </div>
                    <img
                      src={item.Product?.image_product}
                      alt=""
                      className="w-10 mr-2 lg:w-16 bg-inherit"
                    />
                  </div>
                  <div className="col-span-3 grid grid-rows-7 bg-inherit lg:w-full">
                    <div className="row-span-6 flex flex-col gap-y-1 bg-inherit">
                      <div className="flex bg-inherit justify-between">
                        <h1 className="text-xs font-bold text-green-strong bg-inherit">
                          {item.Product?.name_item}
                        </h1>
                        <h1 className="text-xs bg-inherit font-semibold lg:mr-10">
                          Qty: {item.qty}
                        </h1>
                      </div>
                      <h1 className="text-xs bg-inherit lg:hidden">
                        {item.Product?.product_description}
                      </h1>
                      <h1 className="hidden lg:block lg:text-xs lg:bg-inherit">
                        {item.Product?.product_description}
                      </h1>
                      <div className="row-span-1 h-fit flex justify-between items-eSnd bg-inherit">
                        <h1 className="text-xs font-bold text-green-strong bg-inherit">
                          {toRupiah(item.Product?.price)}
                        </h1>

                        <div className="w-fit h-fit bg-inherit">
                          <button onClick={() => handleDelete(item.id)}>
                            <TrashIcon className="w-5 text-red-500 bg-inherit lg:mr-10" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden lg:block lg:w-96 lg:bg-green-footer lg:h-fit lg:rounded-lg">
          <div className=" lg:grid lg:grid-rows-2 lg:bg-inherit lg:gap-2 lg:rounded-lg">
            <div className="lg:row-span-1 lg:bg-inherit lg:p-3  lg:rounded-lg">
              <h1 className="lg:text-2xl lg:text-green-strong lg:font-semibold lg:bg-inherit">
                Order Summary
              </h1>
              <h1 className="lg:text-sm lg:font-semibold lg:text-green-strong lg:bg-inherit">
                Total Price ({totalCart} item) :
              </h1>
              <h1 className="lg:text-xl lg:font-semibold lg:text-green-strong lg:bg-inherit">
                {toRupiah(items.total)}
              </h1>
            </div>
            <div className="lg:row-span-1 lg:bg-inherit lg:rounded-lg">
              <div className="hidden lg:grid lg:relative lg:w-full lg:bg-inherit lg:h-11 lg:mb-14 lg:bottom-0 lg:rounded-lg">
                <div className="lg:bg-inherit">
                  <hr className="lg:h-[5px] lg:bg-green-strong lg:mx-3 lg:mb-1 lg:bg-inherit" />
                </div>
                <div className="bg-inherit lg:mx-3 lg:bg-inherit lg:mt-5">
                  <div className="lg:flex lg:justify-center lg:items-center lg:bg-inherit">
                    <Link
                      to="/cart/shipping"
                      className="bg-green-strong lg:w-full lg:h-10  lg:flex lg:justify-center lg:items-center lg:rounded-md"
                    >
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

      <div className="relative w-full h-11 mb-20 bottom-0 lg:hidden">
        <div>
          <hr className="h-[3px] bg-green-soft mx-3 mb-1" />
        </div>
        <div className="bg-inherit mx-3">
          <h1 className="bg-inherit font-bold text-sm text-green-soft">
            Total Transaction :
          </h1>
          <div className="flex justify-between">
            <h1 className="bg-inherit font-semibold text-xl text-green-strong">
              {toRupiah(items.total)}
            </h1>
            <Link
              to="/cart/shipping"
              className="bg-green-strong w-28 flex justify-center items-center rounded-md"
            >
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

export default withAuth(DetailCart);
