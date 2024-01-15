import Router from "koa-router";
import {
  longUrlExist,
  generateShortUrl,
  redirectToLongURL,
} from "@/controllers";

const router = new Router();

router.get("/", async (ctx) => {
  ctx.body = `Server is Running! 💨`;
});

router.get("/:token", redirectToLongURL);

router.post("/isExist", longUrlExist);
router.post("/sendUrl", generateShortUrl);

export default router;
