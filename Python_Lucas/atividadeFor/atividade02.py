numInt = int(input("Escreva Seu Numero, Para a tabuada: "))

print(f"\nTabuada de multiplicação de {numInt}:")
 
for i in range (1,11):
    resultado = numInt * i
    print(f"{numInt} x {i} = {resultado}")
   