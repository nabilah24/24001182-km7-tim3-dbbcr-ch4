const express = require("express");
const {
  validateGetCarTypes,
  validateGetCarTypeById,
  validateCreateCarType,
  validateUpdateCarType,
  validateDeleteCarTypeById,
} = require("../middlewares/types");
const {
  getCarTypes,
  getCarTypeById,
  createCarType,
  updateCarType,
  deleteCarTypeById,
} = require("../controllers/types");

const router = express.Router();

// It will be run the URL based on path and the method
router
  .route("/")
  .get(validateGetCarTypes, getCarTypes)
  .post(validateCreateCarType, createCarType);

router
  .route("/:id")
  .get(validateGetCarTypeById, getCarTypeById)
  .put(validateUpdateCarType, updateCarType)
  .delete(validateDeleteCarTypeById, deleteCarTypeById);

module.exports = router;
