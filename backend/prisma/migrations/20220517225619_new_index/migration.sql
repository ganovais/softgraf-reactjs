-- DropIndex
DROP INDEX `follows_follower_id_following_id_idx` ON `follows`;

-- DropIndex
DROP INDEX `likes_publication_id_user_id_idx` ON `likes`;

-- CreateIndex
CREATE INDEX `follows_follower_id_idx` ON `follows`(`follower_id`);

-- CreateIndex
CREATE INDEX `likes_publication_id_idx` ON `likes`(`publication_id`);

-- RenameIndex
ALTER TABLE `follows` RENAME INDEX `follows_following_id_fkey` TO `follows_following_id_idx`;

-- RenameIndex
ALTER TABLE `likes` RENAME INDEX `likes_user_id_fkey` TO `likes_user_id_idx`;
