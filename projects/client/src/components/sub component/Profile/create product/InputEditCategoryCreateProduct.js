import React, { useEffect, useState } from "react";
import axios from "../../../../api/axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { FormControl, FormErrorMessage } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const InputEditCategoryCreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/profile/my-store/category")
      .then((res) => setCategories(res.data.result));
  }, []);

  /* formik yup untuk handle value dari input */
  const editCategory = async (values, { setStatus, setValues }) => {
    try {
      if (selectedCategory === "add") {
        const responseAdd = await axios.post(`profile/my-store/category`, {
          category_name: values.category_name,
        });
        console.log(values.category_name);
        if (responseAdd.status === 201) {
          setStatus({ success: true });
          setValues({
            category_name: "",
          });
          axios
            .get("/profile/my-store/category")
            .then((res) => setCategories(res.data.result));
          setSelectedCategory("select a category");
          setErrMsg(null);
          navigate("/profile/my-store/create-product");
        } else {
          setSelectedCategory("select a category");
          throw new Error("Change category failed");
        }
      }
      if (selectedCategory !== "add") {
        const response = await axios.patch(
          `profile/my-store/category/${selectedCategory}`,
          {
            category_name: values.category_name,
          }
        );

        if (response.status === 201) {
          setStatus({ success: true });
          setValues({
            category_name: "",
          });
          axios
            .get("/profile/my-store/category")
            .then((res) => setCategories(res.data.result));
          setSelectedCategory("select a category");
          setErrMsg(null);
          navigate("/profile/my-store/edit-product");
        } else {
          setSelectedCategory("select a category");
          throw new Error("Change category failed");
        }
      }
    } catch (error) {
      console.log(error);
      setValues({
        category_name: "",
      });
      if (!error.response) {
        setSelectedCategory("select a category");
        setErrMsg("No Server Response");
      } else if (
        error.response?.data?.message === "you have not choose any category yet"
      ) {
        setSelectedCategory("select a category");
        setErrMsg("you have not choose any category yet");
      } else if (
        error.response?.data?.message ===
        "category already exist, please choose one"
      ) {
        setSelectedCategory("select a category");
        setErrMsg("category already exist, please choose one");
      } else if (
        error.response?.data?.message === "new category name cannot be empty"
      ) {
        setSelectedCategory("select a category");
        setErrMsg("new category name cannot be empty");
      } else {
        setErrMsg("something bad happen");
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      category_name: "",
    },
    onSubmit: editCategory,
    validationSchema: yup.object().shape({
      category_name: yup.string().required("input your new category"),
    }),
    validateOnBlur: false,
    validateOnChange: false,
  });

  const handleForm = (event) => {
    const { target } = event;
    formik.setFieldValue(target.name, target.value);
  };

  if (categories.length === 0) {
    return <p></p>;
  }

  return (
    <div className="lg:col-span-3 lg:mr-5">
      <main className="mt-4 mx-3 ">
        <div>
          <h1 className="text-xl mb-2">Edit Category</h1>
        </div>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2 ">
          {errMsg ? (
            <div className="w-full bg-red-200 text-red-700 h-10 flex justify-center items-center mt-2 lg:w-full rounded-xl">
              <p className="bg-inherit">{errMsg}</p>
            </div>
          ) : null}
          <label
            htmlFor="categories"
            className="block text-sm font-medium text-gray-900 dark:text-white"
          >
            select category
          </label>
          <select
            id="categories"
            className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-strong focus:focus:border-green-strong block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-strong dark:focus:focus:border-green-strong"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
            }}
          >
            <option value={0}>select a category</option>
            {categories.map((category) => (
              <option
                key={category.id}
                defaultValue="Choose a category"
                value={category.id}
              >
                {category.category_name}
              </option>
            ))}
            <option value={"add"}>add new category</option>
          </select>
          <label className="block text-sm font-medium text-gray-900 dark:text-white">
            new category
          </label>
          <FormControl isInvalid={formik.errors.category_name}>
            <input
              type="text"
              className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-strong focus:border-green-strong block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-strong dark:focus:focus:border-green-strong"
              onChange={handleForm}
              placeholder="new category name"
              name="category_name"
              autoComplete="off"
              value={formik.values.category_name}
            />
            <FormErrorMessage className="text-red-500 text-sm font-medium mx-3">
              {formik.errors.category_name}
            </FormErrorMessage>
          </FormControl>
          <button
            className="w-fit bg-green-button px-2 py-1 rounded-md text-white mt-2 text-center"
            type="submit"
          >
            Change Category
          </button>
        </form>
      </main>
    </div>
  );
};

export default InputEditCategoryCreateProduct;
