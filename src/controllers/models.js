const modelService = require("../services/models");
const { successResponse } = require("../utils/response");

// Controller untuk dapatkan semua data Models
const getAllModels = async (req, res, next) => {
  // Dapatkan data Models dari empat parameter query dibawah
  const data = await modelService.getAllModels(
    req.query?.name,
    req.query?.year,
    req.query?.rentPerDay,
  );

  successResponse(res, "Successfully Get All Models Data", data);
};

// Controller untuk dapatkan data Model dari id
const getModelById = async (req, res, next) => {
  const { id } = req.params;
  const data = await modelService.getModelById(id);
  successResponse(res, "Successfully Get a Model Data", data);
};

// Controller untuk tambahkan data Model baru dengan req.body
const addNewModel = async (req, res, next) => {
  const data = await modelService.addNewModel(req.body);
  successResponse(res, "Successfully Added a New Model", data);
};

// Controller untuk update data Model dari id dan req.body
const updateModel = async (req, res, next) => {
  const { id } = req.params;

  const data = await modelService.updateModel(id, req.body);
  successResponse(res, "Successfully Updated a Model Data", data);
};

// Controller untuk delete data Model dari id
const deleteModelById = async (req, res, next) => {
  const { id } = req.params;
  const data = await modelService.deleteModelById(id);
  successResponse(res, data);
};

module.exports = {
  getAllModels,
  getModelById,
  addNewModel,
  updateModel,
  deleteModelById
}