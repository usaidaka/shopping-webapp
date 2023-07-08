import React from "react";
import CardNavbarEditCategory from "../subComponent/Profile/CardNavbar";
import ProfileDetail from "../subComponent/Profile/ProfileDetail";
import InputEditCategoryCreateProduct from "../subComponent/Profile/create product/InputEditCategoryCreateProduct";
import withAuth from "../../withAuth";

const EditCategoryCreateProduct = () => {
  return (
    <div className="lg:grid lg:grid-cols-4 ">
      <div className="lg:grid lg:grid-rows-2 lg:col-span-1 lg:w-fit lg:gap-y-5 lg:mx-5">
        <ProfileDetail />
        <CardNavbarEditCategory />
      </div>
      <InputEditCategoryCreateProduct />
    </div>
  );
};

export default withAuth(EditCategoryCreateProduct);
