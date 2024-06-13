"use client"
import CategoryItem from "./category-item";
import { useState, useEffect } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([])

  function getCategories() {
    fetch('https://kmkcorp.vercel.app/api/1c/getCategories', {
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
    <div className="grid grid-cols-4 gap-4">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Categories;
