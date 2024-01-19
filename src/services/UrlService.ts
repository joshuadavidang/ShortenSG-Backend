import { AppDataSource } from "@/config";
import { isValidUrl } from "@/helpers/isValidUrl";
import { nanoid } from "nanoid";
import Url from "@/models/urls";

class UrlService {
  public validateUrl(ogUrl: string) {
    return isValidUrl(ogUrl);
  }

  public generateUrlObj(ogUrl: string) {
    const domain = process.env.DOMAIN;
    const token = nanoid(5);
    const urlObj = new Url();

    urlObj.token = token;
    urlObj.og_url = ogUrl;
    urlObj.short_url = `${domain}/${token}`;

    return urlObj;
  }

  public async saveToDatabase(ogUrl: string) {
    const newUrlObj = this.generateUrlObj(ogUrl);
    return AppDataSource.manager.save(newUrlObj);
  }

  public async findLongUrl(ogUrl: string) {
    const dataRepository = AppDataSource.getRepository(Url);
    const result = await dataRepository.findOne({
      where: {
        og_url: ogUrl,
      },
    });
    return result;
  }

  public async findOgUrl(token: string) {
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
