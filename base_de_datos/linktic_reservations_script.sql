CREATE DATABASE linktic_reservations;

USE linktic_reservations;

CREATE TABLE `linktic_reservations.status` (
  `id` BIGINT unsigned NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` VARCHAR(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO linktic_reservations.status (id, name, description) VALUES(1, 'active', 'active');
INSERT INTO linktic_reservations.status (id, name, description) VALUES(2, 'inactive', 'inactive');
INSERT INTO linktic_reservations.status (id, name, description) VALUES(3, 'delete', 'delete');

CREATE TABLE `linktic_reservations.roles` (
  `id` BIGINT unsigned NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` VARCHAR(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO linktic_reservations.roles (id, name, description) VALUES(1, 'admin', 'administrator');
INSERT INTO linktic_reservations.roles (id, name, description) VALUES(2, 'developer', 'developer');
INSERT INTO linktic_reservations.roles (id, name, description) VALUES(3, 'user', 'user of the app');

CREATE TABLE `linktic_reservations.users` (
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


-- Crear tabla de Restaurantes
CREATE TABLE restaurants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    ability INT NOT NULL
);

-- Crear tabla de Hoteles
CREATE TABLE hotels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    stars INT CHECK (starts BETWEEN 1 AND 5)
);

CREATE TABLE room_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name INT NOT NULL,
    description VARCHAR(255) NOT NULL,
);

-- Crear tabla de Habitaciones
CREATE TABLE rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    night_price DECIMAL(10, 2) NOT NULL,
    ability INT NOT NULL,
    hotels_id INT NOT NULL,
    room_types_id INT NOT NULL,
    FOREIGN KEY (room_types_id) REFERENCES room_types(id) ON DELETE CASCADE
);

-- Crear tabla de Habitaciones
CREATE TABLE reservations_statuses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name INT,
    description VARCHAR(255) NOT NULL,
);

-- Crear tabla de Reservas
CREATE TABLE reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    time TIME NULL,
    number_people INT NULL,
    duration INT NULL, -- en horas, para hoteles
    reservations_statuses INT NOT NULL,
    users_id INT NOT NULL,
    restaurants_id INT NULL,
    rooms_id INT NULL,
    FOREIGN KEY (users_id) REFERENCES userss(users_id) ON DELETE CASCADE,
    FOREIGN KEY (restaurants_id) REFERENCES restaurants(restaurants_id) ON DELETE SET NULL,
    FOREIGN KEY (rooms_id) REFERENCES rooms(rooms_id) ON DELETE SET NULL
);