const transmissionRepository = require("../repositories/transmissions");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getTransmissions = async (name, nickName) => {
    return transmissionRepository.getTransmissions(name, nickName);
};

exports.getTransmissionById = async (id) => {
    const transmission = await transmissionRepository.getTransmissionById(id);
    if (!transmission) {
        throw new NotFoundError("Transmission is Not Found!");
    }

    return transmission;
};

exports.createTransmission = async (data) => {
    // Create the data
    return transmissionRepository.createTransmission(data);
};

exports.updateTransmission = async (id, data) => {
    // Find transmission to check if it exists
    const existingTransmission = await transmissionRepository.getTransmissionById(id);
    if (!existingTransmission) {
        throw new NotFoundError("Transmission is not found!");
    }

    // Merge existing data with the new data
    data = {
        ...existingTransmission, // existing Transmission data
        ...data,
    };

    // If the transmission exists, update it
    const updatedTransmission = await transmissionRepository.updateTransmission(id, data);
    if (!updatedTransmission) {
        throw new InternalServerError("Failed to update transmission!");
    }

    return updatedTransmission;
};


exports.deleteTransmissionById = async (id) => {
    // find transmission is exist or not (validate the data)
    const existingTransmission = await transmissionRepository.getTransmissionById(id);
    if (!existingTransmission) {
        throw new NotFoundError("Transmission is Not Found!");
    }

    // if exist, we will delete the transmission data
    const deletedTransmission = await transmissionRepository.deleteTransmissionById(id);
    if (!deletedTransmission) {
        throw new InternalServerError(["Failed to delete transmission!"]);
    }

    return deletedTransmission;
};
