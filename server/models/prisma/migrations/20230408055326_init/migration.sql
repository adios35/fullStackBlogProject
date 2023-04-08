/*
  Warnings:

  - Added the required column `writeBy` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` ADD COLUMN `image` VARCHAR(191) NULL,
    ADD COLUMN `writeBy` VARCHAR(191) NOT NULL;
