import { useState } from "react";
import {
  User,
  ArrowLeft,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Package,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Provider/UserContext";

// Mock interfaces and contexts for demonstration
interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
  quantity: number;
}

// Mock cart context
const useCart = () => {
  const [cartItems, setCartItems] = useState<Product[]>([
    {
      id: "1",
      name: "Wireless Headphones",
      price: "₹2,999",
      category: "electronics",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
      quantity: 2,
    },
    {
      id: "2",
      name: "Smart Watch",
      price: "₹8,999",
      category: "electronics",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
      quantity: 1,
    },
    {
      id: "3",
      name: "Coffee Mug",
      price: "₹599",
      category: "home",
      image:
        "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=200&h=200&fit=crop",
      quantity: 3,
    },
  ]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = Number(item.price.slice(1).replace(",", ""));
      return total + price * item.quantity;
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return {
    cartItems,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    getTotalItems,
  };
};

interface CartItemProps {
  item: Product;
}

// Cart Item Component with animations
const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="group relative overflow-hidden bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 transform hover:-translate-y-1">
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 to-blue-50/0 group-hover:from-blue-50/30 group-hover:to-purple-50/20 transition-all duration-500 rounded-2xl"></div>

      <div className="relative flex items-center space-x-6">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-xl shadow-sm">
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate group-hover:text-blue-700 transition-colors duration-200">
            {item.name}
          </h3>
          <p className="text-sm text-gray-500 mb-2 capitalize">
            {item.category}
          </p>
          <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {item.price}
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center space-x-3 bg-gray-50 rounded-full px-3 py-2">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="p-2 rounded-full bg-white shadow-sm hover:shadow-md hover:bg-red-50 transition-all duration-200 transform hover:scale-110 active:scale-95"
          >
            <Minus className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors duration-200" />
          </button>

          <span className="w-12 text-center font-bold text-lg text-gray-800 select-none">
            {item.quantity}
          </span>

          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="p-2 rounded-full bg-white shadow-sm hover:shadow-md hover:bg-green-50 transition-all duration-200 transform hover:scale-110 active:scale-95"
          >
            <Plus className="h-4 w-4 text-gray-600 hover:text-green-500 transition-colors duration-200" />
          </button>
        </div>

        {/* Price and Remove */}
        <div className="text-right flex flex-col items-end space-y-3">
          <p className="text-xl font-bold text-gray-900">
            ₹
            {(
              Number(item.price.slice(1).replace(",", "")) * item.quantity
            ).toLocaleString()}
          </p>
          <button
            onClick={() => removeFromCart(item.id)}
            className="p-2 rounded-full hover:bg-red-50 transition-all duration-200 transform hover:scale-110 active:scale-95 group/trash"
          >
            <Trash2 className="h-5 w-5 text-gray-400 group-hover/trash:text-red-500 transition-colors duration-200" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Empty Cart Component
const EmptyCartScreen = ({ onBack }: { onBack: () => void }) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 p-8">
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <div className="flex items-center mb-12 animate-fade-in">
        <button
          onClick={onBack}
          className="flex items-center space-x-3 text-blue-600 hover:text-blue-800 transition-all duration-200 transform hover:scale-105 hover:-translate-x-1"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Back to Products</span>
        </button>
      </div>

      {/* Empty State */}
      <div className="text-center py-20 animate-fade-in-up">
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mx-auto flex items-center justify-center animate-pulse-soft">
            <ShoppingCart className="h-16 w-16 text-gray-400" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
            <span className="text-white text-sm font-bold">0</span>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Your cart is empty
        </h2>
        <p className="text-gray-600 mb-12 text-lg max-w-md mx-auto">
          Discover amazing products and add them to your cart to get started!
        </p>

        <button
          onClick={onBack}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl font-semibold text-lg"
        >
          Start Shopping
        </button>
      </div>
    </div>
  </div>
);

// Login Modal Component
const LoginModal = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl transform animate-scale-in">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-blue-600" />
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Sign in to Continue
          </h3>
          <p className="text-gray-600 mb-8">
            Please sign in to proceed with your order
          </p>

          <div className="space-y-4">
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Sign In
            </button>
          </div>

          <p className="text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <button
              onClick={() => {
                console.log("Redirecting to signup...");
              }}
              className="text-blue-600 hover:text-blue-700 underline font-medium hover:no-underline transition-all duration-200"
            >
              Sign up here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// Main Cart Screen Component
const CartScreen = () => {
  const navigate = useNavigate();
  const { loggedIn } = useUser();
  const { cartItems, getTotalPrice, getTotalItems } = useCart();

  const onBack = () => {
    navigate("/products");
    console.log("Navigating back to products");
  };

  if (cartItems.length === 0) {
    return <EmptyCartScreen onBack={onBack} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-200/60 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left Section - Back Button & Title */}
            <div className="flex items-center space-x-8">
              <button
                onClick={onBack}
                className="group flex items-center space-x-2 px-4 py-2.5 text-gray-600 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 rounded-lg transition-all duration-200 transform hover:scale-105 border border-gray-200/50 hover:border-blue-200"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                <span className="font-medium text-sm">Back</span>
              </button>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                    <ShoppingCart className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">
                      {getTotalItems()}
                    </span>
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                    Shopping Cart
                  </h1>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Review your selected items
                  </p>
                </div>
              </div>
            </div>

            {/* Right Section - Item Count & Status */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-indigo-50 px-5 py-3 rounded-xl border border-blue-100">
                <div className="flex items-center space-x-2">
                  <Package className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-700">
                    {getTotalItems()}
                  </span>
                </div>
                <div className="w-px h-4 bg-blue-200"></div>
                <span className="text-sm text-blue-600">
                  {getTotalItems() === 1 ? "Item" : "Items"}
                </span>
              </div>

              {/* Mobile item count */}
              <div className="sm:hidden bg-blue-600 text-white px-3 py-1.5 rounded-full">
                <span className="text-sm font-medium">{getTotalItems()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item, index) => (
              <div
                key={item.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CartItem item={item} />
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div
              className="sticky top-32 animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <Package className="h-4 w-4 text-white" />
                  </div>
                  <span>Order Summary</span>
                </h2>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 font-medium">Subtotal</span>
                    <span className="font-bold text-gray-900 text-lg">
                      ₹{getTotalPrice().toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 font-medium">Shipping</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                        FREE
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-900">
                        Total
                      </span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        ₹{getTotalPrice().toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl font-bold text-lg relative overflow-hidden group/btn">
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                  <span className="relative">Proceed to Checkout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {!loggedIn && <LoginModal />}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse-soft {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        .animate-pulse-soft {
          animation: pulse-soft 3s ease-in-out infinite;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #7c3aed);
        }
      `}</style>
    </div>
  );
};

export default CartScreen;
