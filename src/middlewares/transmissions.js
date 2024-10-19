const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetTransmissions = (req, res, next) => {
    // Validate the query
    const validateQuery = z.object({
        name: z.string().optional().nullable(),
        driveType: z.string().optional().nullable(),
        description: z.string().optional().nullable(),
    });

    const resultValidateQuery = validateQuery.safeParse(req.query);
    if (!resultValidateQuery.success) {
        // If validation fails, return error messages
        throw new BadRequestError(resultValidateQuery.error.errors);
    }

    next();
};

exports.validateGetTransmissionById = (req, res, next) => {
    // Make a validation schema
    const validateParams = z.object({
        id: z.string(),
    });

    const result = validateParams.safeParse(req.params);
    if (!result.success) {
        // If validation fails, return error messages
        throw new BadRequestError(result.error.errors);
    }

    next();
};

exports.validateCreateTransmission = (req, res, next) => {
    // Validation body schema
    const validateBody = z.object({
        name: z.string(),
        driveType: z.string(),
        description: z.string(),
    });

    // Validate
    const result = validateBody.safeParse(req.body);
    if (!result.success) {
        // If validation fails, return error messages
        throw new BadRequestError(result.error.errors);
    }

    next();
};

exports.validateUpdateTransmission = (req, res, next) => {
    // zod validation
    const validateParams = z.object({
        id: z.string(),
    });

    const resultValidateParams = validateParams.safeParse(req.params);
    if (!resultValidateParams.success) {
        // If validation fails, return error messages
        throw new BadRequestError(resultValidateParams.error.errors);
    }

    // Validation body schema
    const validateBody = z.object({
        name: z.string(),
        driveType: z.string(),
        description: z.string(),
    });

    // Validate
    const result = validateBody.safeParse(req.body);
    if (!result.success) {
        // If validation fails, return error messages
        throw new BadRequestError(result.error.errors);
    }

    next();
};

exports.validateDeleteTransmissionById = (req, res, next) => {
    // Make a validation schema
    const validateParams = z.object({
        id: z.string(),
    });

    const result = validateParams.safeParse(req.params);
    if (!result.success) {
        // If validation fails, return error messages
        throw new BadRequestError(result.error.errors);
    }

    next();
};
