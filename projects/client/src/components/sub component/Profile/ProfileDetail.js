import React from "react";
import { useLocation } from "react-router-dom";

import ppDummy from "../../../assets/image_porfile_dummy.png";

const ProfileDetail = () => {
  const location = useLocation();
  return (
    <div className="hidden lg:block lg:row-span-1 lg:bg-green-footer lg:rounded-lg">
      <div className="lg:grid lg:grid-cols-5 lg:m-2 lg:bg-inherit">
        <img
          src={ppDummy}
          alt=""
          className="lg:w-14 lg:rounded-full lg:col-span-1 lg:bg-inherit"
        />
        <div className="lg:col-span-4 lg:bg-inherit">
          <h1 className="lg:bg-inherit">Usaid AKA</h1>
          <h1 className="lg:bg-inherit">nama toko</h1>
        </div>
      </div>
      <div className="lg:bg-inherit ">
        <h1 className="lg:bg-inherit lg:row-span-2 lg:p-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia ut
          quas illum repudiandae quod quae earum vero magni officia quia!
        </h1>
        <div className="lg:mx-2 lg:bg-inherit">
          {location.pathname === "/profile/my-transaction" ? (
            <>
              <h1 className="lg:bg-inherit">Total Transaction : </h1>
              <h1 className="lg:bg-inherit lg:row-span-1 lg:text-2xl lg:px-2">
                Rp. 70.000
              </h1>
            </>
          ) : location.pathname === "/profile/store-transaction" ? (
            <>
              <h1 className="lg:bg-inherit">Total Income :</h1>
              <h1 className="lg:bg-inherit lg:row-span-1 lg:text-2xl lg:px-2">
                Rp. 70.000
              </h1>
            </>
          ) : location.pathname ===
            "/profile/sell-product" ? null : location.pathname ===
            "/profile/my-store" ? (
            <>
              <h1 className="lg:bg-inherit">Total Income :</h1>
              <h1 className="lg:bg-inherit lg:row-span-1 lg:text-2xl lg:px-2">
                Rp. 70.000
              </h1>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
