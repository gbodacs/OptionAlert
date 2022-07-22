import { createLogger, transports, format, Logger } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const rotateTransport = new DailyRotateFile({
  filename: "application-%DATE%.log",
  datePattern: "YYYY-MM-DD_HH-mm",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
});

const logger: Logger = createLogger({
  transports: [new transports.Console(), rotateTransport],
  format: format.combine(
    format.timestamp(),
    format.splat(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
});

// ************
// ** Usage: **
// ************
// logger.info("Hello world!");
// logger.error("Hello error!");

export default logger ;
