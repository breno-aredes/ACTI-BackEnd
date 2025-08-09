export interface CnpjApiResponse {
  nome: string;
  fantasia?: string;
  logradouro: string;
  numero: string;
  municipio: string;
  bairro: string;
  uf: string;
  cep: string;
  email: string;
  telefone: string;
  situacao: string;
  status: string;
  abertura: string;
  tipo: string;
  porte: string;
  natureza_juridica: string;
  atividade_principal: Array<{
    code: string;
    text: string;
  }>;
  atividades_secundarias?: Array<{
    code: string;
    text: string;
  }>;
  qsa: Array<{
    nome: string;
    qual: string;
  }>;
  capital_social: string;
  data_situacao: string;
  cnpj: string;
  ultima_atualizacao: string;
}

export interface CnpjData {
  companyName: string;
  tradeName: string;
  email: string;
  phone: string;
}

export interface CnpjResponse {
  success: boolean;
  data?: CnpjData;
  message?: string;
}
