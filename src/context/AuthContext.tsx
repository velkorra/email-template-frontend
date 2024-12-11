import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AuthContextType, AuthState, User } from "../api/types";
import { authService } from "../api/services/AuthService";
import { authStore } from "../api/tokenStore";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  token: null,
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AuthState>(initialState);

  const updateToken = useCallback((newToken: string) => {
    setState((prev) => ({
      ...prev,
      token: newToken,
      isAuthenticated: true,
    }));
  }, []);

  const setUser = useCallback((user: User) => {
    setState((prev) => ({
      ...prev,
      user,
      isAuthenticated: true,
    }));
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        setState((prev) => ({ ...prev, isLoading: true }));

        const { token, user } = await authService.login({ email, password });
        console.log(token, user);
        
        authStore.setToken(token);
        updateToken(token);
        setUser(user);
        return true;
      } catch (error) {
        console.error("Login error:", error);
        return false;
      } finally {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [updateToken, setUser]
  );

  const logout = useCallback(async () => {
    await authService.logout();
    setState(initialState);
    authStore.removeToken();
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      const response = await authService.account();
      setUser(response.user);
    } catch (error) {
      console.error("Check auth error:", error);
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [])
  const value = {
    ...state,
    login,
    logout,
    updateToken,
    checkAuth
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
