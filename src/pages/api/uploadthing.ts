import { createNextPageApiHandler } from "uploadthing/next-legacy";
 
import { ourFileRouter } from "@/pages/server/uploadthing";
 
const handler = createNextPageApiHandler({
  router: ourFileRouter,
});
 
export default handler;