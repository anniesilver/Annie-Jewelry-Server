CREATE TABLE `collection`(
    `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `parent_id` SMALLINT UNSIGNED NOT NULL
);
CREATE TABLE `comments`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `commentn` VARCHAR(255) NOT NULL,
    `like` BIGINT NOT NULL,
    `notlike` BIGINT NOT NULL,
    `timestamp` TIMESTAMP NOT NULL,
    `product_id` BIGINT UNSIGNED NOT NULL
);
CREATE TABLE `users`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    `firstname` VARCHAR(255) NULL,
    `lastname` VARCHAR(255) NULL,
    `contact` JSON NULL COMMENT 'address, POSTCODE,PHONE'
);
CREATE TABLE `category`(
    `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `parent_id` SMALLINT UNSIGNED NULL DEFAULT '0'
);
CREATE TABLE `orders`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `order_time` TIMESTAMP NOT NULL,
    `product_list` JSON NULL COMMENT 'product_id, qty, subtotal',
    `total` DECIMAL(8, 2) NOT NULL,
    `shipping_address` JSON NOT NULL,
    `discount` DECIMAL(8, 2) NULL,
    `payment_id` VARCHAR(255) NOT NULL,
    `order_number` VARCHAR(255) NOT NULL
);
CREATE TABLE `products`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NULL,
    `price` DECIMAL(8, 2) NOT NULL,
    `discount_price` DECIMAL(8, 2) NULL,
    `category_id` SMALLINT UNSIGNED NOT NULL,
    `main_img` VARCHAR(255) NOT NULL,
    `sku` VARCHAR(255) NOT NULL,
    `other_img` JSON NULL,
    `bullet_point` JSON NULL,
    `collection_id` SMALLINT UNSIGNED NOT NULL,
    `sold` SMALLINT NOT NULL DEFAULT '0',
    `stock` SMALLINT NOT NULL DEFAULT '0'
);
ALTER TABLE
    `products` ADD CONSTRAINT `products_collection_id_foreign` FOREIGN KEY(`collection_id`) REFERENCES `collection`(`id`);
ALTER TABLE
    `comments` ADD CONSTRAINT `comments_product_id_foreign` FOREIGN KEY(`product_id`) REFERENCES `products`(`id`);
ALTER TABLE
    `comments` ADD CONSTRAINT `comments_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`);
ALTER TABLE
    `products` ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY(`category_id`) REFERENCES `category`(`id`);
ALTER TABLE
    `orders` ADD CONSTRAINT `orders_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`);
ALTER TABLE
    `orders` ADD CONSTRAINT `orders_product_list_foreign` FOREIGN KEY(`product_list`) REFERENCES `products`(`id`);