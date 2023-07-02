import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";

const Category = () => {
  return (
    <div className="mx-3">
      <form className="flex gap-2">
        <input
          type="text"
          placeholder="Search"
          className="border-2 w-full rounded-md"
        />
      </form>
      <form className="gap-2 flex w-full mt-3 ">
        <select
          name=""
          id=""
          placeholder="Sort by"
          className="border-2 w-full rounded-md "
        >
          <option value="">Sort by</option>
          <option value="Alphabet">Alphabet</option>
          <option value="Price">Price</option>
        </select>
        <select
          name=""
          id=""
          placeholder="Order by"
          className="border-2 w-full rounded-md"
        >
          <option value="">Order by</option>
          <option value="DESC">DESC</option>
          <option value="ASC">ASC</option>
        </select>

        <button className="bg-green-strong h-10 w-32 rounded-md flex justify-center items-center">
          <MagnifyingGlassIcon className="text-yellow-active bg-inherit w-4  " />
        </button>
      </form>
    </div>
  );
};

export default Category;
