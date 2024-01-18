import request from "supertest";
import { app } from "@/index";
import { ConnectDatabase } from "@/config";
import { DATA } from "@/helpers";

describe("Generate Short URL API", () => {
  beforeAll(async () => {
    await ConnectDatabase();
  });

  test("Should generate a short url if long url does not exist in database", async () => {
    const ogUrl = "https://www.crowdtask.gov.sg/quest/budget-meal/infobites";
    const urlExist = await request(app.callback()).post("/urlIsExist").send({
      ogUrl,
    });
    const { status } = JSON.parse(urlExist.text);
    if (status === DATA.UNAVAILABLE) {
      const response = await request(app.callback())
        .post("/sendUrl")
        .send({ ogUrl });
      const { status, body } = response;
      expect(status).toBe(200);
      expect(body.result.og_url).toBe(ogUrl);
    }
  });

  test("Should not generate a short url if the long url exists in database", async () => {
    const ogUrl = "https://www.crowdtask.gov.sg/quest/budget-meal/infobites";
    const urlExist = await request(app.callback()).post("/urlIsExist").send({
      ogUrl,
    });
    const { status } = JSON.parse(urlExist.text);
    expect(status).toBe(DATA.AVAILABLE);
  });
});
