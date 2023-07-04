import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/main component/Login";
import Register from "./components/main component/Register";
import HomePage from "./components/main component/HomePage";
import Navbar from "./components/main component/Navbar";
import FooterMobile from "./components/main component/FooterMobile";
import EditCategory from "./components/main component/EditCategory";
import Category from "./components/main component/Category";
import FooterDesktop from "./components/main component/FooterDesktop";
import EditProduct from "./components/main component/EditProduct";
import { useDispatch } from "react-redux";
import { setTokenAccess } from "./thunk/authSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // check localstorage
    // dispatch token from localstorage to redux state
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setTokenAccess(token));
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/category" element={<Category />} />
        <Route
          path="/profile/my-store/edit-category"
          element={<EditCategory />}
        />
        <Route
          path="/profile/my-store/edit-product"
          element={<EditProduct />}
        />
        <Route
          path="/profile/my-store/create-product"
          element={<CreateProduct />}
        />
      </Routes>
      <FooterMobile />
      <FooterDesktop />
    </Router>
  );
}

export default App;
