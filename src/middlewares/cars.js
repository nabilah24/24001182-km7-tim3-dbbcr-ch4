const { z } = require('zod');
const { BadRequestError } = require('../utils/request');

// Validasi untuk mengambil semua data cars
const validateGetAllCars = (req, res, next) => {
  // Zod validation
  const validateQuery = (queries) => {
    const schema = z.object({
      plate: z.string().optional().nullable(),
      available: z.string().optional().nullable(),
    });

    return schema.safeParse(queries);
  };

  const validateQueryResult = validateQuery(req.query);
  if (!validateQueryResult.success) {
    throw new BadRequestError(validateQueryResult.error.errors);
  };

  if (validateQueryResult.data.available) {
    req.query.available = validateQueryResult.data.available == "true" ? true : false;
  };

  next();
};

// Validasi untuk mengambil data car dari id
const validateGetCarById = (req, res, next) => {
  // Zod validation
  const validateId = (id) => {
    const schema = z.object({
      id: z.string()
    });
    return schema.safeParse(id)
  };

  const validateIdResult = validateId(req.params);

  if (!validateIdResult.success) {
    throw new BadRequestError(validateIdResult.error.errors);
  };

  next();
};

// Validasi untuk menambah data car baru
const validateAddCar = (req, res, next) => {
  // Validasi req.body
  const validateCar = (car) => {
    const schema = z.object({
      plate: z.string(),
      modelId: z.string(),
      typeId: z.string(),
      description: z.string(),
      availableAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format"
      }),
      available: z.boolean(),
      options: z.array(z.string()).nonempty(),
      specs: z.array(z.string()).nonempty(),
    });

    return schema.safeParse(car);
  };

  // Parsing data
  if (req.body.available) {
    req.body.available = req.body.available == "true" ? true : false;
  };

  if (req.body.options) {
    req.body.options = Array.isArray(req.body.options) ? req.body.options : [req.body.options];
  };

  if (req.body.specs) {
    req.body.specs = Array.isArray(req.body.specs) ? req.body.specs : [req.body.specs];
  };

  // Validasi data file
  // Upload file tidak diwajibkan
  const validateFileBody = (file) => {
    const schema = z.object({
      image: z.object({
        name: z.string(),
        data: z.any()
      }).optional()
    }).optional();

    return schema.safeParse(file);
  }

  // Dapatkan hasil validasi req.body
  const validateCarResult = validateCar(req.body);
  if (!validateCarResult.success) {
    throw new BadRequestError(validateCarResult.error.errors);
  };

  // Dapatkan hasil validasi req.files
  const resultValidateFiles = validateFileBody(req.files);
  if (!resultValidateFiles.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateFiles.error.errors);
  };

  next();
};

// Validasi untuk merubah data car
const validateUpdateCar = (req, res, next) => {
  // Validasi id
  const validateId = (id) => {
    const schema = z.object({
      id: z.string()
    });
    return schema.safeParse(id)
  };

  // Dapatkan hasil validasi id
  const validateIdResult = validateId(req.params);
  if (!validateIdResult.success) {
    throw new BadRequestError(validateIdResult.error.errors);
  };

  // Validasi req.body
  const validateCar = (car) => {
    const schema = z.object({
      plate: z.string(),
      modelId: z.string(),
      typeId: z.string(),
      description: z.string(),
      availableAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format"
      }),
      available: z.boolean(),
      options: z.array(z.string()).nonempty(),
      specs: z.array(z.string()).nonempty(),
    });

    return schema.safeParse(car);
  };

  // Parsing data
  if (req.body.available) {
    req.body.available = req.body.available == "true" ? true : false;
  };

  if (req.body.options) {
    req.body.options = Array.isArray(req.body.options) ? req.body.options : [req.body.options];
  };

  if (req.body.specs) {
    req.body.specs = Array.isArray(req.body.specs) ? req.body.specs : [req.body.specs];
  };

  // Validasi data file
  // Upload file tidak diwajibkan
  const validateFileBody = (file) => {
    const schema = z.object({
      image: z.object({
        name: z.string(),
        data: z.any()
      }).optional()
    }).optional();

    return schema.safeParse(file);
  }

  // Dapatkan hasil validasi req.body
  const validateCarResult = validateCar(req.body);
  if (!validateCarResult.success) {
    throw new BadRequestError(validateCarResult.error.errors);
  };

  // Dapatkan hasil validasi req.files
  const resultValidateFiles = validateFileBody(req.files);
  if (!resultValidateFiles.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateFiles.error.errors);
  };

  next();
};

// Validasi untuk menghapus data car
const validateDeleteCarById = (req, res, next) => {
  const validateId = (id) => {
    const schema = z.object({
      id: z.string()
    });
    return schema.safeParse(id)
  };

  const validateIdResult = validateId(req.params);
  if (!validateIdResult.success) {
    throw new BadRequestError(validateIdResult.error.errors);
  };

  next();
};

module.exports = {
  validateGetAllCars,
  validateGetCarById,
  validateAddCar,
  validateUpdateCar,
  validateDeleteCarById
}