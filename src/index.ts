import Koa from "koa";
import parser from "koa-bodyparser";
import cors from "@koa/cors";
import router from "@/router";
import "reflect-metadata";
import dotenv from "dotenv";

dotenv.config();

const app = new Koa();

app.use(cors());
app.use(parser());
app.use(router.routes());

export { app };
