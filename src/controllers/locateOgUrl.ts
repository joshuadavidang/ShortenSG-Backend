import { DATA } from "@/helpers";
import { UrlService } from "@/services/UrlService";

async function locateOgUrl(ctx: any) {
  try {
    const { ogUrl } = ctx.request.body;
    const urlService = new UrlService();
    const result = await urlService.findLongUrl(ogUrl);
    if (result) {
      ctx.body = {
        status: DATA.AVAILABLE,
        message: "Long url exists in database",
        result: result,
      };
    } else {
      ctx.body = {
        status: DATA.UNAVAILABLE,
        message: "Long url does not exist in database, saving it now.",
        result: ogUrl,
      };
    }
    ctx.status = 200;
  } catch (err) {
    ctx.body = err;
    ctx.status = 500;
  }
}

export { locateOgUrl };
