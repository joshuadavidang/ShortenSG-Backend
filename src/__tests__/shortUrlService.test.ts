import { ConnectDatabase } from "@/config";
import { UrlService } from "@/services/UrlService";

describe("Short URL Service", () => {
  beforeAll(async () => {
    await ConnectDatabase();
  });

  const urlService = new UrlService();

  test("Should return a new url object if a long url is given", () => {
    const ogUrl = "https://www.crowdtask.gov.sg/quest/budget-meal/infobites";
    const urlObj = urlService.generateUrlObj(ogUrl);
    expect(urlObj.og_url).toBe(ogUrl);
  });

  test("Should return null if token is not found", async () => {
    const token = "MISSINGTOKEN";
    const result = await urlService.findOgUrl(token);
    expect(result).toBe(null);
  });
});
