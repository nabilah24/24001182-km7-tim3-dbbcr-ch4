const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetCarTypes = (req, res, next) => {
  // Validate the query
  const validateQuery = z.object({
    name: z.string().optional().nullable(),
    capacity: z.string().optional().nullable(),
  });

  const resultValidateQuery = validateQuery.safeParse(req.query);
  if (!resultValidateQuery.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateQuery.error.errors);
  }

  // Convert capacity to number if it's provided
  if (resultValidateQuery.data.capacity) {
    req.query.capacity = Number(resultValidateQuery.data.capacity);
  }

  next();
};

exports.validateGetCarTypeById = (req, res, next) => {
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

exports.validateCreateCarType = (req, res, next) => {
  // Validation body schema
  const valdateBody = z.object({
    name: z.string(),
    description: z.string(),
    capacity: z.string(),
  });

  // Validate
  const result = valdateBody.safeParse(req.body);
  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }

  // Convert capacity to number
  if (result.data.capacity) {
    req.body.capacity = Number(result.data.capacity); // Change to req.body
  }

  next();
};

exports.validateUpdateCarType = (req, res, next) => {
  // zod validation
  const validateParams = z.object({
    id: z.string(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    // if validation fails, return error messages
    throw new BadRequestError(resultValidateParams.error.errors);
  }

  // Validation body schema
  const valdateBody = z.object({
    name: z.string(),
    description: z.string(),
    capacity: z.string(),
  });

  // Validate
  const resultValidateBody = valdateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  // Convert capacity to number
  if (resultValidateBody.data.capacity) {
    req.body.capacity = Number(resultValidateBody.data.capacity); // Change to req.body
  }

  next();
};

exports.validateDeleteCarTypeById = (req, res, next) => {
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
