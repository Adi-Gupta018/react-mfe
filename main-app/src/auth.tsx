import React, { createContext, useContext, useMemo, useState } from 'react'

type Role = 'admin' | 'user'
type Auth = { role: Role | null; token: string | null; login: (r: Role) => void; logout: () => void }
const AuthContext = createContext<Auth | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'))

  const role = useMemo<Role | null>(() => {
    if (!token) return null
    try {
      const payload = JSON.parse(atob((token.split('.')[1]) || 'e30=')) // mock decode
      return payload.role as Role
    } catch {
      return null
    }
  }, [token])

  const login = (r: Role) => {
    const payload = btoa(JSON.stringify({ role: r, iat: Date.now() }))
    const fakeToken = `header.${payload}.sig`
    localStorage.setItem('token', fakeToken)
    setToken(fakeToken)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  return <AuthContext.Provider value={{ role, token, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
