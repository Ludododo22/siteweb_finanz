import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===
export const loanApplications = pgTable("loan_applications", {
  id: serial("id").primaryKey(),
  // Step 1: Personal Info
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  income: integer("income").notNull(), // Monthly income
  identityFileUrl: text("identity_file_url"),
  
  // Loan Details (from Calculator)
  amount: integer("amount").notNull(),
  duration: integer("duration").notNull(), // in months
  currency: text("currency").notNull(), // EUR, USD, GBP, CHF, JPY
  
  // Step 2: Payment Method
  iban: text("iban"),
  // Note: We don't store full card details for security, just a token or masked version if needed.
  // For this MVP, we'll focus on IBAN or simulated card token.
  paymentMethodType: text("payment_method_type").default("bank_transfer"), // bank_transfer or card
  
  // Metadata
  status: text("status").default("pending"), // pending, approved, rejected
  createdAt: timestamp("created_at").defaultNow(),
});

// === BASE SCHEMAS ===
export const insertLoanApplicationSchema = createInsertSchema(loanApplications).omit({ 
  id: true, 
  createdAt: true,
  status: true 
});

// === EXPLICIT API CONTRACT TYPES ===
export type LoanApplication = typeof loanApplications.$inferSelect;
export type InsertLoanApplication = z.infer<typeof insertLoanApplicationSchema>;

// Request types
export type CreateLoanApplicationRequest = InsertLoanApplication;
export type FileUploadResponse = {
  url: string;
  filename: string;
};

// Response types
export type LoanApplicationResponse = LoanApplication;
