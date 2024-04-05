import React, { createContext, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { LoginData } from '../types/hooks/useAuth';
import { User } from '../types/user';
import LoadingPage from './loadingPage';

// Define the shape of the authentication context
interface AuthContextType {
    user: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (user: LoginData) => Promise<void>;
    register: (user: User) => Promise<void>;
    logout: () => Promise<void>;
}

type providerProps = {
    children: React.ReactNode
}

// Create the authentication context
export const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    loading: true,
    login: async () => {},
    register: async () => {},
    logout: async () => {},
});

// Create the authentication provider component
export const AuthProvider: React.FC<providerProps> = ({ children }) => {
    const { user, isAuthenticated, login, logout, register, loading } = useAuth();

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};