"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface User {
  id: string
  name: string
  email: string
  college?: string
  major?: string
  graduationYear?: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (userData: Omit<User, "id"> & { password: string }) => Promise<boolean>
  logout: () => void
  updateProfile: (data: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session in localStorage
    const savedUser = localStorage.getItem("career-compass-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user exists in localStorage
    const savedUsers = JSON.parse(localStorage.getItem("career-compass-users") || "[]")
    const existingUser = savedUsers.find(
      (u: User & { password: string }) => u.email === email && u.password === password,
    )

    if (existingUser) {
      const { password: _, ...userWithoutPassword } = existingUser
      setUser(userWithoutPassword)
      localStorage.setItem("career-compass-user", JSON.stringify(userWithoutPassword))
      return true
    }
    return false
  }

  const signup = async (userData: Omit<User, "id"> & { password: string }): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const savedUsers = JSON.parse(localStorage.getItem("career-compass-users") || "[]")

    // Check if email already exists
    if (savedUsers.some((u: User) => u.email === userData.email)) {
      return false
    }

    const newUser: User & { password: string } = {
      ...userData,
      id: crypto.randomUUID(),
    }

    savedUsers.push(newUser)
    localStorage.setItem("career-compass-users", JSON.stringify(savedUsers))

    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)
    localStorage.setItem("career-compass-user", JSON.stringify(userWithoutPassword))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("career-compass-user")
  }

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      localStorage.setItem("career-compass-user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateProfile }}>
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
