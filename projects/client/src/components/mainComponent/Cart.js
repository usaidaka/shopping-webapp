import React from "react";

import DetailCart from "../subComponent/Cart/DetailCart";
import withAuth from "../../withAuth";

const Cart = () => {
  return (
    <div className="lg:grid lg:grid-cols-5">
      <DetailCart />
    </div>
  );
};

export default withAuth(Cart);
