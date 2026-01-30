import express from "express";
import "@/configs/env";
import { errorHandler } from "@/shared/middlewares/error-handler.middleware";
import { handleInvalidJson } from "@/shared/middlewares/handle-invalid-json.middleware";
import cookieParser from "cookie-parser";
import { env } from "@/configs/env";
import { registerDependencies } from "@/shared/container/register";

const app = express();

app.use(express.json());
app.use(handleInvalidJson)
app.use(cookieParser(env.COOKIE_SECRET))

async function setupRoutes() {

    //importando dps para as dependencias ja estarem todas registradas no container antes de carregar as rotas
    registerDependencies()

    const { router } = await import("./routes.js");
    app.use(router)
    app.use(errorHandler)
}

setupRoutes()

export { app } 