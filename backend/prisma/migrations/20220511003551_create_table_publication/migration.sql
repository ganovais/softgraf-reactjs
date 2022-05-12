/*
  Warnings:

  - You are about to drop the column `image` on the `publications` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `publications` DROP COLUMN `image`,
    ADD COLUMN `teste` VARCHAR(191) NULL;
