USE vendas_informatica;

SELECT * FROM cliente;

SELECT * FROM produto;

SELECT * FROM vendas;

--Pesquisa com filtro

SELECT nome_cliente,cidade,estado
FROM cliente;   

SELECT nome_produto,categoria,marca,estoque
FROM produto;

--Função Where(ONDE)
SELECT nome_cliente, cidade, estado 
FROM cliente WHERE estado ='MG';

--Funçâo OR (OU)
SELECT * FROM cliente
WHERE estado = 'MG' OR estado = 'RS';

 SELECT * FROM produto
 WHERE marca IN("acer", 'lenovo', 'dell');

 SELECT * FROM venda
 WHERE forma_pagamento IN ("PIX", "Boleto");

-------------------//-----------------------------
USE vendas_informatica;
SELECT * FROM venda
WHERE forma_pagamento IN ("PIX", "Boleto") AND quantidade > 2
ORDER BY marca asc;

-- ASC (De A ao Z)
--DESC (De Z ao A)

----------------//-----------------------------------

-- ON ( compara ) --
-- INNER JOIN ( Junta )


USE vendas_informatica;

SELECT cliente.nome_cliente, venda.forma_pagamento
FROM cliente
INNER JOIN venda
ON venda.id_cliente = cliente.id_cliente;


SELECT produto.nome_produto, venda.preco_unitario_venda
FROM produto
INNER JOIN venda
ON venda.id_produto = produto.id_produto;
