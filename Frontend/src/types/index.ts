import { Dispatch, ReactNode } from "react";
import Order from "../interfaces/Order"
import User from "../interfaces/User";
import ApiClient from "../services/ApiClient";
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

export interface UserInfoStoredInLocalStorage {
  userId: String;
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
  | { type: "LOGIN_SUCCESS"; payload: { user: User, orders: Order[] } }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "SET_USER"; payload: User }
  | { type: "TOKEN_VERIFITED" }
  | { type: "TOKEN_VERIFICATION_FAILED" }
  | { type: "USER_NOT_PRESENT"}
export interface ApiClientInterface {
  baseURL: string;
  accessToken: string | null;
  refreshToken: string | null;
  // userInfo: UserInfoStoredInLocalStorage | null;
  dispatch: Dispatch<AuthAction>;
}

export interface AuthState {
  loading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  orders: Order[] | null;
  info: string | null;
}

export interface HeaderOptionsInterface{
  headers? : {}
  method: string;
  body?: any;
};

export interface UserAuthProvider {
  loading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  orders: Order[] | null;
  info: string | null;
  apiClient: ApiClient|null;

}
