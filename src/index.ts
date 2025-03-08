import "dotenv/config";
import express , { Express } from "express";
import { globalExceptionHandler } from "./services/globalEcceptionHandler";
import cors from "cors";
import router from "./routes";
import { PrismaClient } from "@prisma/client";
import errorHandler from "./middlewares/errorHandler";

globalExceptionHandler();

declare global {
    var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV === "development") {
    global.prisma = prisma;
}

const connectDB = async () =>  {
    try {
        await prisma.$connect();
        console.log("Connected to mysql database successfully");
    } catch (error) {
        console.error("Failed to connect to mysql database", error);
        process.exit(1);
    }
}
connectDB();

const PORT = Number(process.env.PORT) || 4006;
const HOST = process.env.HOST || "0.0.0.0";
const app = express();

app.use(cors())
app.use(express.json());
app.use('/', router);
app.use(errorHandler);

const schoolManagementApp = app.listen(PORT, HOST, () => {
    console.log(`Server listening on ${PORT} with host : ${HOST}`);
});

process.on("exit", () => {
    console.log("Shutting down server...");
    schoolManagementApp.close(() => {
        console.log("school management server closed")
    });
});