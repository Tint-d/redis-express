-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "description" VARCHAR(1000) NOT NULL,
    "image" TEXT DEFAULT '/uploads/example.jpeg',
    "category" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "colors" TEXT[] DEFAULT ARRAY['#222']::TEXT[],
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "freeShipping" BOOLEAN NOT NULL DEFAULT false,
    "inventory" INTEGER NOT NULL DEFAULT 15,
    "averageRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "numOfReviews" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
