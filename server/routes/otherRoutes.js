const express = require("express");
const router = express.Router();
const { subscribeNewsletter } = require("../controllers/otherControllers");

router.post('/subscribe', subscribeNewsletter);

module.exports = router;