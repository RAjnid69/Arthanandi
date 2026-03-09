"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
    name: string;
    email: string;
    tier: string;
    avatar: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check local storage for mock session
        const storedUser = localStorage.getItem("arthanandi_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = (email: string) => {
        const mockUser: User = {
            name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
            email,
            tier: "Pro",
            avatar: email.charAt(0).toUpperCase(),
        };
        setUser(mockUser);
        localStorage.setItem("arthanandi_user", JSON.stringify(mockUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("arthanandi_user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
