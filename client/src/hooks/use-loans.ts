import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertLoanApplication, type LoanApplicationResponse } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useSubmitLoan() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: InsertLoanApplication) => {
      // Ensure numeric fields are numbers (z.coerce handles this in schema but extra safety here)
      const payload = {
        ...data,
        income: Number(data.income),
        amount: Number(data.amount),
        duration: Number(data.duration),
      };

      const res = await fetch(api.loans.submit.path, {
        method: api.loans.submit.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to submit application");
      }

      return api.loans.submit.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted",
        description: "We have received your loan application successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useUploadFile() {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(api.loans.upload.path, {
        method: api.loans.upload.method,
        body: formData, // No Content-Type header needed for FormData, browser sets it
      });

      if (!res.ok) {
        throw new Error("Failed to upload file");
      }

      return api.loans.upload.responses[200].parse(await res.json());
    },
  });
}
