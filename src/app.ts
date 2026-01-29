import express from "express";
import "./configs/env";
import { router } from "./routes";
import { errorHandler } from "./shared/middlewares/error-handler.middleware";
import { handleInvalidJson } from "./shared/middlewares/handle-invalid-json.middleware";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(handleInvalidJson)
app.use(cookieParser())
app.use(router)
app.use(errorHandler)

export { app } 