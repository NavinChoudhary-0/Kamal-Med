import { URL_FOR_TOKEN_REFRESH, URL_FOR_LOGIN } from "../config/ApiURL";
import { Dispatch } from "react";
import {
  ApiClientInterface,
  UserInfoStoredInLocalStorage,
  AuthAction,
  HeaderOptionsInterface,
} from "../types/index";

const AuthURLs = [URL_FOR_TOKEN_REFRESH, URL_FOR_LOGIN];

class ApiClient {
  baseURL: string;
  accessToken: string | null;
  refreshToken: string | null;
  userInfo: UserInfoStoredInLocalStorage | null = null;
  disptach: Dispatch<AuthAction>;
  isRefreshing: boolean = false;
  failedQueue: Function[] = [];

  constructor({
    baseURL,
    accessToken,
    refreshToken,
    dispatch,
  }: ApiClientInterface) {
    this.baseURL = baseURL;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.disptach = dispatch;
    if (this.accessToken && this.refreshToken) this.verifyAccessToken();
    else dispatch({ type: "USER_NOT_PRESENT" });
  }

  // Main request method with automatic token refresh
  async request(
    endpoint: string,
    options: HeaderOptionsInterface = { method: "GET" }
  ): Promise<{
    success: boolean;
    data: any;
    status: number;
    headers: Headers;
  }> {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.accessToken;

    // Prepare request config
    const config: RequestInit = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: "include",
    };

    try {
      let response = await fetch(url, config);

      // Process successful data
      if (response.ok) {
        console.log(`Request to ${endpoint} completed successfully`);
        return this.parseResponse(response);
      }
      const data = await response.json();
      // Handle token expiration
      if (
        response.status === 401 &&
        !AuthURLs.includes(endpoint) &&
        data.isTokenExpired // Assuming data.isTokenExpired is a boolean indicating token expiration
      ) {
        const tokenCreated = await this.handleTokenRefresh();

        if (tokenCreated) {
          const token = this.accessToken;
          // Retry with new token
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          };
          response = await fetch(url, config);
          return this.parseResponse(response);
        } else {
          throw new Error("Authentication required");
        }
      }
      return this.parseResponse(response);
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  async parseResponse(response: Response) {
    try {
      const data = await response.json();
      console.log("Response data:", data);
      if (response.ok) {
        return {
          success: true,
          data,
          status: response.status,
          headers: response.headers,
        }
      }else{
          return {
            success: false,
            data,
            status: response.status,
            headers: response.headers,
          }
      }
    } catch (error) {
      console.error("Error parsing response:", error);
      throw error;
    }
  }
  async verifyAccessToken() {
    try {
      const response  = await this.request("/auth/verify", {
        method: "POST",
        body: JSON.stringify({
          accessToken: this.accessToken,
          refreshToken: this.refreshToken,
        }),
      });

      if (response.success) {
        const data = response.data;
        this.userInfo = data.user;
        this.disptach({
          type: "LOGIN_SUCCESS",
          payload: { user: data.user, orders: data.orders },
        });
        return true;
      } else {
        const data = response.data;
        console.log("Error verifying access token:", data.error);
        this.disptach({
          type: "LOGIN_FAILURE",
          payload: data.error || "Login failed",
        });
        return false;
      }
    } catch (error) {
      console.error("Error verifying access token:", error);
      this.disptach({
        type: "LOGIN_FAILURE",
        payload: "Login failed",
      });
      return false;
    }
  }

  // Refresh token and retry logic
  async handleTokenRefresh() {
    if (this.isRefreshing) {
      // If already refreshing, queue the request
      return new Promise((resolve) => {
        this.failedQueue.push(resolve);
      });
    }

    this.isRefreshing = true;
    let tokenVerified = false;
    try {
      const response = await this.request("/auth/refresh", {
        method: "POST",
        body: JSON.stringify({
          accessToken: this.accessToken,
          refreshToken: this.refreshToken,
        }),
      });

      if (response.success) {
        const data = response.data;
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        this.accessToken = data.accessToken;
        this.refreshToken = data.refreshToken;
        this.userInfo = data.user;
        this.disptach({
          type: "TOKEN_VERIFITED",
        });
        tokenVerified = true;
      } else {
        console.error("Token refresh failed");
        this.handleLogout();
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      this.handleLogout();
    }
    this.failedQueue.forEach((resolve: Function) => resolve(tokenVerified));
    this.failedQueue = [];
    this.isRefreshing = false;
    return tokenVerified;
  }

  handleLogout() {
    this.accessToken = null;
    this.refreshToken = null;
    this.userInfo = null;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    this.disptach({ type: "LOGOUT" });
  }

  // Convenience methods for different HTTP methods
  async get(endpoint: string, params = {}) {
    const query = new URLSearchParams(params).toString();
    const url = query ? `${endpoint}?${query}` : endpoint;
    return this.request(url);
  }

  async post(endpoint: string, data: Object) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  async createNewUser(data: FormData){
    return this.request("/users/addUser", {
      method: "POST",
      body: data,
    })
  }
  // Login function
  async login(
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await this.request("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (response.success) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        this.disptach({ type: "LOGIN_SUCCESS", payload: response.data });
        return { success: true };
      } else {
        this.disptach({
          type: "LOGIN_FAILURE",
          payload: "Login failed",
        });
        return { success: false, error: "Login Failed" };
      }
    } catch (error) {
      const errorMessage = "Network error. Please check your connection.";
      this.disptach({ type: "LOGIN_FAILURE", payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  }

  // Logout function
  async logout(): Promise<void> {
    try {
      await this.request("/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout request failed:", error);
    }
    this.handleLogout();
  }
  // async put(endpoint: string, data: object) {
  //   return this.request(endpoint, {
  //     method: "PUT",
  //     body: JSON.stringify(data),
  //   });
  // }

  // async delete(endpoint: string) {
  //   return this.request(endpoint, {
  //     method: "DELETE",
  //   });
  // }

  // Upload files with automatic token
  // async uploadFile(endpoint: string, formData: Object) {
  //   const token = this.getAccessToken();

  //   const config = {
  //     method: "POST",
  //     credentials: "include",
  //     body: formData,
  //     headers: {
  //       // Don't set Content-Type, let browser set it for multipart/form-data
  //       Authorization: token ? `Bearer ${token}` : undefined,
  //     },
  //   };

  //   return fetch(`${this.baseURL}${endpoint}`, config);
  // }
}

export default ApiClient;
