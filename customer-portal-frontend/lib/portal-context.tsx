"use client"

import * as React from "react"
import { type Customer, type PortalData, getCustomerPortalData, loginCustomer } from "@/lib/api"

type PortalContextValue = {
  customer: Customer | null
  portalData: PortalData | null
  isLoading: boolean
  error: string | null
  login: (email: string) => Promise<boolean>
  loadPortal: (customerId: string) => Promise<void>
}

const PortalContext = React.createContext<PortalContextValue | undefined>(
  undefined
)

export function PortalProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [customer, setCustomer] = React.useState<Customer | null>(null)
  const [portalData, setPortalData] = React.useState<PortalData | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const login = React.useCallback(async (email: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const loggedIn = await loginCustomer(email)
      setCustomer(loggedIn)
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to login")
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  const loadPortal = React.useCallback(async (customerId: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getCustomerPortalData(customerId)
      setPortalData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load portal")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const value = React.useMemo(
    () => ({ customer, portalData, isLoading, error, login, loadPortal }),
    [customer, portalData, isLoading, error, login, loadPortal]
  )

  return (
    <PortalContext.Provider value={value}>
      {children}
    </PortalContext.Provider>
  )
}

export function usePortal() {
  const context = React.useContext(PortalContext)
  if (!context) {
    throw new Error("usePortal must be used within PortalProvider")
  }

  return context
}
