import { Product } from "@/models/product";
import axios from "axios";

async function loadProducts() {
  const { data } = await axios.get("http://localhost:3000/api/products");
  return data;
}

const ProductsPage = async () => {
  const products: Product[] =
    await loadProducts();
  console.log(products);

  return (
    <div className="grid gap-4 grid-cols-4">
      {products.map((product, index) => (
        <div key={product.id} className="bg-white rounded-lg border-gray-800 mb-3 text-gray-700 p-4">
          <h1 className="text-lg font-bold">{product.name}</h1>
          <p>{product.price}</p>
          <p className="text-2xl text-slate-600">{product.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductsPage;
