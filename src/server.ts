import { env } from "process";
import { app } from "@/app";
import { connectMongo } from "@/shared/database/mongoose";
import { registerDependencies } from "./shared/container/register";

const port = env.PORT
const url = `http://localhost:${port}`

async function bootstrap() {
    await connectMongo();

    app.listen(port, () => {
        console.log(`Server is running on ${url}`);
    });
}

bootstrap();
