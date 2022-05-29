// CONFIG SERVER
const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const router = require("./routes/router.js");

const app = express();

// CONFIG APP
const config = {
  port: 3000,
};

// CONFIG CORS
const corsOptions = {
  // origin: "*",
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
};

app.use(cors(corsOptions));
// app.options('*', cors())

app.listen(config.port, (_) => {
  console.log("SERVER UP runing at http://localhost:%d", config.port);
});

// SET ENGINE VIEW
app.set("view engine", "ejs");

// SET ROUTE STATIC VIEW
app.use(express.static("public"));

// SET PROCESS DATA
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// SET COOKIEPARSER
app.use(cookieParser(process.env.JWT_SECRET));

//  CONFIG ROUTES
app.use("/", router);
