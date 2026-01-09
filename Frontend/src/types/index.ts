import { Dispatch, ReactNode } from "react";
import Order from "../interfaces/Order";
import User from "../interfaces/User";
import ApiClient from "../services/ApiClient";
import Address from "../interfaces/Address";
import Product from "../interfaces/Product";
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
export type Category =
  | "Medical Devices"
  | "Supplements"
  | "Personal Care"
  | "OTC Medicines"
  | "All";

// Testimonial type
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}
export interface ReactNodeInterface {
  children: ReactNode;
}
export interface Auth {
  isAuthenticated: boolean;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}
export type AuthAction =
  | { type: "LOGIN_SUCCESS"; payload: { user: User; orders: Order[] } }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "SET_USER"; payload: User }
  | { type: "TOKEN_VERIFIED" }
  | { type: "TOKEN_VERIFICATION_FAILED" }
  | { type: "USER_NOT_PRESENT" }
  | { type: "SET_ADDRESS"; payload: Address };
export interface ApiClientInterface {
  baseURL: string;
  dispatch: Dispatch<AuthAction>;
}

export interface CartObject {
  products: Product[];
  totalItems: number;
  totalPrice: number;
}

export interface AuthState {
  loading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  orders: Order[] | null;
  info: string | null;
}

export interface HeaderOptionsInterface {
  headers?: {};
  method: string;
  body?: any;
}

export interface UserAuthProvider {
  loading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  orders: Order[] | null;
  info: string | null;
  apiClient: ApiClient | null;
}
