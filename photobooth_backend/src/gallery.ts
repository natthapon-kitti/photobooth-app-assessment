import Elysia from "elysia"
import { PrismaClient } from "../src/generated/prisma"

const prisma = new PrismaClient()

export const galleryRoutes = new Elysia({ prefix: '/gallery' })
    .get('/get-image-by-user-id', async ({ set, cookie: { session } }) => {

        if (!session.value) {
            set.status = 404
            return {
                message: "Unauthenticated"
            }
        }
        // find user_id by session id
        const findUserID = await prisma.sessions.findUnique({
            where: {
                id: String(session.value),
            },
            select: {
                user_id: true,
            },
        })

        const galleries = await prisma.galleries.findMany({
            where: {
                user_id: findUserID?.user_id
            }
        })
        console.log(galleries)

        return galleries

    })
    .post('/save-image', async ({ body, set, cookie: { session } }) => {


        if (!session.value) {
            set.status = 404
            return {
                message: "Unauthenticated"
            }
        }
        const { image_url, title } = typeof body === "string" ? JSON.parse(body) : body


        // find user_id by session id
        const findUserID = await prisma.sessions.findUnique({
            where: {
                id: String(session.value),
            },
            select: {
                user_id: true,
            },
        })

        console.log(findUserID)

        // create new gallery image
        if (!findUserID?.user_id) {
            set.status = 400
            return {
                message: "User ID not found"
            }
        }

        await prisma.galleries.create({
            data: {
                image_url: image_url,
                title: title,
                user_id: findUserID.user_id
            },
        })

        return {
            message: "image saved!"
        }

    })
