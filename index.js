const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
// const sanitizeHtml = require("sanitize-html");

const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
const compression = require("compression");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

// Route files

const auth = require("./routes/auth");
const users = require("./routes/users");
const question = require("./routes/question");
const comments = require("./routes/comments");
const answer = require("./routes/answer");

const app = express();
app.use(compression());
// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// File uploading
app.use(fileupload());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
// app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());
var corsOptions = {
  origin: "https://stackoverflow-wastech.vercel.app",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
// Enable CORS
app.use(cors(corsOptions));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Mount routers
// pour assainir les données envoyer par les utilisateurs
// const sanitizer = (request, response, next) => {
//   if (request.body) {
//     for (const propName in request.body) {
//       // Grâce à request.body -> nouvelle valeur assainie grâce à function sanitizeHtml du module sanitize-html
//       request.body[propName] = sanitizeHtml(request.body[propName]);
//       console.log(" request.body[propName] ", request.body[propName]);
//     }
//   }
//   next();
// };
// middleware chargé d'assinir les données reçues doit être après celui qui organise les données reçues dans request.body (urlencoded etc.)
// app.use(sanitizer);

app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/comments", comments);
app.use("/api/v1/answer", answer);
app.use("/api/v1/question", question);

// Sanitize data
app.use(
  mongoSanitize({
    onSanitize: ({ req, key }) => {
      console.warn(`This request[${key}] is sanitized`, req);
    },
  })
);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
});
