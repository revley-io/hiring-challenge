export type Customer = {
  id: string
  email: string
}

export type Product = {
  id: string
  name: string
  price: number
}

export type SubscriptionStatus = "active" | "paused" | "cancelled"

export type Subscription = {
  id: string
  productId: string
  customerId: string
  price: number
  status: SubscriptionStatus
  createdAt: string
  updatedAt: string
  deletedAt?: string | null
}

export type PaymentMethod = {
  brand: string
  last4: string
  expMonth: number
  expYear: number
}

export type SubscriptionWithProduct = Omit<Subscription, "productId"> & {
  product: Product
}

export type PortalData = {
  customer: Customer
  monthlyTotal: number
  paymentMethod: PaymentMethod
  subscriptions: SubscriptionWithProduct[]
}

const customers: Customer[] = [
  { id: "cus_01", email: "test@example.com" },
]

const products: Product[] = [
  { id: "prod_starter", name: "Starter", price: 29 },
  { id: "prod_growth", name: "Growth", price: 79 },
  { id: "prod_enterprise", name: "Enterprise", price: 199 },
]

const subscriptions: Subscription[] = [
  {
    id: "sub_01",
    productId: "prod_starter",
    customerId: "cus_01",
    price: 29,
    status: "active",
    createdAt: "2025-11-08T12:00:00Z",
    updatedAt: "2026-01-03T09:12:00Z",
    deletedAt: null,
  },
  {
    id: "sub_02",
    productId: "prod_growth",
    customerId: "cus_01",
    price: 79,
    status: "paused",
    createdAt: "2025-06-19T12:00:00Z",
    updatedAt: "2025-12-22T09:12:00Z",
    deletedAt: null,
  },
  {
    id: "sub_03",
    productId: "prod_enterprise",
    customerId: "cus_01",
    price: 199,
    status: "cancelled",
    createdAt: "2024-03-14T12:00:00Z",
    updatedAt: "2025-02-02T09:12:00Z",
    deletedAt: "2025-02-10T09:12:00Z",
  },
]

const paymentMethods: Record<string, PaymentMethod> = {
  cus_01: {
    brand: "Visa",
    last4: "4242",
    expMonth: 8,
    expYear: 2027,
  },
}

export async function loginCustomer(
  email: string
): Promise<Customer> {
  const existing = customers.find((customer) => customer.email === email)
  if (!existing) {
    throw new Error("Customer does not exist")
  }
  return existing
}

export async function getCustomerPortalData(
  customerId: string
): Promise<PortalData> {
  const customer = customers.find((entry) => entry.id === customerId)
  if (!customer) {
    throw new Error("Customer not found")
  }

  const activeSubscriptions = subscriptions
    .filter((subscription) => subscription.customerId === customerId)
    .filter((subscription) => !subscription.deletedAt)
    .map((subscription) => {
      const product = products.find(
        (entry) => entry.id === subscription.productId
      )

      if (!product) {
        throw new Error("Product not found")
      }

      return {
        ...subscription,
        product,
      }
    })

  const monthlyTotal = activeSubscriptions
    .filter((subscription) => subscription.status === "active")
    .reduce((total, subscription) => total + subscription.price, 0)

  return {
    customer,
    monthlyTotal,
    paymentMethod: paymentMethods[customerId],
    subscriptions: activeSubscriptions,
  }
}
