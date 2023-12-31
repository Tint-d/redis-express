/*
  Warnings:

  - The primary key for the `Company` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Company` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `A` on the `_CompanyToProduct` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_CompanyToProduct" DROP CONSTRAINT "_CompanyToProduct_A_fkey";

-- AlterTable
ALTER TABLE "Company" DROP CONSTRAINT "Company_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Company_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_CompanyToProduct" DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "_CompanyToProduct_AB_unique" ON "_CompanyToProduct"("A", "B");

-- AddForeignKey
ALTER TABLE "_CompanyToProduct" ADD CONSTRAINT "_CompanyToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
