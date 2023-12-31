import { FormControl, FormErrorMessage } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

import axios from "../../api/axios.js";
import loginPic from "../../assets/6310507.webp";
import { setTokenAccess } from "../../thunk/authSlice";
import { EyeIcon } from "@heroicons/react/24/outline";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errMsg, setErrMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginUser = async (values, { setStatus, setValues }) => {
    try {
      const response = await axios.post("/auth/login", values, {
        headers: { "Content-Type": "application/json" },
      });

      const token = response.data?.accessToken;
      if (response.status === 200) {
        setStatus({ success: true });
        setValues({
          user_identification: "",
          password: "",
        });
        setStatus({
          success: true,
          message:
            "Sign up successful. Please check your email for verification.",
        });
        navigate("/homepage");
        dispatch(setTokenAccess(token));
        localStorage.setItem("token", token);
      } else {
        throw new Error("Register Failed");
      }
    } catch (err) {
      if (!err.response) {
        setErrMsg("No Server Response");
        setValues({
          user_identification: "",
          password: "",
        });
      } else if (err.response?.data?.message === "user unauthorized") {
        setErrMsg("user unauthorized");
        setValues({
          user_identification: "",
          password: "",
        });
      } else if (err.response?.data?.message === "wrong password") {
        setErrMsg("wrong password");
        setValues({
          user_identification: "",
          password: "",
        });
      } else {
        setErrMsg("Registration failed");
        setValues({
          user_identification: "",
          password: "",
        });
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      user_identification: "",
      password: "",
    },
    onSubmit: loginUser,
    validationSchema: yup.object().shape({
      user_identification: yup.string().required(),
      password: yup.string().required(),
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

  return (
    <div>
      <div className="bg-white h-screen lg:w-full lg:grid lg:grid-cols-2 lg:items-center ">
        <div className="lg:col-span-1 lg:grid">
          <img
            src={loginPic}
            alt=""
            className="hidden lg:block lg:w-4/5 lg:ml-20"
          />
          <div className="hidden lg:grid lg:justify-center ">
            <p className="text-center font-bold">
              Easy Buying and Selling only at TokoKita
            </p>
            <p>
              Join and experience the convenience of transacting at TokoKita.
            </p>
          </div>
        </div>
        <div className="lg:col-span-1 ">
          <div className=" lg:grid lg:justify-center lg:items-center ">
            <div className=" lg:w-80 lg:drop-shadow-2xl lg:rounded-xl ">
              <div className="flex mt-10 justify-between items-end ">
                <h1 className="text-3xl font-bold  mx-3 text-green-strong lg:rounded-xl">
                  Log in
                </h1>
              </div>
              <div className="lg:rounded-lg">
                <form onSubmit={formik.handleSubmit} className="lg:rounded-xl">
                  {errMsg ? (
                    <div className="w-full bg-red-200 text-red-700 h-10 flex justify-center items-center mt-2 lg:w-full">
                      <p className="bg-inherit">{errMsg}</p>
                    </div>
                  ) : null}
                  <div className="mt-5 grid gap-y-5 lg:rounded-xl">
                    <FormControl
                      className="flex flex-col"
                      isInvalid={formik.errors.user_identification}
                    >
                      <input
                        onChange={handleForm}
                        placeholder="username / email"
                        type="text"
                        name="user_identification"
                        className="py-1 px-2 rounded-md bg-zinc-200 mx-3 text-green-strong"
                        autoComplete="off"
                        value={formik.values.user_identification}
                      />
                      <FormErrorMessage className="text-red-500 text-sm font-medium mx-3">
                        {formik.errors.user_identification}
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

                    <div className="flex flex-col justify-center items-center mt-3  lg:rounded-lg">
                      <button
                        type="submit"
                        className="bg-green-strong w-fit p-2 rounded-md text-center text-white font-poppins hover:bg-blue-800 transition-all"
                      >
                        Log in
                      </button>
                      <h1 className="mt-2 lg:my-4">
                        Dont have an account yet?{" "}
                        <Link to="/register" className="font-semibold">
                          Sign Up
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
    </div>
  );
};

export default Login;
