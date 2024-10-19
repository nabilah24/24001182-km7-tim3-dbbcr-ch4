const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

// Validasi untuk mengambil semua data models
const validateGetAllModels = (req, res, next) => {
  // Zod validation
  const validateQuery = (queries) => {
    const schema = z.object({
      name: z.string().optional().nullable(),
      year: z.string().optional().nullable(),
      rentPerDay: z.string().optional().nullable()
    });

    return schema.safeParse(queries);
  };

  const validateQueryResult = validateQuery(req.query);
  if (!validateQueryResult.success) {
    throw new BadRequestError(validateQueryResult.error.errors);
  };

  // Logika untuk ubah query year dan rentPerDay ke Number
  if (validateQueryResult.data.year) {
    req.query.year = Number(validateQueryResult.data.year);
  };

  if (validateQueryResult.data.rentPerDay) {
    req.query.rentPerDay = Number(validateQueryResult.data.rentPerDay);
  };

  next();
};

// Validasi untuk mengambil data model dari id
const validateGetModelById = (req, res, next) => {
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

// Validasi untuk menambah data model baru
const validateAddModel = (req, res, next) => {
  // Validasi req.body
  const validateBody = (model) => {
    const schema = z.object({
      name: z.string(),
      manufactureId: z.string(),
      transmissionId: z.string(),
      year: z.number().int().positive(),
      rentPerDay: z.number().int().positive()
    });

    return schema.safeParse(model);
  };

  if (req.body.year) {
    req.body.year = parseInt(req.body.year)
  }
  
  if (req.body.rentPerDay) {
    req.body.rentPerDay = parseInt(req.body.rentPerDay)
  }

  // Dapatkan hasil validasi req.body
  const validateBodyResult = validateBody(req.body);
  if (!validateBodyResult.success) {
    throw new BadRequestError(validateBodyResult.error.errors);
  };

  next();
};

// Validasi untuk merubah data model
const validateUpdateModel = (req, res, next) => {
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
  const validateBody = (model) => {
    const schema = z.object({
      name: z.string(),
      manufactureId: z.string(),
      transmissionId: z.string(),
      year: z.number().int().positive(),
      rentPerDay: z.number().int().positive()
    });

    return schema.safeParse(model);
  };

  if (req.body.year) {
    req.body.year = parseInt(req.body.year)
  }
  
  if (req.body.rentPerDay) {
    req.body.rentPerDay = parseInt(req.body.rentPerDay)
  }

  // Dapatkan hasil validasi req.body
  const validateBodyResult = validateBody(req.body);
  if (!validateBodyResult.success) {
    throw new BadRequestError(validateBodyResult.error.errors);
  };

  next();
};

// Validasi untuk menghapus data model
const validateDeleteModelById = (req, res, next) => {
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
  validateGetAllModels,
  validateGetModelById,
  validateAddModel,
  validateUpdateModel,
  validateDeleteModelById
};