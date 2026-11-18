-- Atividade 1 --
SELECT * FROM produto
WHERE nome_produto LIKE "D%";

-- Atividade 2 --
SELECT nome_produto, marca, estoque
FROM produto
WHERE marca LIKE "%E";

-- Atividade 3 --
SELECT nome_produto, marca, preco_unitario
FROM produto
WHERE nome_produto LIKE "%Gamer%";

-- Atividade 4 --
SELECT * FROM cliente
WHERE nome_cliente LIKE "%Barbosa%";

-- Atividade 5 --
SELECT cliente.nome_cliente, data_venda, preco_unitario_venda, forma_pagamento
FROM cliente
INNER JOIN venda
ON venda.id_cliente = cliente.id_cliente
WHERE cliente.nome_cliente LIKE "C%";

-- Atividade 6 --
SELECT produto.nome_produto, produto.preco_unitario, venda.id_venda, forma_pagamento
FROM produto
INNER JOIN venda
ON venda.id_produto = produto.id_produto
WHERE (forma_pagamento = "PIX" OR forma_pagamento = "Boleto")
AND produto.nome_produto LIKE "%Polegada%";

-- Atividade 7 --
SELECT produto.nome_produto, cliente.nome_cliente, desconto_percentual, forma_pagamento
FROM produto
INNER JOIN venda
ON venda.id_produto = produto.id_produto
INNER JOIN cliente
ON venda.id_cliente = cliente.id_cliente
WHERE produto.nome_produto LIKE "%Placa%"
OR produto.nome_produto LIKE "%Notebook%"
OR cliente.nome_cliente LIKE "%Ana%"
ORDER BY status_venda ASC;