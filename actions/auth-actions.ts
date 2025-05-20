"use server"

import { auth, signIn, signOut } from "@/auth"
import { hash } from "bcryptjs"
import { redirect } from "next/navigation"
import { AuthError } from "next-auth"
import { prisma } from "@/lib/db"

export type SignUpFormState = {
  errors?: {
    email?: string[]
    password?: string[]
    confirmPassword?: string[]
    global?: string
  }
  success?: boolean
}

export type LoginFormState = {
  errors?: {
    email?: string[]
    password?: string[]
    global?: string
  }
  success?: boolean
}

export async function signUp(prevState: SignUpFormState, formData: FormData): Promise<SignUpFormState> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  // Validate inputs
  const errors: SignUpFormState["errors"] = {}

  if (!email) {
    errors.email = ["Email is required"]
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = ["Please enter a valid email address"]
  }

  if (!password) {
    errors.password = ["Password is required"]
  } else if (password.length < 8) {
    errors.password = ["Password must be at least 8 characters long"]
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = ["Passwords do not match"]
  }

  if (Object.keys(errors).length > 0) {
    return { errors }
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return {
        errors: {
          email: ["User with this email already exists"],
        },
      }
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Create new user
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: email.split("@")[0], // Default name from email
      },
    })

    // Sign in the user after creation
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    return { success: true }
  } catch (error) {
    console.error("Sign up error:", error)
    return {
      errors: {
        global: "Error creating account. Please try again later.",
      },
    }
  }
}

export async function login(prevState: LoginFormState, formData: FormData): Promise<LoginFormState> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Validate inputs
  const errors: LoginFormState["errors"] = {}

  if (!email) {
    errors.email = ["Email is required"]
  }

  if (!password) {
    errors.password = ["Password is required"]
  }

  if (Object.keys(errors).length > 0) {
    return { errors }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    return { success: true }
  } catch (error) {
    console.error("Login error:", error)

    if (error instanceof AuthError) {
      return {
        errors: {
          global: "Invalid email or password",
        },
      }
    }

    return {
      errors: {
        global: "Error signing in. Please try again later.",
      },
    }
  }
}

export async function logout() {
  await signOut({ redirect: false })
  redirect("/")
}

export async function getCurrentUser() {
  const session = await auth()
  return session?.user
}
