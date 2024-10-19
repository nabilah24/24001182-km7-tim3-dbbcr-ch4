const modelRepository = require("../repositories/models");
const { NotFoundError, InternalServerError } = require("../utils/request");

const getAllModels = async (name, year, rentPerDay) => {
  return modelRepository.getAllModels(name, year, rentPerDay);
};

const getModelById = async (id) => {
  const existingModel = await modelRepository.getModelById(id);
  if (!existingModel) {
    throw new NotFoundError("Model Data Not Found!");
  };

  return existingModel;
};

const addNewModel = async (data) => {
  return modelRepository.addNewModel(data);
};

const updateModel = async (id, data) => {
  const existingModel = modelRepository.getModelById(id)
  if (!existingModel) {
    throw new NotFoundError("Model Data Not Found!");
  };

  data = {
    ...existingModel,
    ...data
  };

  const updatedModel = modelRepository.updateModel(id, data);
  if (!updatedModel) {
    throw new InternalServerError(["Failed to update model"]);
  };

  return updatedModel;
};

const deleteModelById = async (id) => {
  const existingModel = await modelRepository.getModelById(id)
  if (!existingModel) {
    throw new NotFoundError("Model Data Not Found!");
  };

  const deletedModel = await modelRepository.deleteModelById(id);
  if (!deletedModel) {
    throw new InternalServerError(["Failed to update model"]);
  };

  return deletedModel;
};

module.exports = {
  getAllModels,
  getModelById,
  addNewModel,
  updateModel,
  deleteModelById
}