import React, { useEffect, useState } from "react";
import axios from "../../../../api/axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { FormControl, FormErrorMessage } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { useSelector } from "react-redux";

//bagaimana nge set token agar saat di middleware db dapat terbaca/tervalidasi

const InputEditProduct = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [price, setPrice] = useState("");
  const [toggleValue, setToggleValue] = useState(false);
  const [image, setImage] = useState("");
  const token = useSelector((state) => state.auth.value);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("profile/my-store/category")
      .then((res) => setCategories(res.data.result));
  }, []);
  //   console.log(categories);

  /* formik yup untuk handle value dari input */
  const EditProduct = async (values, { setStatus, setValues }) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(values));
    formData.append("file", image[0]);

    try {
      axios
        .post("/profile/my-store/create-product", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          // setStatus({ success: true });
          // setValues({
          //   name_item: "",
          //   category_id: selectedCategory,
          //   product_description: "",
          //   price: "",
          //   status: false,
          // });
          // setSelectedCategory("select a category");
          // setErrMsg(null);
        });
    } catch (err) {
      console.log(err);
      if (!err.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg(
          "indicates a request conflict with the current state of the target resource"
        );
      } else if (err.response?.status === 400) {
        setErrMsg("Bad Request");
      } else {
        setErrMsg("Registration failed");
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      name_item: "",
      category_id: selectedCategory,
      product_description: "",
      price: "",
      status: toggleValue,
    },
    onSubmit: EditProduct,
    validationSchema: yup.object().shape({
      name_item: yup.string().required("input product name"),
      category_id: yup.number().required("input product category"),
      product_description: yup.string().required("input product description"),
      price: yup.string().required("input product's price"),
      status: yup.boolean(),
    }),
    validateOnBlur: false,
    validateOnChange: false,
  });

  const handleForm = (event) => {
    const { target } = event;
    formik.setFieldValue(target.name, target.value);
  };

  const handleChange = (value) => {
    setPrice(value);
  };

  const handleToggle = () => {
    setToggleValue(!toggleValue);
  };

  const handleFile = (e) => {
    const files = e.target.files;

    setImage([...files]);
  };

  if (categories.length === 0) {
    return <p></p>;
  }

  return (
    <div className="lg:col-span-3 lg:mr-5">
      <main className="mt-4 mx-3 ">
        <div>
          <h1 className="text-xl mb-2">Edit Product</h1>
        </div>
        {/* card */}
        <div className="w-full h-20 border-2 ">
          <div>
            <div>
              <img src="" alt="" />
            </div>
            <div>
              <h1>Polo Shirt</h1>
            </div>
          </div>
        </div>
        {errMsg ? (
          <div className="w-full bg-red-200 text-red-700 h-10 flex justify-center items-center mt-2 lg:w-full rounded-xl">
            <p className="bg-inherit">{errMsg}</p>
          </div>
        ) : null}
        {/* form */}
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2 ">
          <label className="block text-sm font-medium text-gray-900 dark:text-white">
            product name
          </label>
          <FormControl isInvalid={formik.errors.name_item}>
            <input
              type="text"
              className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-strong focus:border-green-strong block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-strong dark:focus:focus:border-green-strong"
              onChange={handleForm}
              placeholder="new product"
              name="name_item"
              autoComplete="off"
              value={formik.values.name_item}
            />
            <FormErrorMessage className="text-red-500 text-sm font-medium mx-3">
              {formik.errors.name_item}
            </FormErrorMessage>
          </FormControl>
          <label
            htmlFor="categories"
            className="block text-sm font-medium text-gray-900 dark:text-white"
          >
            select category
          </label>
          <div className="flex items-center gap-x-4">
            <div>
              <select
                id="categories"
                className="bg-gray-200  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-strong focus:focus:border-green-strong block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-strong dark:focus:focus:border-green-strong h-10"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  formik.setFieldValue("category_id", e.target.value);
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
              </select>
            </div>
            <div>
              <h1>OR</h1>
            </div>
            <div>
              <Link
                to="/profile/my-store/edit-category"
                className="flex flex-col justify-center items-center mb-2"
              >
                <button className="text-xs w-fit h-10 bg-green-button px-2 py-1 rounded-md text-white mt-2 text-center lg:text-base ">
                  edit category
                </button>
              </Link>
            </div>
          </div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white">
            product description
          </label>
          <FormControl isInvalid={formik.errors.product_description}>
            <textarea
              type="text"
              className="bg-gray-200 border h-24 resize-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-strong focus:border-green-strong block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-strong dark:focus:focus:border-green-strong"
              onChange={handleForm}
              placeholder="product description"
              name="product_description"
              autoComplete="off"
              value={formik.values.product_description}
            />
            <FormErrorMessage className="text-red-500 text-sm font-medium mx-3">
              {formik.errors.product_description}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={formik.errors.price}>
            <NumericFormat
              type="text"
              className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-strong focus:border-green-strong block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-strong dark:focus:focus:border-green-strong"
              onChange={handleForm}
              placeholder="price"
              name="price"
              autoComplete="off"
              value={formik.values.price}
              thousandSeparator={true}
              prefix={"Rp"}
              decimalScale={0}
              onValueChange={(values) => {
                formik.setFieldValue("price", values.value);
                handleChange(values.value);
              }}
            />
            <FormErrorMessage className="text-red-500 text-sm font-medium mx-3">
              {formik.errors.price}
            </FormErrorMessage>
          </FormControl>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={toggleValue}
              onChange={handleToggle}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              {toggleValue ? "active" : "deactivate"}
            </span>
          </label>
          <FormControl
            className="flex flex-col"
            isInvalid={formik.errors.photo}
          >
            <label className="block text-sm font-medium text-gray-900 dark:text-white">
              photo product
            </label>
            <input
              onChange={handleFile}
              type="file"
              name="photo"
              className="py-1 px-2 rounded-full border-2 w-fit"
              autoComplete="off"
              accept="image/png, image/gif, image/jpeg"
            />
            <FormErrorMessage className="text-red-500 text-sm font-medium">
              {formik.errors.photo}
            </FormErrorMessage>
          </FormControl>
          <button
            className="w-fit bg-green-button px-2 py-1 rounded-md text-white mt-2 text-center"
            type="submit"
          >
            Edit Product
          </button>
        </form>
      </main>
    </div>
  );
};

export default InputEditProduct;
