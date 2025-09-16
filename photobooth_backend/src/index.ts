import { Elysia } from "elysia"
import { hash, compare } from "bcryptjs"
import { PrismaClient } from "../src/generated/prisma"
import { cors } from '@elysiajs/cors'
import { galleryRoutes } from "./gallery"



const prisma = new PrismaClient()
const port = Bun.env.SERVER_PORT ?? 3000

type RegisterBody = {
  username: string
  password: string
  email: string
}

type LoginBody = {
  email: string
  password: string
}


const app = new Elysia()
  .use(cors({
    credentials: true
  }))
  .use(galleryRoutes)
  .get("/", () => "Hello Elysia")
  // registration endpoint
  .post("/register", async ({ body, set, cookie: { session } }) => {
    const { username, password, email } = typeof body === "string" ? JSON.parse(body) : body
    if (!username || !password || !email) {
      set.status = 404
      return { error: "Missing fields" }
    }

    console.log("Registering user:", username)

    // check if user exists
    const exists = await prisma.users.findFirst({ where: { email } })
    if (exists) {
      set.status = 404
      return { error: "User already exists" }
    }

    // hashing password with bcryptjs
    const hashedPassword = await hash(password, 10)

    // create user
    const newUser = await prisma.users.create({
      data: { username, password_hash: hashedPassword, email },
    })

    // create session
    const sessionId = crypto.randomUUID()
    await prisma.sessions.create({
      data: {
        id: sessionId,
        user_id: newUser.id
      }
    });
    session.value = sessionId
    session.httpOnly = true
    session.maxAge = 3600 * 24
    session.sameSite = 'lax'
    session.secure = true

    return { success: true }
  })
  // login endpoint
  .post("/login", async ({ body, set, cookie: { session } }) => {
    const { email, password } = typeof body === "string" ? JSON.parse(body) : body
    if (!email || !password) {
      set.status = 404
      return { error: "Missing fields" }
    }

    // check if user exists
    const user = await prisma.users.findUnique({ where: { email } })

    // if user not found return error 404
    if (!user) {
      set.status = 404
      return {
        error: "Invalid credentials"
      }
    }

    const valid = await compare(password, user.password_hash)
    if (!valid) {
      set.status = 404
      return { error: "Invalid credentials" }
    }


    // create session 
    const sessionId = crypto.randomUUID()
    await prisma.sessions.create({
      data: {
        id: sessionId,
        user_id: user.id
      }
    });
    session.value = sessionId
    session.httpOnly = true
    session.maxAge = 3600 * 24
    session.sameSite = 'lax'
    session.secure = true

    return { success: true }
  })
  // check user session 
  .get('/me', ({ set, cookie: { session } }) => {

    console.log(session)
    if (!session.value) {
      set.status = 404
      return { message: "Not authenticated" }
    }

    return {
      message: "Authenticated",
    }
  })
  .listen(port)

console.log(
  `🦊 Elysia is running at ${port}`
)
