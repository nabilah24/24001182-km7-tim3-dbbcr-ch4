const carRepository = require("../repositories/cars");
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");

const getAllCars = async (plate, available, availableAt) => {
  return carRepository.getAllCars(plate, available, availableAt);
};

const getCarById = async (id) => {
  const existingCar = carRepository.getCarById(id);
  if (!existingCar) {
    throw new NotFoundError("Car Data Not Found!");
  };

  return existingCar;
};

const addNewCar = async (data, file) => {
  //Upload file
  if (file?.image) {
    const uploadedImage = file.image;
    data.image = await imageUpload(uploadedImage);
  };

  return carRepository.addNewCar(data);
};

const updateCar = async (id, data, file) => {
  const existingCar = carRepository.getCarById(id)
  if (!existingCar) {
    throw new NotFoundError("Car Data Not Found!");
  };

  data = {
    ...existingCar,
    ...data
  };
  
  if (file?.image) {
    const uploadedImage = file.image;
    data.image = await imageUpload(uploadedImage);
  }

  const updatedCar = carRepository.updateCar(id, data, file);
  if (!updatedCar) {
    throw new InternalServerError(["Failed to update car"]);
  };

  return updatedCar;
};

const deleteCarById = async (id) => {
  const numberId = Number(id);

  const existingCar = await carRepository.getCarById(numberId)
  if (!existingCar) {
    throw new NotFoundError("Car Data Not Found!");
  };

  const deletedCar = await carRepository.deleteCarById(numberId);
  if (!deletedCar) {
    throw new InternalServerError(["Failed to update car"]);
  };

  return existingCar;
};

module.exports = {
  getAllCars,
  getCarById,
  addNewCar,
  updateCar,
  deleteCarById
}