"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  addresses: Address[]
}

export interface Address {
  id: string
  type: "billing" | "shipping"
  firstName: string
  lastName: string
  company?: string
  address: string
  city: string
  postalCode: string
  country: string
  isDefault: boolean
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => void
  updateProfile: (userData: Partial<User>) => Promise<void>
  addAddress: (address: Omit<Address, "id">) => void
  updateAddress: (addressId: string, address: Partial<Address>) => void
  removeAddress: (addressId: string) => void
}

interface RegisterData {
  name: string
  email: string
  password: string
  phone?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("flawless-beauty-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  // Save user to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("flawless-beauty-user", JSON.stringify(user))
    } else {
      localStorage.removeItem("flawless-beauty-user")
    }
  }, [user])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data
      const mockUser: User = {
        id: "user_" + Date.now(),
        name: "Marie Dupont",
        email,
        phone: "+33 6 12 34 56 78",
        addresses: [
          {
            id: "addr_1",
            type: "billing",
            firstName: "Marie",
            lastName: "Dupont",
            address: "123 Rue de la Paix",
            city: "Paris",
            postalCode: "75001",
            country: "France",
            isDefault: true,
          },
        ],
      }

      setUser(mockUser)
    } catch (error) {
      throw new Error("Échec de la connexion")
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: RegisterData) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newUser: User = {
        id: "user_" + Date.now(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        addresses: [],
      }

      setUser(newUser)
    } catch (error) {
      throw new Error("Échec de l'inscription")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
  }

  const updateProfile = async (userData: Partial<User>) => {
    if (!user) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      setUser({ ...user, ...userData })
    } catch (error) {
      throw new Error("Échec de la mise à jour du profil")
    } finally {
      setIsLoading(false)
    }
  }

  const addAddress = (addressData: Omit<Address, "id">) => {
    if (!user) return

    const newAddress: Address = {
      ...addressData,
      id: "addr_" + Date.now(),
    }

    setUser({
      ...user,
      addresses: [...user.addresses, newAddress],
    })
  }

  const updateAddress = (addressId: string, addressData: Partial<Address>) => {
    if (!user) return

    setUser({
      ...user,
      addresses: user.addresses.map((addr) => (addr.id === addressId ? { ...addr, ...addressData } : addr)),
    })
  }

  const removeAddress = (addressId: string) => {
    if (!user) return

    setUser({
      ...user,
      addresses: user.addresses.filter((addr) => addr.id !== addressId),
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        addAddress,
        updateAddress,
        removeAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
