export interface User {
  email: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    token: string | null;
}

export interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    updateToken: (newToken: string) => void;
    checkAuth: () => Promise<void>;
  }

export interface LoginDto {
    email: string;
    password: string;
}

export interface LoginResponseDto {
    token: string;
    user: User;
}