/*
  Warnings:

  - You are about to drop the `comments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `Comments_postid_fkey`;

-- AlterTable
ALTER TABLE `post` MODIFY `content` VARCHAR(2000) NOT NULL;

-- DropTable
DROP TABLE `comments`;
