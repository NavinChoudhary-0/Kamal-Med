import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { ReactNodeInterface, UserAuthProvider } from "../types/index";
import { BASE_URL } from "../config/ApiURL";
import { Reducer, initialState } from "./Reducer";
import ApiClient from "../services/ApiClient";

// Auth Context and Provider (enhanced version)
const AuthContext = createContext<UserAuthProvider | undefined>(undefined);

// Enhanced Auth Provider
export const UserAuthServicesProvider = ({ children }: ReactNodeInterface) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const [apiClient, setApiClient] = useState<ApiClient | null>(null);

  // Initialize auth on app load
  useEffect(() => {
    setApiClient(
      new ApiClient({
        baseURL: BASE_URL,
        dispatch,
      })
    );
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, apiClient }}>
      {state.loading ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h2>Loading...</h2>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { useAuth };
