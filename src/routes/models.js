const express = require("express");
const {
  validateGetAllModels,
  validateGetModelById,
  validateAddModel,
  validateUpdateModel,
  validateDeleteModelById
} = require("../middlewares/models");

const {
  getAllModels,
  getModelById,
  addNewModel,
  updateModel,
  deleteModelById
} = require("../controllers/models");

const router = express.Router();

router.get("/", validateGetAllModels, getAllModels);
router.get("/:id", validateGetModelById, getModelById);
router.post("/", validateAddModel, addNewModel);
router.put("/:id", validateUpdateModel, updateModel);
router.delete("/:id", validateDeleteModelById, deleteModelById);

module.exports = router;