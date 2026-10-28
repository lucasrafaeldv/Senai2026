--- Atividade 1 --- 
DELETE FROM cliente
WHERE id_cliente = 5;

--- Atividade 2 ---
DELETE FROM cliente
WHERE estado = "SC";

---Atividade 3 ---
DELETE FROM produto
WHERE marca = "LG";

--- Atividade 4 ---
DELETE FROM produto
WHERE id_produto IN = (3,5,10);

--- Atividade 5 ---
DELETE FROM venda
WHERE desconto_percentual = 0;

--- Atividade 6 ---
DELETE FROM venda
WHERE status_venda = "Cancelada";