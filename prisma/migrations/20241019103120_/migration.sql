-- CreateTable
CREATE TABLE "cars" (
    "id" BIGSERIAL NOT NULL,
    "plate" VARCHAR(255),
    "modelId" BIGINT,
    "typeId" BIGINT,
    "description" VARCHAR(255),
    "availableAt" TIMESTAMP(6),
    "available" BOOLEAN,
    "image" VARCHAR(255),
    "options" JSON,
    "specs" JSON,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "models" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255),
    "manufactureId" BIGINT,
    "transmissionId" BIGINT,
    "year" INTEGER,
    "rentPerDay" INTEGER,

    CONSTRAINT "models_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manufactures" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255),
    "country" VARCHAR(255),

    CONSTRAINT "manufactures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transmissions" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255),
    "driveType" VARCHAR(255),
    "description" VARCHAR(255),

    CONSTRAINT "transmissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "types" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255),
    "description" VARCHAR(255),
    "capacity" INTEGER,

    CONSTRAINT "types_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "models"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "models" ADD CONSTRAINT "models_manufactureId_fkey" FOREIGN KEY ("manufactureId") REFERENCES "manufactures"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "models" ADD CONSTRAINT "models_transmissionId_fkey" FOREIGN KEY ("transmissionId") REFERENCES "transmissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
