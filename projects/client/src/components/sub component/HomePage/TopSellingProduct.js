import React, { useEffect, useState } from "react";
import { Carousel } from "flowbite-react";
import axios from "axios";
import { Link } from "react-router-dom";

const TopSellingProduct = () => {
  const [products, setProducts] = useState("");
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products?limit=5").then((res) => {
      setProducts(res.data);
    });
  }, []);
  if (products.length === 0) {
    return <p></p>;
  }
  console.log(products);
  return (
    <Carousel indicators={false} leftControl={null} rightControl={null}>
      {products.map((product) => (
        <div
          key={product.id}
          className="grid grid-cols-4 rounded-lg drop-shadow-lg w-full  "
        >
          <div className="col-span-1 flex justify-center items-center rounded-lg">
            <img src={product.image} alt="" className="h-16" />
          </div>
          <div className="col-span-3 text-xs rounded-lg">
            <p className="font-bold text-gray-400">{product.category}</p>
            <p className="font-bold text-green-strong">
              {product.title.slice(0, 50)}...
            </p>
            <p>{product.description.slice(0, 75)}...</p>

            <p className="bg-green-500 w-fit p-1 rounded-md mt-2 mb-2">
              Rp. {product.price}
            </p>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default TopSellingProduct;
