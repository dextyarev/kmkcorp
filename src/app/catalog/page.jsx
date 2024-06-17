"use client"
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { ShapesIcon } from "lucide-react";
import CategoryItem from "./components/category-item";

export default function CatalogPage() {
  const [categories, setCategories] = useState([])

  function getCategories() {
    fetch('https://kmkcorp.vercel.app:3000/api/1c/getCategories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})
    })
      .then((res) => res.json())
      .then((res) => {
        setCategories(res)
    });
  }

  useEffect(() => {
    getCategories();
  }, [])

  return (
    <div className="flex flex-col gap-8 p-5">
      <Badge
        className="w-fit gap-2 border-2 border-primary px-3 py-[0.365rem] text-base font-bold uppercase"
        variant="outline"
      >
        <ShapesIcon size={16} />
        Каталог
      </Badge>

      <div className="grid grid-cols-3 flex-wrap gap-8">
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};
