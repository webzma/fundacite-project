"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

// Datos de usuario hardcodeados
const MOCK_USERS = [
  {
    id: "1",
    email: "wilberkledezma@gmail.com",
    password: "admin",
    name: "Administrador",
    role: "admin",
    bio: "Administrador del sistema de talleres y cursos.",
    phone: "+52 555 123 4567",
  },
];

type User = {
  id: string;
  email: string;
  name: string;
  role: string;
  bio?: string;
  phone?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => boolean;
  logout: () => void;
  register: (name: string, email: string, password: string) => boolean;
  updateUserProfile: (userData: Partial<User>) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState(MOCK_USERS);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("user");
      }
    }

    // Cargar usuarios del localStorage si existen
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      try {
        setUsers(JSON.parse(storedUsers));
      } catch (error) {
        console.error("Error parsing stored users:", error);
        localStorage.setItem("users", JSON.stringify(MOCK_USERS));
      }
    } else {
      localStorage.setItem("users", JSON.stringify(MOCK_USERS));
    }
  }, []);

  const login = (
    email: string,
    password: string,
    rememberMe = false
  ): boolean => {
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      // Omitir la contraseña del objeto de usuario
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);

      // Solo guardar en localStorage si rememberMe está activado
      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      }
      return true;
    }

    return false;
  };

  const register = (name: string, email: string, password: string): boolean => {
    // Verificar si el email ya existe
    if (users.some((u) => u.email === email)) {
      return false;
    }

    // Crear nuevo usuario
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name,
      role: "user",
      phone: "",
      bio: "",
    };

    // Actualizar la lista de usuarios
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Iniciar sesión automáticamente
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem("user", JSON.stringify(userWithoutPassword));

    return true;
  };

  const updateUserProfile = (userData: Partial<User>): boolean => {
    if (!user) return false;

    try {
      // Actualizar el usuario actual
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);

      // Actualizar en localStorage si existe
      if (localStorage.getItem("user")) {
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      // Actualizar en la lista de usuarios
      const updatedUsers = users.map((u) =>
        u.id === user.id ? { ...u, ...userData, password: u.password } : u
      );
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      return true;
    } catch (error) {
      console.error("Error updating user profile:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
}
