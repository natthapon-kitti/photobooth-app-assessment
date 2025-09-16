import Elysia from "elysia";

export const galleryRoutes = new Elysia({ prefix: '/gallery' })
    .post('/save-image', ({ body }) => {
        const { user_id, image_url } = body




    })