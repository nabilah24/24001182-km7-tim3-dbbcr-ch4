const carRepository = require("../repositories/cars");
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");

const getAllCars = async (plate, available, availableAt) => {
  return await carRepository.getAllCars(plate, available, availableAt);
};

const getCarById = async (id) => {
  const existingCar = await carRepository.getCarById(id);
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

  return await carRepository.addNewCar(data);
};

const updateCar = async (id, data, file) => {
  const existingCar = await carRepository.getCarById(id)
  if (!existingCar) {
    throw new NotFoundError("Car Data Not Found!");
  };

  // tetapkan data car yang sudah ada dengan data car yang baru
  data = {
    ...existingCar, // existing car data
    ...data, // updated car data
  };
  
  if (file?.image) {
    const uploadedImage = file.image;
    data.image = await imageUpload(uploadedImage);
  }
  /*
  if (file && file.image) {
    const uploadedImage = file.image;
    data.image = await imageUpload(uploadedImage);
  };
  */
  const updatedCar = await carRepository.updateCar(id, data);
  if (!updatedCar) {
    throw new InternalServerError(["Failed to update car"]);
  };

  return updatedCar;
};

const deleteCarById = async (id) => {
  const existingCar = await carRepository.getCarById(id)
  if (!existingCar) {
    throw new NotFoundError("Car Data Not Found!");
  };

  const deletedCar = await carRepository.deleteCarById(id);
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