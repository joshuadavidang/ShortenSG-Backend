import { AppDataSource } from "@/config";
import { nanoid } from "nanoid";
import Url from "@/models/urls";

class UrlService {
  /**
   * Given an original url, generate a new url object that has token, the original url and short url
   * @param ogUrl
   * @returns a new url object
   */
  generateUrlObj(ogUrl: string) {
    const domain = process.env.DOMAIN;
    const token = nanoid(5);
    const urlObj = new Url();

    urlObj.token = token;
    urlObj.og_url = ogUrl;
    urlObj.short_url = `${domain}/${token}`;

    return urlObj;
  }

  /**
   * Given an original url, retrieve the data from database and return the result
   * @param ogUrl
   * @returns url object
   */
  async findLongUrl(ogUrl: string) {
    const dataRepository = AppDataSource.getRepository(Url);
    const result = await dataRepository.findOne({
      where: {
        og_url: ogUrl,
      },
    });
    return result;
  }

  /**
   * Given a short url token, retrieve the data from database and return the original url
   * @param token
   * @returns the original url
   */
  async findOgUrl(token: string) {
    const dataRepository = AppDataSource.getRepository(Url);
    const result = await dataRepository.findOne({
      where: {
        token: token,
      },
    });
    return result ? result.og_url : null;
  }
}

export { UrlService };
