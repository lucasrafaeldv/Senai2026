--- Atividade 1 ---
INSERT INTO cliente(nome_cliente, email, cidade, estado, data_cadastro)
VALUES ("Ruberto Sesiano", "ruber.sesi@gmail.com", "jaguariuna", "Sao Paulo", "vigente");

--- Atividade 2 ---
INSERT INTO produto(nome_produto, categoria, marca, preco_unitario, estoque, ativo, data_cadastro)
VALUES ("MousePad 5POL","Acessórios","Lumix",59.98, 35, "Ativo", "28/10/2026");

--- Atividade 3 ---
INSERT INTO venda(id_produto, id_cliente, data_venda, quantidade, desconto_percentual, forma de pagamento, status_venda)
VALUES (21,101, 21/10/2026, 10, 1.33, "PIX", "Concluida");