import { Request, Response, NextFunction } from "express";
import { PartnersService } from "../services/partnersService";
import { CreatePartnersData, ApiResponse } from "../types/partners";

export class PartnersController {
  private partnersService: PartnersService;

  constructor() {
    this.partnersService = new PartnersService();
  }

  createPartner = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const partnerData: CreatePartnersData = req.body;

      await this.partnersService.createPartner(partnerData);

      res.status(201).json({
        success: true,
        message: "Parceiro cadastrado com sucesso",
      } as ApiResponse);
    } catch (error) {
      next(error);
    }
  };
}
