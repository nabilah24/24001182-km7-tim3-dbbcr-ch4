const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.getCarTypes = async (name, capacity) => {
  // Define query here
  let query = {
    include: {
      cars: true,
    },
  };

  // It will generate the query
  let orQuery = [];
  if (name) {
    orQuery.push({
      name: { contains: name, mode: "insensitive" }, 
    });
  }
  if (capacity) {
    orQuery.push({
      capacity: { equals: capacity }, 
    });
  }
  if (orQuery.length > 0) {
    query.where = {
      ...query.where,
      OR: orQuery,
    };
  }

  // Find by query
  const searchedCarTypes = await prisma.types.findMany(query);

  // Convert BigInt fields to string for safe serialization
  const serializedCarTypes = JSONBigInt.stringify(searchedCarTypes);
  return JSONBigInt.parse(serializedCarTypes);
};

exports.getCarTypeById = async (id) => {
  // find car type by id
  const carType = await prisma.types.findFirst({
    where: {
      id: BigInt(id),
    },
    include: {
      cars: true,
    },
  });

  // Convert BigInt fields to string for safe seralization
  const serializedCarTypes = JSONBigInt.stringify(carType);
  return JSONBigInt.parse(serializedCarTypes);
};

exports.createCarType = async (data) => {
  const newCarType = await prisma.types.create({
    data,
    include: {
      cars: true,
    },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedCarTypes = JSONBigInt.stringify(newCarType);
  return JSONBigInt.parse(serializedCarTypes);
};

exports.updateCarType = async (id, data) => {
  const updatedCarType = await prisma.types.update({
    where: { id },
    include: {
      cars: true,
    },
    data,
  });

  // Convert BigInt fields to string for safe serialization
  const serializedCarTypes = JSONBigInt.stringify(updatedCarType);
  return JSONBigInt.parse(serializedCarTypes);
};

exports.deleteCarTypeById = async (id) => {
  const deletedCarType = await prisma.types.delete({
    where: { id },
    include: {
      cars: true,
    },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedCarTypes = JSONBigInt.stringify(deletedCarType);
  return JSONBigInt.parse(serializedCarTypes);
};
