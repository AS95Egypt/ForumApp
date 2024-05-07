const express = require("express");
const StatisticsServices = require("../services/statistics.services");

const router = express.Router();

// get all posts
router.get("/statistics/", StatisticsServices.getStatisticsData);

module.exports = router;
