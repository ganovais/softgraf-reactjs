/*
  Warnings:

  - Added the required column `user_id` to the `publications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `publications` ADD COLUMN `user_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `follows` (
    `follower_id` INTEGER NOT NULL,
    `following_id` INTEGER NOT NULL,

    INDEX `follows_follower_id_following_id_idx`(`follower_id`, `following_id`),
    PRIMARY KEY (`follower_id`, `following_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `likes` (
    `publication_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `likes_publication_id_user_id_idx`(`publication_id`, `user_id`),
    PRIMARY KEY (`publication_id`, `user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `publications` ADD CONSTRAINT `publications_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `follows` ADD CONSTRAINT `follows_follower_id_fkey` FOREIGN KEY (`follower_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `follows` ADD CONSTRAINT `follows_following_id_fkey` FOREIGN KEY (`following_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `likes` ADD CONSTRAINT `likes_publication_id_fkey` FOREIGN KEY (`publication_id`) REFERENCES `publications`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `likes` ADD CONSTRAINT `likes_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
