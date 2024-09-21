CREATE DATABASE linktic_ecommerce;

USE linktic_ecommerce;

CREATE TABLE `linktic_ecommerce.status` (
  `id` BIGINT unsigned NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` VARCHAR(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO linktic_ecommerce.status (id, name, description) VALUES(1, 'active', 'active');
INSERT INTO linktic_ecommerce.status (id, name, description) VALUES(2, 'inactive', 'inactive');
INSERT INTO linktic_ecommerce.status (id, name, description) VALUES(3, 'delete', 'delete');

CREATE TABLE `linktic_ecommerce.roles` (
  `id` BIGINT unsigned NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` VARCHAR(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO linktic_ecommerce.roles (id, name, description) VALUES(1, 'admin', 'administrator');
INSERT INTO linktic_ecommerce.roles (id, name, description) VALUES(2, 'developer', 'developer');
INSERT INTO linktic_ecommerce.roles (id, name, description) VALUES(3, 'user', 'user of the app');

CREATE TABLE `linktic_ecommerce.users` (
  `id` BIGINT unsigned NOT NULL AUTO_INCREMENT,
  `identification_type` VARCHAR(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `identification_number` VARCHAR(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` VARCHAR(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` VARCHAR(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` VARCHAR(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` VARCHAR(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile_image_url` VARCHAR(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_area_code` VARCHAR(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_number` VARCHAR(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status_id` BIGINT unsigned NOT NULL,
  `roles_id` BIGINT unsigned NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_phone_number_unique` (`phone_number`),
  UNIQUE KEY `users_identification_number_unique` (`identification_number`),
  KEY `users_status_id_foreign` (`status_id`),
  KEY `users_roles_id_foreign` (`roles_id`),
  CONSTRAINT `users_roles_id_foreign` FOREIGN KEY (`roles_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `users_status_id_foreign` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `linktic_ecommerce.products_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO linktic_ecommerce.products_categories (id, name, description) VALUES(1, 'Carne', 'Carne');
INSERT INTO linktic_ecommerce.products_categories (id, name, description) VALUES(2, 'Lacteos', 'Lacteos');
INSERT INTO linktic_ecommerce.products_categories (id, name, description) VALUES(3, 'Frutas', 'Frutas');


CREATE TABLE `linktic_ecommerce.products_statuses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` VARCHAR(65) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO linktic_ecommerce.products_statuses (id, name, description) VALUES(1, 'active', 'active');
INSERT INTO linktic_ecommerce.products_statuses (id, name, description) VALUES(2, 'inactive', 'inactive');
INSERT INTO linktic_ecommerce.products_statuses (id, name, description) VALUES(3, 'delete', 'delete');


CREATE TABLE `linktic_ecommerce.products_units_measurement` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO linktic_ecommerce.products_units_measurement (id, name, description) VALUES(1, 'Unidad', 'Unidad');
INSERT INTO linktic_ecommerce.products_units_measurement (id, name, description) VALUES(2, 'Libra', 'Libra');

CREATE TABLE `linktic_ecommerce.products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `upc_code` VARCHAR(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` VARCHAR(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` VARCHAR(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int NOT NULL,
  `image` VARCHAR(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `products_categories_id` int NOT NULL,
  `products_units_measurement_id` int NOT NULL,
  `products_statuses_id` int NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `p_products_categories_fk` (`products_categories_id`),
  KEY `p_products_units_measurement_id_fk` (`products_units_measurement_id`),
  KEY `p_products_statuses_id_fk` (`products_statuses_id`),
  CONSTRAINT `p_products_categories_fk` FOREIGN KEY (`products_categories_id`) REFERENCES `products_categories` (`id`),
  CONSTRAINT `p_products_statuses_id_fk` FOREIGN KEY (`products_statuses_id`) REFERENCES `products_statuses` (`id`),
  CONSTRAINT `p_products_units_measurement_id_fk` FOREIGN KEY (`products_units_measurement_id`) REFERENCES `products_units_measurement` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `linktic_ecommerce.orders_statuses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` VARCHAR(65) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO linktic_ecommerce.orders_statuses (id, name, description) VALUES(1, 'active', 'active');
INSERT INTO linktic_ecommerce.orders_statuses (id, name, description) VALUES(2, 'inactive', 'inactive');
INSERT INTO linktic_ecommerce.orders_statuses (id, name, description) VALUES(3, 'delete', 'delete');

CREATE TABLE `linktic_ecommerce.delivery_types` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(25) NOT NULL,
  `description` VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO linktic_ecommerce.deliveries_types (id, name, description) VALUES(1, 'En tienda', 'En tienda');
INSERT INTO linktic_ecommerce.deliveries_types (id, name, description) VALUES(2, 'Domicilio', 'Domicilio');

CREATE TABLE `linktic_ecommerce.orders` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `note` VARCHAR(255) NULL,
  `price` decimal(10,2) NOT NULL,
  `address` VARCHAR(255) NULL,
  `orders_statuses_id` int NOT NULL,
  `delivery_types_id` int NOT NULL,
  `users_id`  BIGINT UNSIGNED,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `o_orders_statuses_id_fk` FOREIGN KEY (`orders_statuses_id`) REFERENCES `orders_statuses` (`id`),
  CONSTRAINT `o_delivery_types_id_fk` FOREIGN KEY (`delivery_types_id`) REFERENCES `delivery_types` (`id`),
  CONSTRAINT `o_users_id_fk` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `linktic_ecommerce.products_orders` (
	`id` INT(10) PRIMARY KEY AUTO_INCREMENT,
	`quantity` INT(3) NOT NULL,
	`products_id` INT(10) NOT NULL,
	`orders_id` INT(10) NOT NULL,
	CONSTRAINT `po_products_id_fk` FOREIGN KEY (`prodcuts_id`) REFERENCES `products` (`id`),
	CONSTRAINT `po_orders_id_fk` FOREIGN KEY (`orders_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `linktic_ecommerce.error_codes` (
  `code` VARCHAR(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status_code` smallint NOT NULL,
  `controller` VARCHAR(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` VARCHAR(65) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cause` VARCHAR(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `code_app` VARCHAR(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;