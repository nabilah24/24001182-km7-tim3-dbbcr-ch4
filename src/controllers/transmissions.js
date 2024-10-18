const transmissionService = require("../services/transmissions");
const { successResponse } = require("../utils/response");

exports.getTransmissions = async (req, res, next) => {
    // Call the usecase or service
    const data = await transmissionService.getTransmissions(
        req.query?.name,
        req.query?.driveType,
        req.query?.description
    );
    successResponse(res, data);
};

exports.getTransmissionById = async (req, res, next) => {
    // Get the id from params
    const { id } = req.params;

    // Get student by id
    const data = await transmissionService.getTransmissionById(id);
    successResponse(res, data);
};

exports.createTransmission = async (req, res, next) => {
    // Create the new student
    const data = await transmissionService.createTransmission(req.body);
    successResponse(res, data);
};

exports.updateTransmission = async (req, res, next) => {
    // Get the id from params
    const { id } = req.params;
    const data = await transmissionService.updateTransmission(id, req.body);
    successResponse(res, data);
};

exports.deleteTransmissionById = async (req, res, next) => {
    // Get the id from params
    const { id } = req.params;
    const data = await transmissionService.deleteTransmissionById(id);
    successResponse(res, data);
};
