import { ShoppingCartIcon } from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';
import { useCart } from '../../config/CartContext';
interface ProductCardProps {
  product: any;
}

const ProductCard = ({
  product
}: ProductCardProps) => {
  const { addToCart } = useCart();
  return (
    <div className="group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative w-full h-64">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center absolute inset-0"
        />
        {product.discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
            {product.discount}
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4">
        <div className="text-sm text-gray-500 mb-1">{product.category}</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
        
        {/* Rating */}
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, index) => (
            <StarIcon
              key={index}
              className={`h-4 w-4 ${
                index < product.rating ? 'text-yellow-400' : 'text-gray-200'
              }`}
            />
          ))}
        </div>

        {product.description && (
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
        )}

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-xl font-bold text-blue-600">{product.price}</div>
            <button className="flex items-center space-x  -1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
              onClick={ () => addToCart(product)}>
            <ShoppingCartIcon className="h-5 w-5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;