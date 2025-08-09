import sql from "mssql";
import Database from "../config/database";
import { Partners, CreatePartnersData } from "../types/partners";

export class PartnersRepository {
  private async getConnection(): Promise<sql.ConnectionPool> {
    const database = Database.getInstance();
    return await database.connect();
  }

  async create(data: CreatePartnersData): Promise<void> {
    const pool = await this.getConnection();

    const request = pool.request();

    request.input("PartnerType", sql.VarChar(50), data.PartnerType);
    request.input("PersonalityType", sql.VarChar(20), data.PersonalityType);
    request.input("CompanyName", sql.VarChar(255), data.CompanyName);
    request.input("TradeName", sql.VarChar(255), data.TradeName);
    request.input("CnpjCpf", sql.VarChar(20), data.CnpjCpf);
    request.input("Segment", sql.VarChar(100), data.Segment);
    request.input("Category", sql.VarChar(100), data.Category);
    request.input("ZipCode", sql.VarChar(10), data.ZipCode);
    request.input("Country", sql.VarChar(50), data.Country || "Brasil");
    request.input("State", sql.VarChar(2), data.State);
    request.input("City", sql.VarChar(100), data.City);
    request.input("Street", sql.VarChar(255), data.Street);
    request.input("Number", sql.VarChar(20), data.Number);
    request.input("District", sql.VarChar(100), data.District);
    request.input("Email", sql.VarChar(255), data.Email);
    request.input("Phone", sql.VarChar(20), data.Phone);
    request.input(
      "AddressComplement",
      sql.VarChar(255),
      data.AddressComplement || null
    );
    request.input("MobilePhone", sql.VarChar(20), data.MobilePhone || null);
    request.input("Notes", sql.Text, data.Notes || null);

    await request.execute("sp_insert_partner");
  }

  async findByCnpjCpf(cnpjCpf: string): Promise<Partners | null> {
    const pool = await this.getConnection();
    const result = await pool
      .request()
      .input("cnpjCpf", sql.VarChar(20), cnpjCpf)
      .query("SELECT * FROM Partners WHERE CnpjCpf = @cnpjCpf");

    return result.recordset[0] || null;
  }
}
