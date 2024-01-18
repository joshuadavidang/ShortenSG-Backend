import { saveUrlToDB, locateOgUrl, redirectToLongURL } from "@/controllers";
import Router from "koa-router";

const router = new Router();

router.get("/", async (ctx) => {
  ctx.body = `Server is Running! 💨`;
});

router.get("/:token", redirectToLongURL);

router.post("/urlIsExist", locateOgUrl);
router.post("/sendUrl", saveUrlToDB);

export default router;
