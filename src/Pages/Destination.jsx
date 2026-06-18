import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import FilterSidebar from "../components/FilterSidebar";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import { use } from "react";

function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(3000);

  const navigate = useNavigate();
// useEffect(() => {

// }, []);
// function(){

// }();
// ()=>{}()

  useEffect(() => {
    let isMounted = true;
// async function fetchProducts() {
//   try {
//     const res = await fetch("https://dummyjson.com/products");
//     if (!res.ok) throw new Error("Failed to fetch");
//     const data = await res.json();
//     if (isMounted) setProducts(data.products);
//   } catch (err) {
//     if (isMounted) setError(err.message);
//   }
// }
// fetchProducts();
    (async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();

        if (isMounted) {
          setProducts(data.products);
        }
      } catch (err) {
        if (isMounted) setError(err.message);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  // Categories
  const categories = useMemo(() => {
    return ["All", ...new Set(products.map((p) => p.category))];
  }, [products]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter(item => {
      const matchSearch = item.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        category === "All" || item.category === category;

      const matchPrice = item.price <= maxPrice;

      return matchSearch && matchCategory && matchPrice;
    });
  }, [products, search, category, maxPrice]);
console.log(products);

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
    // <a href={`/product/${id}`}>View Product</a>
  };

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex text-white">
      
      {/* Sidebar */}
      <FilterSidebar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        categories={categories}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />

      {/* Main */}
      <main className="flex-1 p-8">

        <Header total={filteredProducts.length} />

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-7">
          {filteredProducts.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              onClick={() => handleCardClick(item.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;