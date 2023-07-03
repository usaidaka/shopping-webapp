import React from "react";
import { FormControl, FormErrorMessage } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "../../api/axios.js";
import registerImage from "../../assets/4346013.webp";

const Register = () => {
  const navigate = useNavigate();

  const [errMsg, setErrMsg] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  //   useEffect(() => {
  //     userRef.current.focus();
  //   }, []);

  const registerUser = async (values, { setStatus, setValues }) => {
    alert("Submit form!");
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
        setIsVisible(true);
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
          "Kata sandi harus ada huruf besar, huruf kecil, angka, dan karakter spesial"
        ),
      confirmPassword: yup
        .string()
        .oneOf(
          [yup.ref("password"), null],
          "Konfirmasi password harus sesuai dengan password"
        )
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-_+=!@#$%^&*])(?=.{8,})/,
          "Kata sandi harus ada huruf besar, huruf kecil, angka, dan karakter spesial"
        )
        .required("Konfirmasi password harus diisi"),
    }),
    validateOnChange: false,
    validateOnBlur: false,
  });

  const handleForm = (event) => {
    const { target } = event;
    formik.setFieldValue(target.name, target.value);
  };
  return (
    <div className="bg-white h-screen lg:w-screen lg:grid lg:grid-cols-2 lg:items-center ">
      <div className="lg:col-span-1 lg:grid">
        <img
          src={registerImage}
          alt=""
          className="hidden lg:block lg:w-4/5 lg:ml-20"
        />
        <div className="hidden lg:grid lg:justify-center ">
          <p className="text-center font-bold">
            Jual Beli Mudah Hanya di TokoKita
          </p>
          <p>Gabung dan rasakan kemudahan bertransaksi di TokoKita</p>
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
                      type="password"
                      name="password"
                      className="py-1 px-2 rounded-md bg-zinc-200 mx-3 text-green-strong"
                      autoComplete="off"
                      value={formik.values.password}
                    />
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
                      type="password"
                      name="confirmPassword"
                      className="py-1 px-2 rounded-md bg-zinc-200 mx-3 text-green-strong"
                      autoComplete="off"
                      value={formik.values.confirmPassword}
                    />
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
