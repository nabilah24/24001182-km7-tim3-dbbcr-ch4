const express = require("express");
const transmissionsRouter = require("./transmissions")
const manufacturesRouter = require("./manufactures")

const router = express.Router();

router.use("/transmissions", transmissionsRouter);
router.use("/manufactures", manufacturesRouter);
router.get('/', (req, res) => {
  res.send({
    message: "Ping Succesfully!",
  });
});

module.exports = router;