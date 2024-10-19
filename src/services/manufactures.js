const manufactureRepository = require("../repositories/manufactures");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getManufactures = async (name, country) => {
    return manufactureRepository.getManufactures(name, country);
};

exports.getManufactureById = async (id) => {
    const manufacture = await manufactureRepository.getManufactureById(id);
    if (!manufacture) {
        throw new NotFoundError("Manufacture is Not Found!");
    }

    return manufacture;
};

exports.createManufacture = async (data) => {
    // Create the data
    return manufactureRepository.createManufacture(data);
};

exports.updateManufacture = async (id, data) => {
    // Find manufacture to check if it exists
    const existingManufacture = await manufactureRepository.getManufactureById(id);
    if (!existingManufacture) {
        throw new NotFoundError("Manufacture is not found!");
    }

    // Merge existing data with the new data
    data = {
        ...existingManufacture, // existing Manufacture data
        ...data,
    };

    // If the manufacture exists, update it
    const updatedManufacture = await manufactureRepository.updateManufacture(id, data);
    if (!updatedManufacture) {
        throw new InternalServerError("Failed to update manufacture!");
    }

    return updatedManufacture;
};


exports.deleteManufactureById = async (id) => {
    // find manufacture is exist or not (validate the data)
    const existingManufacture = await manufactureRepository.getManufactureById(id);
    if (!existingManufacture) {
        throw new NotFoundError("Manufacture is Not Found!");
    }

    // if exist, we will delete the manufacture data
    const deletedManufacture = await manufactureRepository.deleteManufactureById(id);
    if (!deletedManufacture) {
        throw new InternalServerError(["Failed to delete manufacture!"]);
    }

    return deletedManufacture;
};
