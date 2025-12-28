import { db } from "./db";
import {
  loanApplications,
  type InsertLoanApplication,
  type LoanApplication,
} from "@shared/schema";

export interface IStorage {
  createLoanApplication(data: InsertLoanApplication): Promise<LoanApplication>;
}

export class DatabaseStorage implements IStorage {
  async createLoanApplication(data: InsertLoanApplication): Promise<LoanApplication> {
    const [application] = await db
      .insert(loanApplications)
      .values(data)
      .returning();
    return application;
  }
}

export const storage = new DatabaseStorage();
