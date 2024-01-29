// External
import { createNextPageApiHandler } from "uploadthing/next-legacy";

// Internal
import { OurFileRouter } from "@/pages/server/uploadthing";
 
const handler = createNextPageApiHandler({
  router: OurFileRouter,
});
 
export default handler;