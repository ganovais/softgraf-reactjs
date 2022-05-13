/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `publications` table. All the data in the column will be lost.
  - You are about to drop the column `teste` on the `publications` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `publications` DROP COLUMN `deleted_at`,
    DROP COLUMN `teste`,
    ADD COLUMN `image` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `avatar` VARCHAR(191) NULL,
    `username` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
