import React from "react";
import ProfileDetail from "../sub component/Profile/ProfileDetail";
import CardNavbarEditCategory from "../sub component/Profile/CardNavbar";
import InputCreateProduct from "../sub component/Profile/create product/InputCreateProduct";


const CreateProduct = () => {
  return (
    <div className="mb-16 lg:grid lg:grid-cols-4 ">
      <div className="lg:grid lg:grid-rows-2 lg:col-span-1 lg:w-fit lg:gap-y-5 lg:mx-5">
        <ProfileDetail />
        <CardNavbarEditCategory />
      </div>
      <InputCreateProduct />
    </div>
  );
};

export default CreateProduct;
