import winston from "winston";

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(winston.format.timestamp(), logFormat),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

export const logInfo = (message: string) => logger.info(message);
export const logError = (message: string) => logger.error(message);
