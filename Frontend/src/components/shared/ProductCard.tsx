import { ShoppingCartIcon } from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  discount?: string;
  description?: string;
}

const ProductCard = ({
  name,
  price,
  image,
  rating,
  category,
  discount,
  description
}: ProductCardProps) => {
  return (
    <div className="group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative w-full h-64">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-center absolute inset-0"
        />
        {discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
            {discount}
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4">
        <div className="text-sm text-gray-500 mb-1">{category}</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
        
        {/* Rating */}
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, index) => (
            <StarIcon
              key={index}
              className={`h-4 w-4 ${
                index < rating ? 'text-yellow-400' : 'text-gray-200'
              }`}
            />
          ))}
        </div>

        {description && (
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{description}</p>
        )}

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-xl font-bold text-blue-600">${price.toFixed(2)}</div>
          <button className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200">
            <ShoppingCartIcon className="h-5 w-5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;