export interface IPessoaDTO {
  idpessoa: number;
  cpf?: string;
  nomepessoa?: string;
  datapagamentoinscricao?: string;
  tipopessoa?: string;
  idempresa?: number;
  idresponsavel?: number;
}

export interface ICreatePessoaDTO {
  cpf?: string;
  nomepessoa?: string;
  datapagamentoinscricao?: string;
  tipopessoa?: string;
  idempresa?: number;
  idresponsavel?: number;
}

export interface ICreateEmpresaDTO {
  cnpj?: string;
  nomeempresa?: string;
}
