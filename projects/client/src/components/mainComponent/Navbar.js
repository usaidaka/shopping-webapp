import { useEffect, useState } from "react";
import { Dialog, Popover } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setTokenAccess } from "../../thunk/authSlice";
import tokokita from "../../assets/tokokita.png";
import axios from "../../api/axios";
import { setTotalCart } from "../../thunk/cartSlice";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const token = localStorage.getItem("token");
  const totalCart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/cart", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        dispatch(setTotalCart(res.data.message.length));
      });
  }, [dispatch, token]);

  const handleLogOut = () => {
    dispatch(setTokenAccess(null));
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-white sticky">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/homepage" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-9 lg:h-12 w-auto" src={tokokita} alt="" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Link
            to="/homepage"
            className={`text-sm font-semibold leading-6 hover:text-green-soft transition-all ${
              location.pathname === "/homepage"
                ? "text-yellow-active"
                : "text-gray-900"
            }`}
          >
            Home
          </Link>
          <Link
            to="/category"
            className={`text-sm font-semibold hover:text-green-soft transition-all leading-6 ${
              location.pathname === "/category"
                ? "text-yellow-active"
                : "text-gray-900"
            }`}
          >
            Category
          </Link>
          <Link
            to="/cart"
            className={`text-sm font-semibold hover:text-green-soft transition-all leading-6 ${
              location.pathname === "/cart"
                ? "text-yellow-active"
                : "text-gray-900"
            }`}
          >
            Cart
          </Link>
          <Link
            to="/profile/my-transaction"
            className={`text-sm font-semibold leading-6 hover:text-green-soft transition-all ${
              location.pathname === "/profile" ||
              location.pathname === "/profile/my-transaction" ||
              location.pathname === "/profile/store-transaction" ||
              location.pathname === "/profile/sell-product" ||
              location.pathname === "/profile/my-store" ||
              location.pathname === "/profile/my-store/edit-category"
                ? "text-yellow-active"
                : "text-gray-900"
            }`}
          >
            Profile
          </Link>
        </Popover.Group>
        {token ? (
          <div className="hidden lg:flex lg:flex-1  lg:justify-end lg:gap-6">
            <Link to="/profile/my-transaction">
              <UserCircleIcon className="lg:w-10 lg:rounded-full hover:text-green-soft transition-all" />
            </Link>
            <Link
              to="/cart"
              className="lg:w-8 hover:text-green-soft transition-all"
            >
              {totalCart === 0 ? null : (
                <h1
                  className={`absolute ml-5 w-5 h-5 rounded-full bg-red-500 flex justify-center items-center text-sm`}
                >
                  {totalCart}
                </h1>
              )}

              <ShoppingCartIcon />
            </Link>
            <button
              className="hidden lg:block hover:text-green-soft transition-all"
              onClick={() => handleLogOut()}
            >
              Log out
            </button>
          </div>
        ) : (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-6">
            <Link
              to="/login"
              className="hover:bg-slate-200 w-20 flex justify-center items-center rounded-lg transition-all h-10"
            >
              <button>Login</button>
            </Link>
            <Link
              to="/register "
              className="hover:bg-slate-200 w-20 flex justify-center items-center rounded-lg transition-all h-10"
            >
              <button>Sign Up</button>
            </Link>
          </div>
        )}
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-9 w-auto" src={tokokita} alt="" />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  to="/homepage"
                  className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                    location.pathname === "/homepage"
                      ? "text-yellow-active"
                      : "text-gray-900"
                  } hover:bg-gray-50`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/category"
                  className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                    location.pathname === "/category"
                      ? "text-yellow-active"
                      : "text-gray-900"
                  } hover:bg-gray-50`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Category
                </Link>
                <Link
                  to="/cart"
                  className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                    location.pathname === "/cart"
                      ? "text-yellow-active"
                      : "text-gray-900"
                  } hover:bg-gray-50`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Cart
                </Link>
                <Link
                  to="/profile/my-transaction"
                  className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                    location.pathname === "/profile" ||
                    location.pathname === "/profile/my-transaction" ||
                    location.pathname === "/profile/store-transaction" ||
                    location.pathname === "/profile/sell-product" ||
                    location.pathname === "/profile/my-store"
                      ? "text-yellow-active"
                      : "text-gray-900"
                  } hover:bg-gray-50`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
              </div>
              <div className="py-6">
                {token ? (
                  <Link
                    to="/login"
                    onClick={() => {
                      handleLogOut();
                      setMobileMenuOpen(false);
                    }}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log out
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
