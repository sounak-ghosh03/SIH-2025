import React, { createContext, useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (e) {
            console.error("Failed to parse stored user:", e);
            localStorage.removeItem("user"); // Remove corrupted data
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            // Basic validation
            if (!/\S+@\S+\.\S+/.test(email)) {
                return { success: false, message: t("auth.invalidEmail") };
            }
            if (password.length < 6) {
                return { success: false, message: t("auth.passwordTooShort") };
            }

            // Mock authentication - replace with real API call
            const mockUser = {
                id: 1,
                email,
                name: email.split("@")[0],
                role: "user",
                permissions: ["read", "write"],
                token: "mock-jwt-token",
            };

            setUser(mockUser);
            localStorage.setItem("user", JSON.stringify(mockUser));
            return { success: true, message: t("auth.loginSuccess") };
        } catch (error) {
            return { success: false, message: t("auth.loginError") };
        }
    };

    const register = async (userData) => {
        try {
            if (!/\S+@\S+\.\S+/.test(userData.email)) {
                return { success: false, message: t("auth.invalidEmail") };
            }
            if (userData.password.length < 6) {
                return { success: false, message: t("auth.passwordTooShort") };
            }

            const newUser = {
                id: Date.now(),
                email: userData.email,
                name: userData.name,
                role: "user",
                permissions: ["read", "write"],
                token: "mock-jwt-token",
            };

            setUser(newUser);
            localStorage.setItem("user", JSON.stringify(newUser));
            return { success: true, message: t("auth.registerSuccess") };
        } catch (error) {
            return { success: false, message: t("auth.registerError") };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        return { success: true, message: t("auth.logoutSuccess") };
    };

    const hasPermission = (permission) =>
        user?.permissions?.includes(permission) || false;
    const isAdmin = () => user?.role === "admin";

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        hasPermission,
        isAdmin,
    };

    // Show loading UI while checking stored session
    if (loading) {
        return (
            <div className="text-center py-5">
                <div
                    className="spinner-border text-primary mb-3"
                    role="status"
                ></div>
                <div>{t("auth.loading")}</div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default AuthContext;
