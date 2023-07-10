import React from "react";
import { FormControl, FormErrorMessage } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../../api/axios.js";
import registerImage from "../../assets/4346013.webp";
import { EyeIcon } from "@heroicons/react/24/outline";

const Register = () => {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const registerUser = async (values, { setStatus, setValues }) => {
    try {
      const response = await axios.post("/auth/register", values, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        setStatus({ success: true });
        setValues({
          username: "",
          email: "",
          phone: "",
          store_name: "",
          password: "",
          confirmPassword: "",
        });
        setStatus({
          success: true,
          message:
            "Sign up successful. Please check your email for verification.",
        });

        navigate("/login");
      } else {
        throw new Error("Register Failed");
      }
    } catch (err) {
      if (!err.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.data?.message === "username already used") {
        setErrMsg("Username taken");
      } else if (err.response?.data?.message === "email already used") {
        setErrMsg("Email already used");
      } else if (err.response?.data?.message === "phone already used") {
        setErrMsg("Phone Number already used");
      } else if (err.response?.data?.message === "store name already used") {
        setErrMsg("Store Name already used");
      } else {
        setErrMsg("Registration failed");
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      phone: "",
      store_name: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: registerUser,
    validationSchema: yup.object().shape({
      username: yup.string().required().min(3).max(20),
      email: yup.string().required("email wajib diisi").email(),
      phone: yup
        .string()
        .required("required")
        .min(10)
        .max(13)
        .matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          "Phone number is not valid"
        ),
      store_name: yup.string().required().min(3).max(20),
      password: yup
        .string()
        .min(6)
        .required()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-_+=!@#$%^&*])(?=.{8,})/,
          "The password must contain uppercase, lowercase, numbers and special characters"
        ),
      confirmPassword: yup
        .string()
        .oneOf(
          [yup.ref("password"), null],
          "Password confirmation must match the password"
        )
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-_+=!@#$%^&*])(?=.{8,})/,
          "The password must contain uppercase, lowercase, numbers and special characters"
        )
        .required("Password confirmation is required"),
    }),
    validateOnChange: false,
    validateOnBlur: false,
  });

  const handleForm = (event) => {
    const { target } = event;
    formik.setFieldValue(target.name, target.value);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="bg-white h-screen lg:w-full lg:grid lg:grid-cols-2 lg:items-center ">
      <div className="lg:col-span-1 lg:grid">
        <img
          src={registerImage}
          alt=""
          className="hidden lg:block lg:w-4/5 lg:ml-20"
        />
        <div className="hidden lg:grid lg:justify-center ">
          <p className="text-center font-bold">
            Easy Buying and Selling only at TokoKita
          </p>
          <p>Join and experience the convenience of transacting at TokoKita.</p>
        </div>
      </div>
      <div className="lg:col-span-1 ">
        <div className=" lg:grid lg:justify-center lg:items-center ">
          <div className=" lg:w-80 lg:drop-shadow-2xl lg:rounded-xl ">
            <div className="flex mt-10 justify-between items-end ">
              <h1 className="text-3xl font-bold  mx-3 text-green-strong lg:rounded-xl">
                Register
              </h1>
            </div>
            <div className="lg:rounded-lg">
              <form onSubmit={formik.handleSubmit} className="lg:rounded-xl">
                {errMsg ? (
                  <div className="w-screen bg-red-200 text-red-700 h-10 flex justify-center items-center mt-2 lg:w-full">
                    <p className="bg-inherit">{errMsg}</p>
                  </div>
                ) : null}
                <div className="mt-5 grid gap-y-5 lg:rounded-xl">
                  <FormControl
                    className="flex flex-col"
                    isInvalid={formik.errors.username}
                  >
                    <input
                      onChange={handleForm}
                      placeholder="Username"
                      type="text"
                      name="username"
                      className="py-1 px-2 rounded-md bg-zinc-200 mx-3 text-green-strong"
                      autoComplete="off"
                      value={formik.values.username}
                      // ref={userRef}
                    />
                    <FormErrorMessage className="text-red-500 text-sm font-medium mx-3">
                      {formik.errors.username}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    className="flex flex-col"
                    isInvalid={formik.errors.email}
                  >
                    <input
                      onChange={handleForm}
                      placeholder="Email"
                      type="email"
                      name="email"
                      className="py-1 px-2 rounded-md bg-zinc-200 mx-3 text-green-strong"
                      autoComplete="off"
                      value={formik.values.email}
                    />
                    <FormErrorMessage className="text-red-500 text-sm font-medium mx-3">
                      {formik.errors.email}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    className="flex flex-col"
                    isInvalid={formik.errors.phone}
                  >
                    <input
                      onChange={handleForm}
                      placeholder="Phone Number"
                      type="text"
                      name="phone"
                      className="py-1 px-2 rounded-md bg-zinc-200 mx-3 text-green-strong"
                      autoComplete="off"
                      value={formik.values.phone}
                    />
                    <FormErrorMessage className="text-red-500 text-sm font-medium mx-3">
                      {formik.errors.phone}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    className="flex flex-col"
                    isInvalid={formik.errors.store_name}
                  >
                    <input
                      onChange={handleForm}
                      placeholder="Store Name"
                      type="text"
                      name="store_name"
                      className="py-1 px-2 rounded-md bg-zinc-200 mx-3 text-green-strong"
                      autoComplete="off"
                      value={formik.values.store_name}
                    />
                    <FormErrorMessage className="text-red-500 text-sm font-medium mx-3">
                      {formik.errors.store_name}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    className="flex flex-col"
                    isInvalid={formik.errors.password}
                  >
                    <input
                      onChange={handleForm}
                      placeholder="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="py-1 px-2 rounded-md bg-zinc-200 mx-3 text-green-strong"
                      autoComplete="off"
                      value={formik.values.password}
                    />
                    <button
                      type="button"
                      className="w-full flex justify-end rounded-md text-center items-center mt-1"
                      onClick={togglePassword}
                    >
                      <span className="flex text-xs mr-2 items-center">
                        show password <EyeIcon className="w-5" />
                      </span>
                    </button>
                    <FormErrorMessage className="text-red-500 text-sm font-medium mx-3">
                      {formik.errors.password}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    className="flex flex-col"
                    isInvalid={formik.errors.confirmPassword}
                  >
                    <input
                      onChange={handleForm}
                      placeholder="confirm password"
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      className="py-1 px-2 rounded-md bg-zinc-200 mx-3 text-green-strong"
                      autoComplete="off"
                      value={formik.values.confirmPassword}
                    />
                    <button
                      type="button"
                      className="w-full flex justify-end rounded-md text-center items-center mt-1"
                      onClick={toggleConfirmPassword}
                    >
                      <span className="flex text-xs mr-2 items-center">
                        show password <EyeIcon className="w-5" />
                      </span>
                    </button>
                    <FormErrorMessage className="text-red-500 text-sm font-medium mx-3">
                      {formik.errors.confirmPassword}
                    </FormErrorMessage>
                  </FormControl>
                  <div className="flex flex-col justify-center items-center mt-3  lg:rounded-lg">
                    <button
                      type="submit"
                      className="bg-green-strong w-fit p-2 rounded-md text-center text-white font-poppins hover:bg-blue-800 transition-all"
                    >
                      Register Account
                    </button>
                    <h1 className="mt-2 lg:my-4">
                      Have an account?{" "}
                      <Link to="/login" className="font-semibold">
                        Sign in
                      </Link>
                    </h1>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
