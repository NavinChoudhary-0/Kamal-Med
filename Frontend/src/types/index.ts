// Product related types
export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    rating: number;
    category: string;
    discount?: string;
    description?: string;
    inStock?: boolean;
  }
  
  // User related types
  export interface User {
    id: number;
    name: string;
    email: string;
    role: 'customer' | 'admin';
  }
  
  // Cart related types
  export interface CartItem {
    productId: number;
    quantity: number;
    price: number;
  }
  
  export interface Cart {
    items: CartItem[];
    total: number;
  }
  
  // Form related types
  export interface ContactForm {
    name: string;
    email: string;
    subject: string;
    message: string;
  }
  
  // Category type
  export type Category = 'Medical Devices' | 'Supplements' | 'Personal Care' | 'OTC Medicines' | 'All';
  
  // Testimonial type
  export interface Testimonial {
    id: number;
    name: string;
    role: string;
    image: string;
    content: string;
    rating: number;
  }