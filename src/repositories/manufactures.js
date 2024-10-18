const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.getManufactures = async (name, country) => {
    // Define query here
    let query = {};

    // It will generate the query
    let orQuery = [];
    if (name) {
        orQuery.push({
            name: { contains: name, mode: "insensitive" },
        });
    }
    if (country) {
        orQuery.push({
            country: { contains: country, mode: "insensitive" },
        });
    }
    if (orQuery.length > 0) {
        query.where = {
            ...query.where,
            OR: orQuery,
        };
    }

    // Find by query
    const searchedManufactures = await prisma.manufactures.findMany(query);

    // Convert BigInt fields to string for safe serialization
    const serializedManufactures = JSONBigInt.stringify(searchedManufactures);
    return JSONBigInt.parse(serializedManufactures);
};

exports.getManufactureById = async (id) => {
    // find manufacture by id
    const manufacture = await prisma.manufactures.findFirst({
        where: { id }
    });

    // Convert BigInt fields to string for safe serialization
    const serializedManufactures = JSONBigInt.stringify(manufacture);
    return JSONBigInt.parse(serializedManufactures);
};

exports.createManufacture = async (data) => {
    const newManufacture = await prisma.manufactures.create({
        data
    });

    // Convert BigInt fields to string for safe serialization
    const serializedManufactures = JSONBigInt.stringify(newManufacture);
    return JSONBigInt.parse(serializedManufactures);
};

exports.updateManufacture = async (id, data) => {
    const updatedManufacture = await prisma.manufactures.update({
        where: { id },
        data
    });

    // Convert BigInt fields to string for safe serialization
    const serializedManufactures = JSONBigInt.stringify(updatedManufacture);
    return JSONBigInt.parse(serializedManufactures);
};

exports.deleteManufactureById = async (id) => {
    const deletedManufacture = await prisma.manufactures.delete({
        where: { id }
    });

    // Convert BigInt fields to string for safe serialization
    const serializedManufactures = JSONBigInt.stringify(deletedManufacture);
    return JSONBigInt.parse(serializedManufactures);
};
