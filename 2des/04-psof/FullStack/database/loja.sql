
CREATE DATABASE IF NOT EXISTS loja
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE loja;


CREATE TABLE IF NOT EXISTS produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP);


INSERT INTO produtos (nome, descricao, preco) VALUES
('teclado','Teclado usb',89.90),
('mouse','Mouse optico',49.90),
('monitor','Monitor 24 polegadas',799.90);