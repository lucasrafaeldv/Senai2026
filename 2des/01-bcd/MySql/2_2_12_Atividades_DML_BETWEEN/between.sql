-- Atividade 1 --
SELECT * FROM produto
WHERE data_cadastro BETWEEN '2024-03-01 00:00:00' AND '2024-03-31 23:59:59';

-- Atividade 2 --
SELECT nome_produto, marca, estoque, data_cadastro
FROM produto
WHERE data_cadastro BETWEEN '2024-01-01 00:00:00' AND '2024-03-31 23:59:59';

-- Atividade 3 --
SELECT * FROM cliente
WHERE data_cadastro BETWEEN '2023-01-01 00:00:00' AND '2023-01-31 23:59:59';

-- Atividade 4 --
SELECT nome_cliente, email, cidade, estado, data_cadastro
FROM cliente
WHERE data_cadastro BETWEEN '2023-06-01 00:00:00' AND '2023-06-15 23:59:59';

-- Atividade 5 --
SELECT * FROM venda
WHERE data_venda BETWEEN '2025-05-01 00:00:00' AND '2025-05-31 23:59:59';

-- Atividade 6 --
SELECT cliente.nome_cliente, data_venda, preco_unitario_venda, forma_pagamento
FROM cliente
INNER JOIN venda
ON venda.id_cliente = cliente.id_cliente
WHERE data_venda BETWEEN '2025-12-24 00:00:00' AND '2026-01-15 23:59:59'
ORDER BY preco_unitario_venda DESC;

-- Atividade 7 --
SELECT cliente.nome_cliente, cliente.email, produto.nome_produto,
produto.marca, produto.categoria, forma_pagamento, data_venda, status_venda
FROM produto
INNER JOIN venda
ON venda.id_produto = produto.id_produto
INNER JOIN cliente
ON venda.id_cliente = cliente.id_cliente
WHERE (status_venda = "Concluída" OR status_venda = "Cancelada")
AND data_venda BETWEEN '2025-12-01 00:00:00' AND '2025-12-31 23:59:59'
ORDER BY preco_unitario_venda DESC;