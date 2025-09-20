import Order from "../interfaces/Order";
import User from "../interfaces/User";
import { AuthState, AuthAction } from "../types/index";

const userInitialState: User = {
  id: "0",
  firstName: "Guest",
  lastName: "",
  email: "",
  contact: "",
  address: [],
  totalOrders: 0,
  loyaltyPoints: 0,
  totalSpent: 0,
};

const orderInitialState: Order[] = [
  {
    id: "",
    total: 0,
    date: "",
    status: "",
    products: [],
    trackingNumber: "",
    shippingAddress: "",
    estimatedDelivery: "",
  },
];

const initialState: AuthState = {
  loading: true,
  isAuthenticated: false,
  user: userInitialState,
  orders: orderInitialState,
  info: null,
};

const Reducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        orders: action.payload.orders,
        info: "User logged In",
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        info: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: userInitialState,
        orders: orderInitialState,
        info: "User logged out",
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "TOKEN_VERIFITED":
      return {
        ...state,
        isAuthenticated: true,
      };
    case "TOKEN_VERIFICATION_FAILED":
      return {
        ...state,
        isAuthenticated: false,
        user: userInitialState,
        orders: orderInitialState,
        loading: false,
        info: "Token verification failed",
      };
    case "USER_NOT_PRESENT":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        info: "User not present",
      };
    default:
      return state;
  }
};

export { Reducer, initialState };
