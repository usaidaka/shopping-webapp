import React from "react";
import ProfileDetail from "../sub component/Profile/ProfileDetail";
import CardNavbarEditCategory from "../sub component/Profile/CardNavbar";
import DetailMyStore from "../sub component/Profile/my store/DetailMyStore";

const MyStore = () => {
  return (
    <div className="mb-16 lg:grid lg:grid-cols-4 ">
      <div className="lg:grid lg:grid-rows-2 lg:col-span-1 lg:w-fit lg:gap-y-5 lg:mx-5">
        <ProfileDetail />
        <CardNavbarEditCategory />
      </div>
      <DetailMyStore />
    </div>
  );
};

export default MyStore;
