const typesRepository = require("../repositories/types");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getCarTypes = async (name, capacity) => {
  return typesRepository.getCarTypes(name, capacity);
};

exports.getCarTypeById = async (id) => {
  const carType = await typesRepository.getCarTypeById(id);
  if (!carType) {
    throw new NotFoundError("Car Type is Not Found!");
  }

  return carType;
};

exports.createCarType = async (data) => {
  // Create the data
  return typesRepository.createCarType(data);
};

exports.updateCarType = async (id, data) => {
  // find student is exist or not (validate the data)
  const existingCarType = typesRepository.getCarTypeById(id);
  if (!existingCarType) {
    throw new NotFoundError("Car Type is Not Found!");
  }

  // replicated existing data with new data
  data = {
    ...existingCarType, // existing Car Type
    ...data,
  };

  // if exist, we will update the student data
  const updatedCarType = typesRepository.updateCarType(id, data);
  if (!updatedCarType) {
    throw new InternalServerError(["Failed to update car type!"]);
  }

  return updatedCarType;
};

exports.deleteCarTypeById = async (id) => {
  // find student is exist or not (validate the data)
  const existingCarType = await typesRepository.getCarTypeById(id);
  if (!existingCarType) {
    throw new NotFoundError("Car Type is Not Found!");
  }

  const deletedCarType = await typesRepository.deleteCarTypeById(id);
  if (!deletedCarType) {
    throw new InternalServerError(["Failed to delete car type!"]);
  }

  return deletedCarType;
};
