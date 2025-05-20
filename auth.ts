import type { NextAuthConfig, Session, User } from "next-auth"
import type { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare, hash } from "bcryptjs"

// In-memory user store (for demo purposes only)
// In a real app, this would be replaced with a database
interface AppUser {
  id: string
  name: string
  email: string
  password: string
  image?: string
}

const users: AppUser[] = []

// Helper function to find a user by email
const findUserByEmail = (email: string) => {
  return users.find((user) => user.email === email)
}

// Helper function to create a user
const createUser = (email: string, password: string, name: string) => {
  const id = Math.random().toString(36).substring(2, 15)
  const user = { id, email, password, name }
  users.push(user)
  return user
}

// NextAuth configuration
const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const user = findUserByEmail(credentials.email)

          if (!user) {
            return null
          }

          const isPasswordValid = await compare(credentials.password, user.password)

          if (!isPasswordValid) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.id = token.id as string
        session.user.name = token.name as string
        session.user.email = token.email as string
      }
      return session
    },
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },
  },
}

// Import Auth.js with the correct named imports
import { NextAuth } from "next-auth"

// Create the Auth.js handlers
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)

// Export helper functions for user management
export async function createUserAccount(email: string, password: string) {
  const existingUser = findUserByEmail(email)

  if (existingUser) {
    throw new Error("User already exists")
  }

  const hashedPassword = await hash(password, 10)
  const name = email.split("@")[0]

  const user = createUser(email, hashedPassword, name)
  return { id: user.id, email: user.email, name: user.name }
}

export async function getUserByEmail(email: string) {
  const user = findUserByEmail(email)
  if (!user) return null

  return { id: user.id, email: user.email, name: user.name }
}
