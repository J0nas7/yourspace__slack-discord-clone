import { createUploadthing, type FileRouter } from "uploadthing/next-legacy"

const f = createUploadthing()
const handleAuth = () => {
    return { userId: true }
    throw new Error("Unauthorized")
}

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    spaceImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(async () => handleAuth())
        .onUploadComplete(() => { }),
    messageFile: f(["image", "pdf"])
        .middleware(() => handleAuth())
        .onUploadComplete(() => { })
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter;