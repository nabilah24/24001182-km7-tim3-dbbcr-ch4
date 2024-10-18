const express = require("express");
const {
  validateGetTransmissions,
  validateGetTransmissionById,
  validateDeleteTransmissionById,
  validateCreateTransmission,
  validateUpdateTransmission,
} = require("../middlewares/transmissions");
const {
  getTransmissions,
  getTransmissionById,
  deleteTransmissionById,
  createTransmission,
  updateTransmission,
} = require("../controllers/transmissions");

const router = express.Router();

// It will be run the URL based on path and the method
router
  .route("/")
  .get(validateGetTransmissions, getTransmissions)
  .post(validateCreateTransmission, createTransmission);

router 
  .route("/:id")
  .get(validateGetTransmissionById, getTransmissionById)
  .put(validateUpdateTransmission, updateTransmission)
  .delete(validateDeleteTransmissionById, deleteTransmissionById);

module.exports = router;
