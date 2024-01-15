import request from "supertest";
import { app } from "@/index";
import { ConnectDatabase } from "@/config";

beforeAll(async () => {
  await ConnectDatabase();
});

describe("Generate Short URL API", () => {
  test("Should generate a short url if the long url does not exist in database", async () => {
    const ogUrl = "https://www.crowdtask.gov.sg/quest/budget-meal/infobites";
    const urlExist = await request(app.callback()).post("/isExist").send({
      ogUrl,
    });

    const { status } = JSON.parse(urlExist.text);

    if (status === "Unavailable") {
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
    const urlExist = await request(app.callback()).post("/isExist").send({
      ogUrl,
    });
    const { status } = JSON.parse(urlExist.text);
    expect(status).toBe("Available");
  });
});
