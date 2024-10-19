const JSONBigInt = require("json-bigint");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Dapatkan semua data models
const getAllModels = async (name, year, rentPerDay) => {
  let query = {
    include: { 
      manufactures: true,
      transmissions: true 
    }
  };

  let arrQuery = [];
  if (name) {
    arrQuery.push({ 
      name: { contains: name, mode: "insensitive" }
    })
  };

  if (year) {
    arrQuery.push({ 
      year: { gte: year }
    })
  };

  if (rentPerDay) {
    arrQuery.push({
      rentPerDay: { lte: rentPerDay }
    })
  };

  if (arrQuery.length > 0)  {
    query.where = {
      ...query.where,
      OR: arrQuery
    }
  };

  const searchedModels = await prisma.models.findMany(query);

  // Konversi field BigInt ke string supaya serialization-nya aman
  const serializedModels = JSONBigInt.stringify(searchedModels);
  return JSONBigInt.parse(serializedModels);
};

// Dapatkan data model dari id
const getModelById = async (id) => {
  const model = await prisma.models.findFirst({
    where: {
      id: id
    }
  });

  // Konversi field BigInt ke string supaya serialization-nya aman
  const serializedModel = JSONBigInt.stringify(model);
  return JSONBigInt.parse(serializedModel);
};

const addNewModel = async (data) => {
  const newModel = await prisma.models.create({
    data,
    include: {
      manufactures: true,
      transmissions: true
    }
  });

  // Konversi field BigInt ke string supaya serialization-nya aman
  const serializedNewModel = JSONBigInt.stringify(newModel);
  return JSONBigInt.parse(serializedNewModel);
};

const updateModel = async (id, data) => {
  const updatedModel = await prisma.models.update({
    where: { id },
    include: {
      manufactures: true,
      transmissions: true
    },
    data
  });

  // Konversi field BigInt ke string supaya serialization-nya aman
  const serializedModel = JSONBigInt.stringify(updatedModel);
  return JSONBigInt.parse(serializedModel);
};

const deleteModelById = async (id) => {
  const deletedModel = await prisma.models.delete({
    where: { id },
    include: {
      manufactures: true,
      transmissions: true
    }
  });

  // Konversi field BigInt ke string supaya serialization-nya aman
  const serializedModel = JSONBigInt.stringify(deletedModel);
  return JSONBigInt.parse(serializedModel);
};

module.exports = {
  getAllModels,
  getModelById,
  addNewModel,
  updateModel,
  deleteModelById
}