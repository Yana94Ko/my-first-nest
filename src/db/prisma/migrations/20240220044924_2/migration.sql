/*
  Warnings:

  - You are about to drop the column `deleveryType` on the `Product` table. All the data in the column will be lost.
  - Added the required column `deliveryType` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "deleveryType",
ADD COLUMN     "deliveryType" TEXT NOT NULL;
