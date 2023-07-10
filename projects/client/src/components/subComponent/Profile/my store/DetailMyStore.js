import { TrashIcon, TagIcon } from "@heroicons/react/24/outline";
import toRupiah from "@develoka/angka-rupiah-js";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../../../api/axios";
import { Link } from "react-router-dom";
import withAuth from "../../../../withAuth";

const DetailMyStore = () => {
  const [items, setItems] = useState("");
  const [active, setActive] = useState("true");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`/products/user?status=${active}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setItems(res.data));
  }, [active, token]);

  const handleDelete = async (id) => {
    try {
      await axios
        .delete(`/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          axios
            .get(`/products/user?status=${active}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setItems(res.data));
        });
    } catch (error) {
      console.log(error);
    }
  };

  console.log("test", items);

  if (items.data === undefined) {
    return <p></p>;
  }

  const userProducts = items.data;

  const handleStatus = (value) => {
    setActive(value);
  };

  const orderedData = userProducts?.sort(
    (a, b) => b.OrderLines.length - a.OrderLines.length
  );

  return (
    <div className="lg:col-span-3 lg:mr-10">
      <div>
        <h1 className="mx-4 font-bold mt-4">Store Products</h1>
      </div>
      {/* FILTER ACTIVE DAN DEACTIVE */}
      <div className="mx-4 my-2">
        <select
          id="sortby"
          className="h-[32x] w-24 rounded-[6px] lg:w-[400px] border-green-soft"
          onChange={(e) => handleStatus(e.target.value)}
        >
          <option value="true" id="active">
            Active
          </option>
          <option value="false" id="deactive">
            Deactive
          </option>
        </select>
      </div>
      {/* DATE PICKER */}
      {active === "true"
        ? orderedData.map((item) => (
            <div key={item.id}>
              <div>
                <div className="drop-shadow-md mx-3 h-[130px] my-2 grid grid-cols-4 items-center p-2 rounded-lg bg-green-footer">
                  <div className="col-span-1 flex flex-col justify-center items-center lg:mr-5 lg:my-auto bg-inherit">
                    <Link
                      to={`/profile/my-store/edit-product/${item.id}`}
                      className="bg-inherit"
                    >
                      <img
                        src={item.image_product}
                        alt=""
                        className="w-full max-h-28 bg-inherit"
                      />
                    </Link>
                  </div>
                  <div className="col-span-3 grid grid-rows-7 bg-inherit">
                    <div className="row-span-6 flex flex-col gap-y-1 bg-inherit">
                      <div className="bg-inherit flex justify-between">
                        <h1 className="text-xs font-bold text-green-strong bg-inherit">
                          <Link
                            to={`/profile/my-store/edit-product/${item.id}`}
                            className="bg-inherit"
                          >
                            {item.name_item}
                          </Link>
                        </h1>
                        <div className="flex bg-inherit text-gray-500">
                          <TagIcon className="mr-1 w-6 bg-inherit" />
                          <div className="bg-inherit">
                            {item.OrderLines?.length}
                          </div>
                        </div>
                      </div>
                      <h1 className="text-xs bg-inherit lg:hidden">
                        {item.product_description}...
                      </h1>
                      <h1 className="hidden lg:block lg:text-xs lg:bg-inherit">
                        {item.product_description}
                      </h1>
                      <div className="row-span-1 h-fit flex justify-between items-end bg-inherit">
                        <h1 className="text-xs font-bold text-green-strong bg-inherit">
                          {toRupiah(item.price)}
                        </h1>
                        <div className="w-fit h-fit bg-inherit">
                          <button onClick={() => handleDelete(item.id)}>
                            <TrashIcon className="w-5 text-red-500 bg-inherit" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="relative w-full h-11 mb-14 bottom-0 lg:hidden">
            <div>
              <hr className="h-[3px] bg-green-soft mx-3 mb-1" />
            </div>
            <div className="bg-inherit mx-3">
              <h1 className="bg-inherit font-bold text-sm text-green-soft">
                Total Transaction :
              </h1>
              <h1 className="bg-inherit font-semibold text-xl text-green-strong">
                {item.price}
              </h1>
            </div>
          </div> */}
            </div>
          ))
        : userProducts.map((item) => (
            <div key={item.id}>
              <div>
                <div className="drop-shadow-md mx-3 h-[130px] my-2 grid grid-cols-4 items-center p-2 rounded-lg bg-gray-400">
                  <div className="col-span-1 flex flex-col justify-center items-center lg:mr-5 lg:my-auto bg-inherit">
                    <Link
                      to={`/profile/my-store/edit-product/${item.id}`}
                      className="bg-inherit"
                    >
                      <img
                        src={item.image_product}
                        alt=""
                        className="w-full max-h-28 bg-inherit"
                      />
                    </Link>
                  </div>
                  <div className="col-span-3 grid grid-rows-7 bg-inherit">
                    <div className="row-span-6 flex flex-col gap-y-1 bg-inherit">
                      <div className="bg-inherit flex justify-between">
                        <h1 className="text-xs font-bold text-gray-600 bg-inherit">
                          <Link
                            to={`/profile/my-store/edit-product/${item.id}`}
                            className="bg-inherit"
                          >
                            {item.name_item}
                          </Link>
                        </h1>
                        <div className="flex bg-inherit text-gray-500">
                          <TagIcon className="mr-1 w-6 bg-inherit" />
                          <div className="bg-inherit">
                            {item.OrderLines?.length}
                          </div>
                        </div>
                      </div>
                      <h1 className="text-xs text-gray-600 bg-inherit lg:hidden">
                        {item.product_description}...
                      </h1>
                      <h1 className="hidden text-gray-600 lg:block lg:text-xs lg:bg-inherit">
                        {item.product_description}
                      </h1>
                      <div className="row-span-1 h-fit flex justify-between items-end bg-inherit">
                        <h1 className="text-xs text-gray-600 font-bold bg-inherit">
                          {toRupiah(item.price)}
                        </h1>
                        <div className="w-fit h-fit bg-inherit">
                          <button onClick={() => handleDelete(item.id)}>
                            <TrashIcon className="w-5 text-red-500 bg-inherit" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="relative w-full h-11 mb-14 bottom-0 lg:hidden">
              <div>
                <hr className="h-[3px] bg-green-soft mx-3 mb-1" />
              </div>
              <div className="bg-inherit mx-3">
                <h1 className="bg-inherit font-bold text-sm text-green-soft">
                  Total Transaction :
                </h1>
                <h1 className="bg-inherit font-semibold text-xl text-green-strong">
                  {item.price}
                </h1>
              </div>
            </div> */}
            </div>
          ))}
    </div>
  );
};

export default withAuth(DetailMyStore);
