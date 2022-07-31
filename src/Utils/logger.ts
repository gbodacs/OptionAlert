class Logger {
  info(text: string) {
    console.log("INFO: "+text);
  }

  warning(text: string) {
    console.log("Warning: "+text);
  }

  error(text: string) {
    console.log("Error: "+text);
  }
}

const logger: Logger = new Logger();

// ************
// ** Usage: **
// ************
// logger.info("Hello world!");
// logger.error("Hello error!");

export default logger ;
