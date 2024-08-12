"use client";

import { Product } from "@/models";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Buttons from "./Buttons";
import Image from "next/image";

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
    image: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await loadProduct(Number(params.id));
      setProduct(data[0]);
    };

    fetchProduct();
  }, [params.id]);

  return (
    <section className="flex justify-center items-center h-[calc(100vh-10rem)] text-black">
      <div className="flex w-4/6 justify-center h-2/6">
        <div className="p-6 bg-white w-1/3">
          <h3 className="text-2xl font-bold mb-3">{product.name}</h3>
          <h4 className="text-4xl font-bold">{product.price}</h4>
          <p className="text-slate-700">{product.description}</p>
        </div>
        <Image
          src={product.image}
          className="w-1/3"
          alt=""
        />
        <Buttons productId={product.id} />
      </div>
    </section>
  );
}

export default ProductPage;
