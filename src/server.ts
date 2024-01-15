import { app } from "./index";
import { ConnectDatabase } from "@/config";
import cors from "@koa/cors";

const PORT = process.env.PORT || 3001;

app.use(cors());

app.listen(PORT, () => {
  console.log(`🚀 Server listening localhost:${PORT} 🚀`);
});

ConnectDatabase();
