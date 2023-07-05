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
import CreateProduct from "./components/main component/CreateProduct";
import EditCategoryCreateProduct from "./components/main component/EditCategoryCreateProduct";
import SingleProduct from "./components/main component/SingleProduct";
import MyTransaction from "./components/main component/MyTransaction";
import StoreTransaction from "./components/main component/StoreTransaction";
import MyStore from "./components/main component/MyStore";
import Cart from "./components/sub component/Cart/DetailCart";

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
      <div className="lg:min-h-[59vh]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/category" element={<Category />} />
          <Route path="/cart" element={<Cart />} />
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
