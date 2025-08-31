// Cart Context for state management
import { createContext, useContext ,ReactNode, useState} from 'react';
import Product from '../interfaces/Product';

const CartContext = createContext<CartContextValue|undefined>(undefined);

const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}

interface CartProviderProps {
    children: ReactNode;
}

interface CartContextValue {
    cartItems: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, newQuantity: number) => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}
// Cart Provider Component
const CartProvider = ({ children } : CartProviderProps) => {
    const [cartItems, setCartItems] = useState<Product[]>([]);
    

    const addToCart = (product: Product) => {
      setCartItems(prevItems  => {
        const existingItem = prevItems.find(item => item.id === product.id);
        if (existingItem) {
          return prevItems.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prevItems, { ...product, quantity: 1 }];
      });
    };
  
    const removeFromCart = (productId: number) => {
      setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };
  
    const updateQuantity = (productId :number, newQuantity:number) => {
      if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
      }
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    };
  
    const getTotalItems = () => {
      return cartItems.reduce((total, item) => total + item.quantity, 0);
    };
  
    const getTotalPrice = () => {
      return cartItems.reduce((total, item) => total + (Number(item.price.slice(1)) * item.quantity), 0);
    };
  
    return (
      <CartContext.Provider value = {{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalItems,
        getTotalPrice
      }}>
        {children}
      </CartContext.Provider>
    );

};
export { CartContext, useCart, CartProvider};