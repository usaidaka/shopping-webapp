import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/mainComponent/Login";
import Register from "./components/mainComponent/Register";
import HomePage from "./components/mainComponent/HomePage";
import Navbar from "./components/mainComponent/Navbar";
import FooterMobile from "./components/mainComponent/FooterMobile";
import EditCategory from "./components/mainComponent/EditCategory";
import Category from "./components/mainComponent/Category";
import FooterDesktop from "./components/mainComponent/FooterDesktop";
import EditProduct from "./components/mainComponent/EditProduct";
import { useDispatch } from "react-redux";
import { setTokenAccess } from "./thunk/authSlice";
import { useEffect } from "react";
import CreateProduct from "./components/mainComponent/CreateProduct";
import EditCategoryCreateProduct from "./components/mainComponent/EditCategoryCreateProduct";
import SingleProduct from "./components/mainComponent/SingleProduct";
import MyTransaction from "./components/mainComponent/MyTransaction";
import StoreTransaction from "./components/mainComponent/StoreTransaction";
import MyStore from "./components/mainComponent/MyStore";
import Cart from "./components/subComponent/Cart/DetailCart";
import InputAddress from "./components/mainComponent/InputAddress";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setTokenAccess(token));
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="lg:min-h-[59vh]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/category" element={<Category />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/shipping" element={<InputAddress />} />

          <Route path="/profile/my-transaction" element={<MyTransaction />} />
          <Route
            path="/profile/store-transaction"
            element={<StoreTransaction />}
          />
          <Route path="/profile/my-store" element={<MyStore />} />
          <Route
            path="/profile/my-store/edit-category"
            element={<EditCategory />}
          />
          <Route
            path="/profile/my-store/edit-create-category"
            element={<EditCategoryCreateProduct />}
          />
          <Route
            path="/profile/my-store/edit-product/:id"
            element={<EditProduct />}
          />
          <Route path="/profile/sell-product" element={<CreateProduct />} />
          <Route path="/products/:id" element={<SingleProduct />} />
        </Routes>
      </div>
      <FooterMobile />
      <FooterDesktop />
    </Router>
  );
}

export default App;
