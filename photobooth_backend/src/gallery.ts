import Elysia from "elysia";
import { PrismaClient } from "../src/generated/prisma"

const prisma = new PrismaClient()

export const galleryRoutes = new Elysia({ prefix: '/gallery' })
    .post('/save-image', async ({ body, set, cookie: { session } }) => {


        if (!session.value) {
            set.status = 404
            return {
                message: "Unauthenticated"
            }
        }
        const { image_url, title } = body

        console.log(session.value)

        const findUserID = await prisma.sessions.findUnique({
            where: {
                id: session.value,
            },
            select: {
                user_id: true, // Only select the user_id to reduce data transfer
            },
        });

        console.log(findUserID)

        // create new gallery image
        await prisma.galleries.create({
            data: {
                image_url: image_url,
                title: title,
                user_id: findUserID?.user_id
            },
        })

        return {
            message: "image saved!"
        }

    })