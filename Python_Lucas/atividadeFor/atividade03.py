soma = 0

print("Por favor, digite 5 números inteiros:")

for i in range(1, 6):
    numero = int(input(f"Digite o {i} número: "))
    soma += numero
print(f"\nA soma de todos os números digitados é: {soma}")
