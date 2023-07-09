import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import { BuildingStorefrontIcon, UserIcon } from "@heroicons/react/24/outline";

const ProfileDetail = () => {
  const [userData, setUserData] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("/auth/user-data", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUserData(res.data.data));
  }, [token]);

  return (
    <div className="hidden lg:block lg:w-80 lg:h-fit lg:row-span-1 lg:bg-green-footer lg:rounded-lg ">
      <div className="lg:grid lg:grid-cols-5 lg:m-2 lg:bg-inherit ">
        <div className="lg:col-span-4 lg:bg-inherit">
          <div className="bg-inherit gap-5 flex">
            <UserIcon className="w-7 bg-green-footer" />
            <h1 className="lg:bg-inherit text-3xl font-bold">
              {userData.username}
            </h1>
          </div>
          <div className="flex gap-5 bg-inherit">
            <BuildingStorefrontIcon className="w-7 bg-inherit" />
            <h1 className="lg:bg-inherit text-xl font-semibold">
              {userData.store_name}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
