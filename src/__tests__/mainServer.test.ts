import request from "supertest";
import { app } from "@/index";

describe("Main Server", () => {
  test("Server should return a text", async () => {
    const response = await request(app.callback()).get("/");
    const { status, text } = response;
    expect(status).toBe(200);
    expect(text).toBe("Server is Running! 💨");
  });
});
