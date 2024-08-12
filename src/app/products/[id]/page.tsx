"use client";

import { Product } from "@/models";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Buttons from "./Buttons";

async function loadProduct(productId: number) {
  const { data } = await axios.get(`/api/products/${productId}`);
  return data;
}

function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product>({
    id: 0,
    name: "",
    price: 0,
    description: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await loadProduct(Number(params.id));
      setProduct(data[0]);
    };

    fetchProduct();
  }, [params.id]);

  return (
    <section className="flex justify-center items-center text-black">
      <div className="p-6 bg-white rounded-lg">
        <p>Name: {product.name}</p>
        <p>Price: {product.price}</p>
        <p>Description: {product.description}</p>

        <Buttons productId={product.id} />
      </div>
    </section>
  );
}

export default ProductPage;
