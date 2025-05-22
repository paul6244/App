// Payment types
export interface PaymentMethod {
  id: string
  name: string
  icon: string
  description: string
}

export interface PaymentRequest {
  amount: number
  email: string
  reference: string
  callbackUrl: string
  metadata: any
}

export interface PaymentResponse {
  status: boolean
  message: string
  data: {
    authorization_url: string
    access_code: string
    reference: string
  }
}

// Available payment methods
export const paymentMethods: PaymentMethod[] = [
  {
    id: "card",
    name: "Credit/Debit Card",
    icon: "credit-card",
    description: "Pay with Visa, Mastercard, or Verve",
  },
  {
    id: "momo",
    name: "Mobile Money",
    icon: "smartphone",
    description: "Pay with MTN, Vodafone, or AirtelTigo Mobile Money",
  },
  {
    id: "bank",
    name: "Bank Transfer",
    icon: "building-bank",
    description: "Pay directly from your bank account",
  },
]

// Initialize payment with Paystack
export async function initializePayment(paymentData: PaymentRequest): Promise<PaymentResponse> {
  try {
    // In a real app, this would be an actual API call to Paystack
    // For demo purposes, we're simulating the response
    console.log("Initializing payment with data:", paymentData)

    // Simulate API response
    return {
      status: true,
      message: "Authorization URL created",
      data: {
        authorization_url: `https://checkout.paystack.com/${Math.random().toString(36).substring(2, 15)}`,
        access_code: Math.random().toString(36).substring(2, 15),
        reference: paymentData.reference,
      },
    }
  } catch (error) {
    console.error("Payment initialization failed:", error)
    throw new Error("Payment initialization failed")
  }
}

// Verify payment status
export async function verifyPayment(reference: string): Promise<boolean> {
  try {
    // In a real app, this would verify the payment with Paystack
    // For demo purposes, we're returning true
    console.log("Verifying payment with reference:", reference)
    return true
  } catch (error) {
    console.error("Payment verification failed:", error)
    return false
  }
}

// Generate a unique reference for the transaction
export function generateReference(): string {
  return `SHOPEASE-${Date.now()}-${Math.floor(Math.random() * 1000000)}`
}
