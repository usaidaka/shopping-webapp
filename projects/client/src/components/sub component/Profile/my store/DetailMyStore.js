import { TrashIcon } from "@heroicons/react/24/outline";
import toRupiah from "@develoka/angka-rupiah-js";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../../../api/axios";
import { Link } from "react-router-dom";

const DetailMyStore = () => {
  const [items, setItems] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("/products/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setItems(res.data));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios
        .delete(`/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res);
          axios
            .get("/products/user", {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setItems(res.data));
        });
    } catch (error) {
      console.log(error);
    }
  };

  if (items.data === undefined) {
    return <p></p>;
  }

  const userProducts = items.data;

  return (
    <div className="lg:col-span-3 lg:mr-10">
      <div>
        <h1 className="font-bold mt-4">Store Product</h1>
      </div>
      {/* FILTER ACTIVE DAN DEACTIVE */}
      {/* DATE PICKER */}
      {userProducts.map((item) => (
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
                    <h1 className="text-xs bg-inherit font-semibold">Qty: 1</h1>
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
          <div className="relative w-full h-11 mb-14 bottom-0 lg:hidden">
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailMyStore;
