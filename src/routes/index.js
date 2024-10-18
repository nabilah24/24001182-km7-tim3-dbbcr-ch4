const express = require("express");
// const carsRouter = require("./cars");
const typesRouter = require("./types");

const router = express.Router();

// router.use("/cars", carsRouter);
router.get('/', (req, res) => {
  res.send({
    message: "Ping Succesfully!",
  });
});

module.exports = router;