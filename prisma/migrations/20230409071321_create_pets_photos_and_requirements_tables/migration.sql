/*
  Warnings:

  - You are about to drop the column `petsId` on the `photos` table. All the data in the column will be lost.
  - You are about to drop the column `petsId` on the `requirements` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "photos" DROP CONSTRAINT "photos_petsId_fkey";

-- DropForeignKey
ALTER TABLE "requirements" DROP CONSTRAINT "requirements_petsId_fkey";

-- AlterTable
ALTER TABLE "photos" DROP COLUMN "petsId",
ADD COLUMN     "petId" TEXT;

-- AlterTable
ALTER TABLE "requirements" DROP COLUMN "petsId",
ADD COLUMN     "petId" TEXT;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requirements" ADD CONSTRAINT "requirements_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
