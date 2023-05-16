import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

const getLogger = (fileName = 'App') => {


  // Save logs to file. Rotates daily.
  const fileTransport = new transports.DailyRotateFile({
    filename: `logs/${fileName}-%DATE%.log`,              // Save the logs to ./logs folder at the top level. Pass in a file name so we can use different files for the Blog, main site, memebrs area etc.
    datePattern: 'DD-MM-YYYY',                            // Don't worry, the log file will include the Hours, Minutes and Seconds!
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',                                      // Keep files for 2 weeks.
  });


  // Display logs in the console window
  const consoleTransport = new transports.Console({
    level: process.env.LOG_LEVEL,
    handleExceptions: false,
    json: false,
    colorize: true,
    format: format.printf((i) => `${i.message}`),
  });


  // Format of the log message
  // printf() is quick and readable.
  // However, if we want to send these logs using HTTP to an AWS Blob then you need to use JSON format. 
  // Just use format.json() below, not logMsgFormat.
  // The printf() is giving errors when using it in NextJS. The fix is "npm i winston@next --save"
  /*
  const logMsgFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  });
  */


  // Build the logger
  const logger = createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.errors({ stack: true }),
      format.splat(),                                                                     // String interpolation splat for %d %s-style messages.
      format.json()                                                                       // Could uselogMsgFormat here but prefer json for allowing HTTP later on.
    ),
    defaultMeta: { service: 'my-app' },
    transports: [consoleTransport],                   // Only set up the console logs intially.
  });


  // Environment Setup
  // You can add (or not add) the logging to file in the production / dev / local environment.
  // By default, no transports are set on the default logger. We just set up consoleTransport above in CreateLogger. 
  // You must add or remove transports via the add() and remove() methods.
  // For example, maybe add an AWS streaming transport to send logs to AWS Coudwatch? But only do it in production.

  if (process.env.NODE_ENV === 'production') {
    logger.add(fileTransport);
  }

  if (process.env.NODE_ENV === 'development') {
    logger.add(fileTransport);
  }

  if (process.env.NODE_ENV === 'local') {
    logger.add(fileTransport);
  }

  return logger;
};

export default getLogger();

/*

FYI:

Writing logs to a file requires access to 'fs' filesystem, which you can't do in the frontend of NextJS (getStaticProps() and getStaticRoutes() are run on the server side so you can use it there).
To save your logs to a file you need to send them to the NextJS api and write them there, which is a bit much so don't bother logging frontend stuff.
Just log the api/ folder stuff.

To Install:

    npm install winston winston-daily-rotate-file

To Use:

    import logger from '@/logger/logger';

    logger.info(`api/blog/search.js - logging info message`);
    logger.warn(`api/blog/search.js - logging warning message`);
    logger.error(`api/blog/search.js - logging error message`);

    logger.info(`api/blog/search.js - Request Headers: ${JSON.stringify(req.headers)}`);


Produces these log messages:

    {"level":"info","message":"api/blog/search.js - logging info message","service":"my-app","timestamp":"2023-04-04 20:27:19"}
    {"level":"warn","message":"api/blog/search.js - logging warning message","service":"my-app","timestamp":"2023-04-04 20:27:19"}
    {"level":"error","message":"api/blog/search.js - logging error message","service":"my-app","timestamp":"2023-04-04 20:27:19"}

*/