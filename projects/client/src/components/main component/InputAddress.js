import React from "react";
import gopay from "../../assets/gojek.png";
import paypal from "../../assets/paypal.png";
import masterCard from "../../assets/MasterCard_Logo.svg.png";
import visa from "../../assets/visa.png";

const InputAddress = () => {
  return (
    <div>
      <div className="grid grid-row-2 mx-3 mb-16 lg:flex lg:mx-10">
        <div className="lg:w-4/5">
          <div className="row-span-1 lg:w-full">
            <div className="font-semibold">
              <h1 className="text-xl">Checkout</h1>
              <h1>Contact Details</h1>
            </div>
            <div className="font-semibold">
              <div className="flex flex-col ">
                <label htmlFor="">full name</label>
                <input type="text" className="rounded-md" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">phone</label>
                <input type="text" className="rounded-md" />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="">Address</label>
                <textarea
                  type="text"
                  className="resize-none rounded-md lg:h-32"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">note</label>
                <input type="text" className="rounded-md" />
              </div>
            </div>
          </div>
          <div className="row-span-1 mt-3">
            <div>
              <h1 className="font-bold">Shipping</h1>
            </div>
            <div className="font-semibold lg:flex lg:gap-5">
              <div className="flex items-center gap-2 ">
                <input type="radio" name="delivery" id="" />
                <h1>Regular (3-5 days delivery)</h1>
              </div>
              <div className="flex items-center gap-2">
                <input type="radio" name="delivery" id="" />
                <h1>Instant (1 day delivery)</h1>
              </div>
            </div>
            <div className="font-bold mt-3">
              <h1>Payment</h1>
            </div>
            <div className="flex flex-col gap-y-2 lg:flex-row  lg:gap-5">
              <div className="flex items-center gap-2">
                <input type="radio" name="payment" id="" />
                <img src={visa} alt="" className="w-14 lg:w-28" />
              </div>
              <div className="flex items-center gap-2">
                <input type="radio" name="payment" id="" />
                <img src={masterCard} alt="" className="w-12 lg:w-28" />
              </div>
              <div className="flex items-center gap-2">
                <input type="radio" name="payment" id="" />
                <img src={paypal} alt="" className="w-14 lg:w-28" />
              </div>
              <div className="flex items-center gap-2">
                <input type="radio" name="payment" id="" />
                <img src={gopay} alt="" className="w-14 lg:w-28" />
              </div>
            </div>
            <div className="mt-3 lg:hidden">
              <hr className="h-[3px] bg-green-soft mx-3 mb-1" />
            </div>
            <div className="flex justify-between items-center lg:hidden">
              <div>
                <h1 className="font-semibold">Total Payment</h1>
                <h1 className="font-bold text-green-strong">Rp. 20.000</h1>
              </div>
              <div className="w-32 h-9 flex justify-center items-center bg-green-strong rounded-md">
                <button className="text-yellow-active font-semibold">
                  pay
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:px-3 lg:py-2 lg:block lg:rounded-xl lg:col-span-1 lg:border-2 lg:w-[300px] lg:ml-3 bg-green-footer h-fit">
          <div className="bg-inherit mt-10">
            <h1 className="bg-inherit lg:text-xl lg:text-green-strong lg:font-bold">
              Summary Order
            </h1>
            <h1 className="bg-inherit lg:font-semibold lg:text-green-strong">
              Total Order (1 item)
            </h1>
            <h1 className="bg-inherit">Rp 70.000</h1>
          </div>
          <div className="mt-3  hidden lg:block lg:bg-inherit">
            <hr className="h-[3px] bg-green-soft mx-3 mb-1 " />
          </div>
          <div className="hidden lg:flex lg:mb-10 justify-center items-center lg:bg-inherit lg:mt-4">
            <div className="w-32 h-9 flex justify-center items-center bg-green-strong rounded-md">
              <button className="text-yellow-active font-semibold">pay</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputAddress;