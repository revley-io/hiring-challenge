"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { usePortal } from "@/lib/portal-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function PortalEntry() {
  const router = useRouter()
  const { login, isLoading, error } = usePortal()
  const [email, setEmail] = React.useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const ok = await login(email)
    if (ok) router.push("/billing")
  }

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Customer Portal</CardTitle>
          <CardDescription>
            Enter your email to manage billing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </Field>
            </FieldGroup>
            {error ? (
              <p className="text-destructive text-sm">{error}</p>
            ) : null}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Continue"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
