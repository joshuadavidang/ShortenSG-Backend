import {
  saveUrlToDB,
  locateOgUrl,
  redirectToLongURL,
  validateUrl,
} from "@/controllers";
import Router from "koa-router";

const router = new Router();

router.get("/", async (ctx: any) => {
  ctx.body = `Server is Running! 💨`;
});

router.get("/:token", redirectToLongURL);

router.post("/isValidUrl", validateUrl);
router.post("/urlIsExist", locateOgUrl);
router.post("/sendUrl", saveUrlToDB);

export default router;
