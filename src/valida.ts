export default function valida(cpf: string): boolean {
  let soma = 0;
  let expoente = 10;
  for (let i = 0; i < cpf.length - 2; i += 1) {
    soma += Number(cpf[i]) * expoente;
    expoente -= 1;
  }
  soma = (soma * 10) % 11;
  if (soma !== Number(cpf[9])) {
    throw new Error('Validação de CPF falhou');
  }
  soma = 0;
  let resto = 0;
  for (let i = 1; i <= 10; i += 1)
    soma += parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11), 10))
    throw new Error('Validação de CPF falhou');
  return true;
}
