"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";

const ProductForm = () => {
  const router = useRouter();

  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
  });
  const form = useRef<HTMLFormElement>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.post("/api/products", product);
    if (form.current) {
      form.current.reset();
    }
    router.push("/products");
  };

  return (
    <form
      className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4"
      onSubmit={handleSubmit}
      ref={form}
    >
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="name"
      >
        Product Name
      </label>
      <input
        name="name"
        type="text"
        placeholder="Name"
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        autoFocus
      />

      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="price"
      >
        Product Price:
      </label>
      <input
        name="price"
        type="number"
        placeholder="Price"
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
      />

      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="description"
      >
        Product Descripcion
      </label>
      <textarea
        name="description"
        rows={3}
        placeholder="Description"
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
      />

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded">
        Save Product
      </button>
    </form>
  );
};

export default ProductForm;
