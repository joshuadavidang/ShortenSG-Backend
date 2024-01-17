import { AppDataSource } from "@/config";
import { DATA } from "@/type";
import Url from "@/models/urls";

async function longUrlExist(ctx: any) {
  try {
    const { ogUrl } = ctx.request.body;
    const dataRepository = AppDataSource.getRepository(Url);
    const result = await dataRepository.findOne({
      where: {
        og_url: ogUrl,
      },
    });
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

export { longUrlExist };
