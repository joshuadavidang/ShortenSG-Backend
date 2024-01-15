import Url from "@/models/urls";
import { AppDataSource } from "@/config";
import { API_STATUS } from "@/type";
import { nanoid } from "nanoid";

const generateShortUrl = async (ctx: any) => {
  try {
    const { ogUrl } = ctx.request.body;
    const domain = process.env.DOMAIN;
    const token = nanoid(5);
    const newUrl = new Url();

    newUrl.token = token;
    newUrl.og_url = ogUrl;
    newUrl.short_url = domain + "/" + token;

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
};

export { generateShortUrl };
