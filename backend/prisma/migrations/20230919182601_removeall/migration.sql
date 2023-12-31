/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CompanyToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_productId_fkey";

-- DropForeignKey
ALTER TABLE "_CompanyToProduct" DROP CONSTRAINT "_CompanyToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_CompanyToProduct" DROP CONSTRAINT "_CompanyToProduct_B_fkey";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Company";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "_CompanyToProduct";

-- DropEnum
DROP TYPE "UserRole";
