const express = require("express");
const {
  validateGetManufactures,
  validateGetManufactureById,
  validateDeleteManufactureById,
  validateCreateManufacture,
  validateUpdateManufacture,
} = require("../middlewares/manufactures");
const {
  getManufactures,
  getManufactureById,
  deleteManufactureById,
  createManufacture,
  updateManufacture,
} = require("../controllers/manufactures");

const router = express.Router();

// It will be run the URL based on path and the method
router
  .route("/")
  .get(validateGetManufactures, getManufactures)
  .post(validateCreateManufacture, createManufacture);

router 
  .route("/:id")
  .get(validateGetManufactureById, getManufactureById)
  .put(validateUpdateManufacture, updateManufacture)
  .delete(validateDeleteManufactureById, deleteManufactureById);

module.exports = router;
