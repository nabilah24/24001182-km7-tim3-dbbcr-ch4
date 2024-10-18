const JSONBigInt = require("json-bigint");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Dapatkan semua data cars
const getAllCars = async (plate, available, availableAt) => {
  let query = {
    include: { models: true, types: true }
  };

  let arrQuery = [];

  if (plate) {
    arrQuery.push({ 
      plate: { contains: plate, mode: "insensitive" }
    });
  };

  if (available) {
    arrQuery.push({ available: available === "true" })
  };

  if (availableAt) {
    arrQuery.push({
      availableAt: { gte: new Date(availableAt) }
    })
  }

  if (arrQuery.length > 0)  {
    query.where = {
      ...query.where,
      OR: arrQuery
    }
  };

  const searchedCars = await prisma.cars.findMany(query);

  // Konversi field BigInt ke string supaya serialization-nya aman
  const serializedCars = JSONBigInt.stringify(searchedCars);
  return JSONBigInt.parse(serializedCars);
};

// Dapatkan data car dari id
const getCarById = async (id) => {
  const car = await prisma.cars.findFirst({
    where: {
      id: id
    }
  });

  // Konversi field BigInt ke string supaya serialization-nya aman
  const serializedCar = JSONBigInt.stringify(car);
  return JSONBigInt.parse(serializedCar);
};

const addNewCar = async (data) => {
  const newCar = await prisma.cars.create({
    data
  });

  // Konversi field BigInt ke string supaya serialization-nya aman
  const serializedNewCar = JSONBigInt.stringify(newCar);
  return JSONBigInt.parse(serializedNewCar);
};

const updateCar = async (id, data) => {
  const updatedCar = await prisma.cars.update({
    where: { id },
    include: {
        models: true,
        types: true
    },
    data
  });

  // Konversi field BigInt ke string supaya serialization-nya aman
  const serializedCar = JSONBigInt.stringify(updatedCar);
  return JSONBigInt.parse(serializedCar);
};

const deleteCarById = async (id) => {
  const deletedCar = await prisma.cars.delete({
    where: { id },
    include: {
      models: true,
      types: true
    }
  });

  // Konversi field BigInt ke string supaya serialization-nya aman
  const serializedCar = JSONBigInt.stringify(deletedCar);
  return JSONBigInt.parse(serializedCar);
};

module.exports = {
  getAllCars,
  getCarById,
  addNewCar,
  updateCar,
  deleteCarById
}