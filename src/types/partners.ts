export interface Partners {
  Id?: number;
  PartnerType: "Agente Logística" | "Cliente" | "Despachante" | "Fornecedor";
  PersonalityType: "Física" | "Jurídica";
  CompanyName: string;
  TradeName: string;
  CnpjCpf: string;
  Segment: string;
  Category: string;
  ZipCode: string;
  Country?: string;
  State: string;
  City: string;
  Street: string;
  Number: string;
  District: string;
  Email: string;
  Phone: string;
  AddressComplement?: string;
  MobilePhone?: string;
  Notes?: string;
}

export interface CreatePartnersData {
  PartnerType: string;
  PersonalityType: string;
  CompanyName: string;
  TradeName: string;
  CnpjCpf: string;
  Segment: string;
  Category: string;
  ZipCode: string;
  Country?: string;
  State: string;
  City: string;
  Street: string;
  Number: string;
  District: string;
  Email: string;
  Phone: string;
  AddressComplement?: string;
  MobilePhone?: string;
  Notes?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
