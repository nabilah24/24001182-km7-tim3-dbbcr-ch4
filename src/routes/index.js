const express = require("express");
const modelsRouter = require("./models")

const router = express.Router();

router.use("/models", modelsRouter);

router.get('/', (req, res) => {
  res.send({
    message: "Ping Succesfully!",
  });
});

module.exports = router;