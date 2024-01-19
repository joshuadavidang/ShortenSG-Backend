import { API_STATUS } from "@/helpers";
import { UrlService } from "@/services/UrlService";

async function validateUrl(ctx: any) {
  try {
    const { ogUrl } = ctx.request.body;
    const urlService = new UrlService();
    const result = urlService.validateUrl(ogUrl);
    ctx.body = {
      status: API_STATUS.SUCCESS,
      result: result,
      message: result ? "Valid URL" : "Invalid URL",
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

export { validateUrl };
