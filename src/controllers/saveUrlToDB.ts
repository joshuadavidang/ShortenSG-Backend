import { API_STATUS } from "@/helpers";
import { AppDataSource } from "@/config";
import { UrlService } from "@/services/UrlService";

async function saveUrlToDB(ctx: any) {
  try {
    const { ogUrl } = ctx.request.body;
    const urlService = new UrlService();
    const newUrl = urlService.generateUrlObj(ogUrl);
    const result = await AppDataSource.manager.save(newUrl);
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
