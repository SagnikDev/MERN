const express = require("express");
const router = express.Router();
const { makePayment } = require("../controllers/stripePayment.js");
router.post("/stripepayment", makePayment);

module.exports = router;