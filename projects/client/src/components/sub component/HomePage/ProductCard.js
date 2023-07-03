import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const ProductCard = (props) => {
    const [productData, setProductData] = useState([])
    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${props.category}?limit=9`).then((res) => {
            setProductData(res.data)
        })
    }, [props.category])
  return (
    <>
    <div className="w-[342px] lg:w-auto flex gap-[22px] flex-wrap justify-center mx-auto after:w-[160px] lg:after:w-[500px] mb-20">
        {productData.map((product) => (
        <div className="grid grid-rows-13 lg:grid-rows-3 lg:grid-cols-3 h-[260px] lg:h-[150px] w-[160px] lg:w-[500px] rounded-md shadow-lg">
            <div className="row-span-8 lg:row-span-3 lg:col-span-1 flex justify-center">
                <img src={product.image} className="h-[160px] lg:h-[150px]"/>
            </div>
            <div className="row-span-2 lg:row-span-1 lg:col-span-2 w-[160px] lg:w-auto">
                <p className="font-bold px-[10px] whitespace-nowrap overflow-hidden text-ellipsis py-auto lg:mt-[13px]">{product.title}</p>
            </div>
            <div className="row-span-2 lg:row-span-1 lg:col-span-2 w-[160px] lg:w-auto">
                <p className="px-[10px] whitespace-nowrap overflow-hidden text-ellipsis py-auto lg:mt-[13px]">{product.description}</p>
            </div>
            <div className="row-span-1 lg:row-span-1 lg:col-span-2 w-[160px] lg:w-auto">
                <p className="font-bold px-[10px]  py-auto text-green-400 lg:mt-[13px]">{product.price}</p>
            </div>
        </div>
        ))}
    </div>
    </>
  )
}
