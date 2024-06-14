"use client"
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import ProductItem from "@/components/ui/product-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { PercentIcon } from "lucide-react";

export default function DealsPage() {
  const [deals, setDeals] = useState([])

  function getDeals() {
    fetch('https://kmkcorp.vercel.app/api/getDeals', {
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
    <div className="flex flex-col gap-8 p-5">
      <Badge
        className="w-fit gap-2 border-2 border-primary px-3 py-[0.365rem] text-base font-bold uppercase"
        variant="outline"
      >
        <PercentIcon size={16} />
        УНИКАЛЬНЫЕ ПРЕДЛОЖЕНИЯ
      </Badge>
      <div className="grid-cols-3 grid gap-8">
        {deals.map((product) => (
          <ProductItem
            key={product.id}
            product={computeProductTotalPrice(product)}
          />
        ))}
      </div>
    </div>
  );
};
