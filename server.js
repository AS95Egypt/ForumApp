// packages
const express = require("express");
const helmet = require("helmet");
const colors = require("colors");
const RateLimit = require("express-rate-limit");
const morgan = require("morgan");
//const fs = require("fs");
var rfs = require("rotating-file-stream");
const path = require("path");
const compression = require("compression");
// utils
const Auth = require("./middlewares/auth.middleware");
const db = require("./utils/database");
const { useRouters } = require("./routes");
// Middlewares
const globalErrorMiddleware = require("./middlewares/error.middleware");

require("dotenv").config();

const apiCache = require("apicache");

const cache = apiCache.middleware;

// TODO rename _ to . in file names

const app = express();

module.exports = app;

const limiter = RateLimit({
  // Per IP
  windowMs: 6000, //60 * 1000, // 1 minute
  max: 100, // Limit each IP to 1 request per `window` (here, per 1 minute)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // store: ... , // Use an external store for more precise rate limiting
});

// NORMAL
// var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
//   flags: "a",
// });

// Database
db(() => {
  console.info(`Mongodb server has started!`);
  const PORT = process.env.PORT;

  app.use(compression());
  app.use(cache("10 seconds"));

  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  } else if (process.env.NODE_ENV === "production") {
    // create the stream
    var accessLogStream = rfs.createStream("access.log", {
      size: "1K", // size
      interval: "1d", // rotate daily
      path: path.join(__dirname, "log"),
    });

    app.use(
      morgan("combined", {
        stream: accessLogStream,
      })
    );
  }
  // config
  app.use(express.json({ limit: "20kb" }));
  app.use(helmet());
  app.use(limiter);

  // Middleware
  app.use(Auth.authTokenMiddleware);
  app.use(Auth.authApiKeyMiddleware);

  // Routes
  useRouters(app);

  // for catching errors in async handlers
  //app.use(globalErrorMiddleware);

  //app.use(Morgan("combined", { stream: accessLogStream }));

  app.listen(PORT, "0.0.0.0", () =>
    console.log("Express server has started...".green)
  );
});
