import { saveUrlToDB, longUrlExist, redirectToLongURL } from "@/controllers";
import Router from "koa-router";

const router = new Router();

router.get("/", async (ctx) => {
  ctx.body = `Server is Running! 💨`;
});

router.get("/:token", redirectToLongURL);

router.post("/isExist", longUrlExist);
router.post("/sendUrl", saveUrlToDB);

export default router;
