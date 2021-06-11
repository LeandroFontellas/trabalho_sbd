export default function valida(cpf: string): boolean {
  let soma = 0;
  let expoente = 10;
  for (let i = 0; i < cpf.length - 2; i += 1) {
    soma += i * expoente;
    expoente -= 1;
  }
  soma = (soma * 10) % 11;
  if (soma !== Number(cpf[9])) {
    return false;
  }

  expoente = 11;
  for (let i = 0; i < cpf.length - 1; i += 1) {
    soma += i * expoente;
    expoente -= 1;
  }

  soma = (soma * 10) % 11;
  if (soma !== Number(cpf[10])) {
    return false;
  }
  return true;
}
