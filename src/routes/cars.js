const express = require("express");
const {
  validateGetAllCars,
  validateGetCarById,
  validateAddCar,
  validateUpdateCar,
  validateDeleteCarById
} = require("../middlewares/cars");

const {
  getAllCars,
  getCarById,
  addNewCar,
  updateCar,
  deleteCarById
} = require("../controllers/cars");

const router = express.Router();

router.get("/", validateGetAllCars, getAllCars);
router.get("/:id", validateGetCarById, getCarById);
router.post("/", validateAddCar, addNewCar);
router.put("/:id", validateUpdateCar, updateCar);
router.delete("/:id", validateDeleteCarById, deleteCarById);

module.exports = router;