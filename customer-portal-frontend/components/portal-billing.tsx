"use client"

import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { type PortalData } from "@/lib/api"

type BillingViewProps = {
  customer: { email: string } | null
  portalData: PortalData | null
  isLoading: boolean
  error: string | null
}

export function BillingView({
  customer,
  portalData,
  isLoading,
  error,
}: BillingViewProps) {
  if (!customer) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center px-4 py-12">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Sign in required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Please return to the <Link href="/" className="underline">entry page</Link> to access your billing portal.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="bg-background min-h-screen px-4 py-12">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">Billing overview</h1>
          <p className="text-muted-foreground">
            {customer.email} · Manage your subscription and payment settings.
          </p>
        </header>

        {error ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-destructive">{error}</p>
            </CardContent>
          </Card>
        ) : null}

        {isLoading || !portalData ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground">Loading portal data...</p>
            </CardContent>
          </Card>
        ) : (
          <>
            <section className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Monthly charge
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-semibold">
                    ${portalData.monthlyTotal}/mo
                  </div>
                  <p className="text-muted-foreground mt-2 text-sm">
                    Active subscriptions billed monthly.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Payment method
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  <div className="text-lg font-semibold">
                    {portalData.paymentMethod.brand} •••• {portalData.paymentMethod.last4}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Expires {portalData.paymentMethod.expMonth}/
                    {portalData.paymentMethod.expYear}
                  </p>
                <p className="my-2 text-muted-foreground text-sm">Return to <Link href="/" className="underline">entry page</Link></p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Subscriptions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-semibold">
                    {portalData.subscriptions.length}
                  </div>
                  <p className="text-muted-foreground mt-2 text-sm">
                    Total subscriptions in your account.
                  </p>
                </CardContent>
              </Card>
            </section>

            <Card>
              <CardHeader>
                <CardTitle>Subscriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-hidden rounded-lg border">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-muted text-muted-foreground">
                      <tr>
                        <th className="px-4 py-3 font-medium">Product</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium">Price</th>
                        <th className="px-4 py-3 font-medium">Updated</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {portalData.subscriptions.map((subscription) => (
                        <tr key={subscription.id}>
                          <td className="px-4 py-3">
                            <div className="font-medium">
                              {subscription.product.name}
                            </div>
                            <div className="text-muted-foreground text-xs">
                              {subscription.id}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant={statusVariant(subscription.status)}>
                              {subscription.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            ${subscription.price}/mo
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {formatDate(subscription.updatedAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Separator className="my-6" />
                <p className="text-muted-foreground text-sm">
                  Need to make changes? Contact support to upgrade, pause, or cancel.
                </p>
                <p className="my-2 text-muted-foreground text-sm">Return to <Link href="/" className="underline">entry page</Link></p>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}

function statusVariant(status: PortalData["subscriptions"][number]["status"]) {
  if (status === "active") {
    return "default"
  }

  if (status === "paused") {
    return "secondary"
  }

  return "outline"
}

function formatDate(value: string) {
  const date = new Date(value)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}
