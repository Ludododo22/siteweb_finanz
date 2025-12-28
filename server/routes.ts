import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import multer from "multer";
import path from "path";
import fs from "fs";
import express from "express";

// Configure multer for local file uploads
const upload = multer({ 
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Ensure uploads directory exists
  if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
  }

  // Serve uploaded files statically (for MVP demo purposes)
  app.use("/uploads", express.static("uploads"));

  // Submit Loan Application
  app.post(api.loans.submit.path, async (req, res) => {
    try {
      const input = api.loans.submit.input.parse(req.body);
      const application = await storage.createLoanApplication(input);
      res.status(201).json(application);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // File Upload Endpoint
  app.post(api.loans.upload.path, upload.single("file"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    
    // In a real app, you would upload to S3/Blob storage.
    // Here we return a local URL.
    const fileUrl = `/uploads/${req.file.filename}`;
    
    res.json({
      url: fileUrl,
      filename: req.file.originalname
    });
  });

  return httpServer;
}
