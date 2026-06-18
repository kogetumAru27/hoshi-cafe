-- CreateEnum
CREATE TYPE "SeasonType" AS ENUM ('SPRING', 'SUMMER', 'AUTUMN', 'WINTER');

-- CreateTable
CREATE TABLE "Constellation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "season" "SeasonType" NOT NULL,
    "magnitude" DOUBLE PRECISION NOT NULL,
    "shape" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Constellation_pkey" PRIMARY KEY ("id")
);
