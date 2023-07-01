import React from "react";
import CardNavbarEditCategory from "../sub component/Profile/edit category/CardNavbarEditCategory";
import InputEditCategory from "../sub component/Profile/edit category/InputEditCategory";
import ProfileDetail from "../sub component/Profile/edit category/ProfileDetail";

const EditCategory = () => {
  return (
    <div className="lg:grid lg:grid-cols-4">
      <div className="lg:grid lg:grid-rows-2 lg:col-span-1 lg:w-fit lg:gap-y-5 lg:mx-5">
        <ProfileDetail />
        <CardNavbarEditCategory />
      </div>
      <InputEditCategory />
    </div>
  );
};

export default EditCategory;
