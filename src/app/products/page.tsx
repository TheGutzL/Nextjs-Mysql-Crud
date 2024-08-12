import { ProductCard } from "@/components";
import { Product } from "@/models";
import axios from "axios";

async function loadProducts() {
  const { data } = await axios.get("http://localhost:3000/api/products");
  return data;
}

const ProductsPage = async () => {
  const products: Product[] = await loadProducts();

  return (
    <div className="grid gap-4 grid-cols-4">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductsPage;
