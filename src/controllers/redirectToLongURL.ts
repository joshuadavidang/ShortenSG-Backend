import { AppDataSource } from "@/config";
import Url from "@/models/urls";

const findOgUrl = async (token: string) => {
  const dataRepository = AppDataSource.getRepository(Url);
  const result = await dataRepository.findOne({
    where: {
      token: token,
    },
  });
  return result ? result.og_url : null;
};

const redirectToLongURL = async (ctx: any) => {
  const { url } = ctx.request;
  const tokenOnly = url.split("/")[1];
  const originalUrl = await findOgUrl(tokenOnly);
  return ctx.redirect(originalUrl);
};

export { redirectToLongURL };
