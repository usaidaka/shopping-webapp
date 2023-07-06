import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import ppDummy from "../../../assets/image_porfile_dummy.png";
import axios from "../../../api/axios";
import { useSelector } from "react-redux";

const ProfileDetail = () => {
  const location = useLocation();
  const [userData, setUserData] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("/auth/user-data", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUserData(res.data.data));
  }, []);

  console.log(userData);

  return (
    <div className="hidden lg:block lg:row-span-1 lg:bg-green-footer lg:rounded-lg lg:h-80">
      <div className="lg:grid lg:grid-cols-5 lg:m-2 lg:bg-inherit">
        <img
          src={ppDummy}
          alt=""
          className="lg:w-14 lg:rounded-full lg:col-span-1 lg:bg-inherit"
        />
        <div className="lg:col-span-4 lg:bg-inherit">
          <h1 className="lg:bg-inherit">{userData.username}</h1>
          <h1 className="lg:bg-inherit">{userData.store_name}</h1>
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
          ) : location.pathname === "/profile/store-transaction" ||
            location.pathname === "/profile/sell-product" ? (
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
