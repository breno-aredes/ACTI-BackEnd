import { PartnersRepository } from "../repositories/partnersRepository";
import { CreatePartnersData } from "../types/partners";

export class PartnersService {
  private partnersRepository: PartnersRepository;

  constructor() {
    this.partnersRepository = new PartnersRepository();
  }

  async createPartner(partnerData: CreatePartnersData): Promise<void> {
    try {
      const exists = await this.checkCnpjCpfExists(partnerData.CnpjCpf);
      if (exists) {
        throw new Error("CNPJ/CPF already exists");
      }

      await this.partnersRepository.create(partnerData);
    } catch (error) {
      console.error("Erro ao criar parceiro:", error);
      throw error;
    }
  }

  private async checkCnpjCpfExists(cnpjCpf: string): Promise<boolean> {
    try {
      const partner = await this.partnersRepository.findByCnpjCpf(cnpjCpf);
      return partner !== null;
    } catch (error) {
      console.error("Erro ao verificar CNPJ/CPF:", error);
      throw error;
    }
  }
}
