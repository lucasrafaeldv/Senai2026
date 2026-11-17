def calcular_desconto(preco, percentual):
    valor_desconto = preco * (percentual / 100)
    preco_final = preco - valor_desconto
    return preco_final

preco_original = float(input("Digite o preço do produto (R$): "))
desconto_percentual = float(input("Digite o percentual de desconto (%): "))

preco_final_calculado = calcular_desconto(preco_original, desconto_percentual)
valor_economizado = preco_original - preco_final_calculado

print("\n--- Resumo do Desconto ---")
print(f"Preço original: R$ {preco_original:.2f}")
print(f"Desconto aplicado: R$ {valor_economizado:.2f} ({desconto_percentual}%)")
print(f"Preço final: R$ {preco_final_calculado:.2f}")