import axios from "../../../../api/axios";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import toRupiah from "@develoka/angka-rupiah-js";

const DetailMyTransaction = () => {
  const [item, setItem] = useState("");
  const [startDate, setStartDate] = useState(() => {
    const currentDate = dayjs();
    const formattedStart = currentDate.subtract(7, "day").format("YYYY-MM-DD");
    return formattedStart;
  });
  const [endDate, setEndDate] = useState(() => {
    const currentDate = dayjs();
    const formattedEnd = currentDate.format("YYYY-MM-DD");
    return formattedEnd;
  });
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`/order-shop?startDate=${startDate}&endDate=${endDate}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setItem(res.data));
  }, [startDate, endDate]);

  console.log("item", item);
  if (!item) {
    return <p></p>;
  }

  console.log(startDate)
  console.log(endDate)
  return (
    <div className="lg:col-span-3 lg:mr-10">
      <div>
        <h1 className="font-bold mt-4">Outgoing Transaction</h1>
      </div>
      {/* DATE PICKER */}
      <div className="grid grid-rows-2 gap-2 lg:grid-cols-2 my-3">
        <div className="row-span-1 lg:col-span-1 flex">
          <div className="flex my-auto w-10 lg:w-auto">From</div>
          <input
            type="date"
            onChange={(e) => setStartDate(e.target.value)}
            value={startDate}
            className="w-full mx-2 rounded-md bg-gray-100 border-none"
          />
        </div>
        <div className="row-span-1 lg:col-span-1 flex">
          <div className="flex my-auto w-10 lg:w-auto">To</div>
          <input
            type="date"
            onChange={(e) => setEndDate(e.target.value)}
            value={endDate}
            className="w-full mx-2 rounded-md bg-gray-100 border-none"
          />
        </div>
      </div>
      <div>
        <h1 h1 className="lg:text-2xl font-semibold text-green-strong">
          Total Transaction:
        </h1>
        <div className="drop-shadow-2xl mx-3 h-[130px] my-2 grid grid-cols-4 items-center p-2 rounded-lg bg-green-footer justify-center">
          {/* <div className="col-span-1 flex flex-col justify-center items-center bg-inherit">
            <img src={item.image} alt="" className="w-14 bg-inherit" />
          </div>
          <div className="col-span-3 grid grid-rows-7 bg-inherit">
            <div className="row-span-6 flex flex-col gap-y-1 bg-inherit">
              <h1 className="text-xs font-bold text-green-strong bg-inherit">
                {item.title}
              </h1>
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
                <h1 className="text-xs bg-inherit">Qty: 1</h1>
              </div>
            </div>
          </div> */}

          <div className="col-span-1 flex flex-col justify-center items-center bg-inherit">
            <h1 className="bg-inherit lg:text-4xl">{toRupiah(item.data)}</h1>
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
          <h1 className="bg-inherit font-semibold lg:text-xl text-green-strong">
            {toRupiah(item.data)}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default DetailMyTransaction;
