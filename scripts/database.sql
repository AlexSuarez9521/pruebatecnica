-- ============================================
-- Script de Base de Datos - Prueba Técnica
-- CRUD de Productos
-- ============================================

-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS crud_app
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

-- Usar la base de datos
USE crud_app;

-- Eliminar la tabla si existe (para recrearla limpia)
DROP TABLE IF EXISTS productos;

-- Crear la tabla de productos
CREATE TABLE productos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(1000),
    precio DECIMAL(12, 2) NOT NULL,
    cantidad_stock INT NOT NULL,
    CONSTRAINT chk_precio_positivo CHECK (precio > 0),
    CONSTRAINT chk_stock_no_negativo CHECK (cantidad_stock >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar datos de ejemplo
INSERT INTO productos (nombre, descripcion, precio, cantidad_stock) VALUES
    ('Laptop HP Pavilion', 'Laptop HP Pavilion 15.6", Intel Core i5, 8GB RAM, 256GB SSD', 2500000.00, 10),
    ('Mouse Logitech MX Master', 'Mouse inalámbrico ergonómico con sensor de alta precisión', 350000.00, 25),
    ('Teclado Mecánico Redragon', 'Teclado mecánico RGB con switches blue', 180000.00, 30),
    ('Monitor Samsung 27"', 'Monitor Samsung 27" Full HD, 75Hz, Panel IPS', 850000.00, 15),
    ('Audífonos Sony WH-1000XM4', 'Audífonos inalámbricos con cancelación de ruido activa', 1200000.00, 8),
    ('Webcam Logitech C920', 'Webcam Full HD 1080p con micrófono integrado', 280000.00, 20),
    ('SSD Samsung 1TB', 'Disco de estado sólido Samsung 870 EVO 1TB', 420000.00, 35),
    ('Memoria RAM 16GB', 'Memoria RAM DDR4 16GB 3200MHz Kingston Fury', 220000.00, 40);

-- Mostrar los productos insertados
SELECT * FROM productos;

-- Mostrar el valor total del inventario
SELECT
    SUM(precio * cantidad_stock) AS valor_total_inventario
FROM productos;

-- Mostrar el producto con mayor valor de inventario
SELECT
    nombre,
    precio,
    cantidad_stock,
    (precio * cantidad_stock) AS valor_inventario
FROM productos
ORDER BY valor_inventario DESC
LIMIT 1;
