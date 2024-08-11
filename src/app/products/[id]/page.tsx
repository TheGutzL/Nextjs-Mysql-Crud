"use client";

import axios from "axios";
import { useParams } from "next/navigation";

async function loadProduct(productId: number) {
  const res = await axios.get(
    `http://localhost:3000/api/products/${productId}`
  );
  console.log(res);
}

const ProductPage = () => {
  const params = useParams();

  loadProduct(Number(params.id));

  return <div>ProductPage</div>;
};

export default ProductPage;
