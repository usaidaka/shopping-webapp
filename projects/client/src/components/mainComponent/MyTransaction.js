import React from "react";
import ProfileDetail from "../subComponent/Profile/ProfileDetail";
import CardNavbarEditCategory from "../subComponent/Profile/CardNavbar";
import DetailMyTransaction from "../subComponent/Profile/my transaction/DetailMyTransaction";
import withAuth from "../../withAuth";

const MyTransaction = () => {
  return (
    <div className="mb-16 lg:grid lg:grid-cols-4 ">
      <div className="lg:grid lg:grid-rows-2 lg:col-span-1 lg:w-fit lg:gap-y-5 lg:mx-5">
        <ProfileDetail />
        <CardNavbarEditCategory />
      </div>
      <DetailMyTransaction />
    </div>
  );
};

export default withAuth(MyTransaction);
