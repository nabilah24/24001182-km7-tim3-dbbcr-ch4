const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.getTransmissions = async (name, driveType, description) => {
    // Define query here
    let query = {};

    // It will generate the query
    let orQuery = [];
    if (name) {
        orQuery.push({
            name: { contains: name, mode: "insensitive" },
        });
    }
    if (driveType) {
        orQuery.push({
            driveType: { contains: driveType, mode: "insensitive" },
        });
    }
    if (description) {
        orQuery.push({
            description: { contains: driveType, mode: "insensitive" },
        });
    }
    if (orQuery.length > 0) {
        query.where = {
            ...query.where,
            OR: orQuery,
        };
    }

    // Find by query
    const searchedTransmissions = await prisma.transmissions.findMany(query);

    // Convert BigInt fields to string for safe serialization
    const serializedTransmissions = JSONBigInt.stringify(searchedTransmissions);
    return JSONBigInt.parse(serializedTransmissions);
};

exports.getTransmissionById = async (id) => {
    // find transmission by id
    const transmission = await prisma.transmissions.findFirst({
        where: { id }
    });

    // Convert BigInt fields to string for safe serialization
    const serializedTransmissions = JSONBigInt.stringify(transmission);
    return JSONBigInt.parse(serializedTransmissions);
};

exports.createTransmission = async (data) => {
    const newTransmission = await prisma.transmissions.create({
        data
    });

    // Convert BigInt fields to string for safe serialization
    const serializedTransmissions = JSONBigInt.stringify(newTransmission);
    return JSONBigInt.parse(serializedTransmissions);
};

exports.updateTransmission = async (id, data) => {
    const updatedTransmission = await prisma.transmissions.update({
        where: { id },
        data
    });

    // Convert BigInt fields to string for safe serialization
    const serializedTransmissions = JSONBigInt.stringify(updatedTransmission);
    return JSONBigInt.parse(serializedTransmissions);
};

exports.deleteTransmissionById = async (id) => {
    const deletedTransmission = await prisma.transmissions.delete({
        where: { id }
    });

    // Convert BigInt fields to string for safe serialization
    const serializedTransmissions = JSONBigInt.stringify(deletedTransmission);
    return JSONBigInt.parse(serializedTransmissions);
};
