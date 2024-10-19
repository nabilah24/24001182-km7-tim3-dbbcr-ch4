const express = require("express");
const {
  validateGetAllCars,
  validateGetCarById,
  validateDeleteCarById,
  validateAddCar,
  validateUpdateCar,
} = require("../middlewares/cars");
const {
  getAllCars,
  getCarById,
  deleteCarById,
  addNewCar,
  updateCar,
} = require("../controllers/cars");

const router = express.Router();

// It will be run the URL based on path and the method
router
  .route("/")
  .get(validateGetAllCars, getAllCars)
  .post(validateAddCar, addNewCar);

router 
  .route("/:id")
  .get(validateGetCarById, getCarById)
  .put(validateUpdateCar, updateCar)
  .delete(validateDeleteCarById, deleteCarById);

module.exports = router;