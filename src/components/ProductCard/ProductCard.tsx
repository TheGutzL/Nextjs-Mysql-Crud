import { Product } from "@/models";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      href={`/products/${product.id}`}
      key={product.id}
      className="bg-white rounded-lg border-gray-800 mb-3 text-gray-700 p-4 hover:bg-gray-100 hover:cursor-pointer"
    >
      {product.image && (
        <Image
          src={product.image}
          className="w-full rounded-t-lg"
          alt=""
        />
      )}
      <div className="p-4">
        <h1 className="text-lg font-bold">{product.name}</h1>
        <p>{product.price}</p>
        <p className="text-2xl text-slate-600">{product.description}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
