const { z } = require("zod");
const { BadRequestError } = require("../utils/request");
// Validasi untuk mengambil semua data cars
const validateGetAllCars = (req, res, next) => {
  // Zod validation
  const validateQuery = (queries) => {
    const schema = z.object({
      plate: z.string().optional().nullable(),
      available: z.boolean().optional().nullable(),
      availableAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format"
      }).optional().nullable()
    });

    return schema.safeParse(queries);
  };

  const validateQueryResult = validateQuery(req.query);
  if (!validateQueryResult.success) {
    throw new BadRequestError(validateQueryResult.error.errors);
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
      availableAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format"
      }),
      available: z.boolean(),
      options: z.array(z.string()).nonempty(),
      specs: z.array(z.string()).nonempty(),
    });

    return schema.safeParse(car);
  };

  // Parsing data query
  if (req.body.available) {
    req.body.available = req.body.available == "true" ? true : false;
  };

  // Validasi data file
  // Upload file tidak diwajibkan
  const validateFileBody = (file) => {
    const schema = z.object({
      image: z.object({
        name: z.string(),
        data: z.any()
      }).optional().nullable()
    }).optional().nullable();

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
  const validateBody = (car) => {
    const schema = z.object({
      plate: z.string(),
      modelId: z.string(),
      typeId: z.string(),
      availableAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format"
      }),
      available: z.boolean(),
      options: z.array(z.string()).nonempty(),
      specs: z.array(z.string()).nonempty(),
    });

    return schema.safeParse(car);
  };

  // Validasi req.files
  // Upload file tidak diwajibkan
  const validateFileBody = (file) => {
    const schema = z.object({
      image: z.object({
        name: z.string(),
        data: z.any()
      }).optional().nullable()
    }).optional().nullable();

    return schema.safeParse(file);
  }

  // Dapatkan hasil validasi req.body
  const validateBodyResult = validateBody(req.body);
  if (!validateBodyResult.success) {
    throw new BadRequestError(validateBodyResult.error.errors);
  };

  // Dapatkan hasil validasi req.files
  const resultValidateFiles = validateFileBody(req.files);
  if (!resultValidateFiles.success) {
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
};