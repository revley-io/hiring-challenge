"use client"

import * as React from "react"
import { usePortal } from "@/lib/portal-context"
import { BillingView } from "@/components/portal-billing"

export default function BillingPage() {
  const { customer, portalData, isLoading, error, loadPortal } = usePortal()

  React.useEffect(() => {
    if (customer) {
      void loadPortal(customer.id)
    }
  }, [customer, loadPortal])

  return (
    <BillingView
      customer={customer}
      portalData={portalData}
      isLoading={isLoading}
      error={error}
    />
  )
}
