import fs from "fs";
import path from "path";

/* get names */
const LOG_DIR = path.join(__dirname, "../logs");
const LOG_FILE = path.join(LOG_DIR, "error.log");

/* if they not exists then create anew */
function ensureLogFileExists(): void {
    if (!fs.existsSync(LOG_DIR)) {
        fs.mkdirSync(LOG_DIR, { recursive: true });
    }

    if (!fs.existsSync(LOG_FILE)) {
        fs.writeFileSync(LOG_FILE, "", "utf8");
    }
}


/* log every exception when exited with code 0 or 1 */
const logErrorToFile = (error: Error | string): void => {
    ensureLogFileExists();
    const logPath = path.join(__dirname, "../logs/error.log");
    const errorMessage = `[${new Date().toISOString()}] ${error instanceof Error ? error.stack : error}\n`;

    fs.appendFileSync(logPath, errorMessage, "utf8");
}

/* console the error */
const globalErrorHandler = (error: Error | string, origin: string): void => {
    console.error(`Critical Error: ${error instanceof Error ? error.message : error}`);

    logErrorToFile(error);

    console.log("Application is shutting down due to a critical error...");
    setTimeout(() => {
        process.exit(1);
    }, 500);
}


/* detect the error */
export const globalExceptionHandler = (): void => {
    process.on("uncaughtException", (err: Error) => {
        globalErrorHandler(err, "Uncaught Exception");
    });

    process.on("unhandledRejection", (reason: unknown, promise: Promise<any>) => {
        console.error("Unhandled Promise Rejection at:", promise, "reason:", reason);
        globalErrorHandler(reason instanceof Error ? reason : String(reason), "Unhandled Rejection");
    });

    process.on("SIGTERM", () => {
        console.log("Received SIGTERM, shutting down gracefully...");
        process.exit(0);
    });

    process.on("SIGINT", () => {
        console.log("Received SIGINT (Ctrl+C), shutting down gracefully...");
        process.exit(0);
    });
}
