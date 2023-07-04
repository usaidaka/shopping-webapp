import React from "react";
import CardNavbarEditCategory from "../sub component/Profile/CardNavbar";
import InputEditCategory from "../sub component/Profile/edit category/InputEditCategory";
import ProfileDetail from "../sub component/Profile/ProfileDetail";
import InputEditCategoryCreateProduct from "../sub component/Profile/create product/InputEditCategoryCreateProduct";

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

export default EditCategoryCreateProduct;
