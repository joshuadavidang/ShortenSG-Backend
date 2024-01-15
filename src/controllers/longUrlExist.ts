import Url from "@/models/urls";
import { AppDataSource } from "@/config";
import { DATA } from "@/type";

const longUrlExist = async (ctx: any) => {
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
        ? "Short url exists in database"
        : "Short url does not exist in database, generating one now.",
      result: result ? result : ogUrl,
    };
    ctx.status = 200;
  } catch (err) {
    ctx.body = err;
    ctx.status = 500;
  }
};

export { longUrlExist };
