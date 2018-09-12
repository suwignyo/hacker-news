"use strict";

// Basic express setup:

const PORT = 8080;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const newsRoutes = require("./routes/news");

app.use("/", newsRoutes);

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
