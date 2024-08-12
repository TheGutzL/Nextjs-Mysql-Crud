"use client";

import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const form = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const params = useParams();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (params.id) {
      axios.get(`/api/products/${params.id}`).then((res) => {
        console.log(res);
        setProduct({
          name: res.data[0].name,
          price: res.data[0].price,
          description: res.data[0].description,
        });
      });
    }
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price.toString());
    formData.append("description", product.description);
    if (file) {
      formData.append("image", file);
    }
    if (!params.id) {
      const res = await axios.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      const res = await axios.put(`/api/products/${params.id}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    if (form.current) {
      form.current.reset();
    }
    router.refresh();
    router.push("/products");
  };

  return (
    <div className="flex ">
      <form
        className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
        ref={form}
      >
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Product Name:
        </label>
        <input
          name="name"
          type="text"
          placeholder="Name"
          onChange={handleChange}
          value={product.name}
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
          value={product.price}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        />

        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="description"
        >
          Product Descripcion:
        </label>
        <textarea
          name="description"
          rows={3}
          placeholder="Description"
          onChange={handleChange}
          value={product.description}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        />

        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="image"
        >
          Product Image:
        </label>
        <input
          type="file"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2"
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            }
          }}
        />
        {file && (
          <Image
            src={URL.createObjectURL(file)}
            alt="file"
            className="w-96 object-contain mx-auto my-4"
          />
        )}

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded">
          {params.id ? "Update Product" : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
