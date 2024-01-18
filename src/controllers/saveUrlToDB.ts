import { API_STATUS } from "@/helpers";
import { UrlService } from "@/services/UrlService";

async function saveUrlToDB(ctx: any) {
  try {
    const { ogUrl } = ctx.request.body;
    const urlService = new UrlService();
    const result = await urlService.saveToDatabase(ogUrl);
    ctx.body = {
      status: API_STATUS.SUCCESS,
      result: result,
      message: "Generated a short url",
    };
    ctx.status = 200;
  } catch (err) {
    ctx.body = {
      status: API_STATUS.FAILURE,
      message: err,
    };
    ctx.status = 500;
  }
}

export { saveUrlToDB };
