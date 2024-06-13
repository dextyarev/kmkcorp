"use client"
import ProductItem from "@/components/ui/product-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { useState, useEffect } from "react";


const ProductList = () => {
  const [deals, setDeals] = useState([])

  function getDeals() {
    fetch('https://kmkcorp.vercel.app/api/1c/getProducts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})
    })
      .then((res) => res.json())
      .then((res) => {
        setDeals(res)
      });
  }

  useEffect(() => {
    getDeals();
  }, [])

  return (
    <div className="flex w-full gap-8 overflow-hidden px-5 [&::-webkit-scrollbar]:hidden">
      {deals.slice(0,3).map((product) => (
        <div key={product.id} className="w-[270px] max-w-[270px]">
          <ProductItem product={computeProductTotalPrice(product)} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
