import { Link } from "react-router-dom";
import needAuth from "./assets/withAuth.png";

function withAuth(Component) {
  return (props) => {
    if (localStorage.getItem("token")) {
      return <Component {...props} />;
    }
    return (
      <>
        <div className="w-full h-[550px]">
          <div className="h-full flex flex-col justify-center items-center">
            <h1 className="">You need to log in</h1>
            <img src={needAuth} alt="" className="lg:w-96" />
            <div className="flex gap-10">
              <button className="bg-blue-500 h-7 w-20 rounded-lg drop-shadow-lg">
                <Link className="bg-inherit text-white" to="/login">
                  Log in
                </Link>
              </button>
              <button className="bg-blue-500 h-7 w-20 rounded-lg drop-shadow-lg">
                <Link className="bg-inherit text-white" to="/register">
                  Sign Up
                </Link>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };
}

export default withAuth;
