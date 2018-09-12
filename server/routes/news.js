"use strict";

const express = require("express");

const newsRoutes = express.Router();

newsRoutes.get("/", (req, res) => res.json({ msg: "/ works" }));

module.exports = newsRoutes;
