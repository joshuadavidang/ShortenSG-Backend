import { DATA } from "@/helpers";
import { UrlService } from "@/services/UrlService";

async function locateOgUrl(ctx: any) {
  try {
    const { ogUrl } = ctx.request.body;
    const urlService = new UrlService();
    const result = await urlService.findLongUrl(ogUrl);
    ctx.body = {
      status: result ? DATA.AVAILABLE : DATA.UNAVAILABLE,
      message: result
        ? "Long url exists in database"
        : "Long url does not exist in database, saving it now.",
      result: result ? result : ogUrl,
    };
    ctx.status = 200;
  } catch (err) {
    ctx.body = err;
    ctx.status = 500;
  }
}

export { locateOgUrl };
