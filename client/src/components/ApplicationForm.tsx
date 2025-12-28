import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertLoanApplicationSchema, type InsertLoanApplication } from "@shared/schema";
import { useSubmitLoan, useUploadFile } from "@/hooks/use-loans";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, UploadCloud, ChevronRight, ChevronLeft, CreditCard, Building2 } from "lucide-react";
import { z } from "zod";
import { useLocation } from "wouter";

interface ApplicationFormProps {
  initialData: {
    amount: number;
    duration: number;
    currency: string;
  };
  onBack: () => void;
}

// Extend schema for client-side validation logic
const formSchema = insertLoanApplicationSchema.extend({
  income: z.coerce.number().min(1, "Income is required"),
  amount: z.coerce.number(),
  duration: z.coerce.number(),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms" }),
  }),
});

type FormValues = z.infer<typeof formSchema>;

const STEPS = ["Personal Info", "Payment Method", "Review"];

export function ApplicationForm({ initialData, onBack }: ApplicationFormProps) {
  const [step, setStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [, setLocation] = useLocation();

  const submitLoan = useSubmitLoan();
  const uploadFile = useUploadFile();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      income: 0,
      amount: initialData.amount,
      duration: initialData.duration,
      currency: initialData.currency,
      paymentMethodType: "bank_transfer",
      iban: "",
      status: "pending",
      // @ts-expect-error - temporary field for checkbox
      termsAccepted: false,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      let fileUrl = "";
      
      if (file) {
        const uploadRes = await uploadFile.mutateAsync(file);
        fileUrl = uploadRes.url;
      }

      await submitLoan.mutateAsync({
        ...data,
        identityFileUrl: fileUrl,
      });

      // Move to success page or show success state
      setStep(3); // 3 = Success state
    } catch (error) {
      console.error(error);
    }
  };

  const nextStep = async () => {
    let valid = false;
    if (step === 0) {
      valid = await form.trigger(["firstName", "lastName", "email", "income"]);
    } else if (step === 1) {
      valid = await form.trigger(["paymentMethodType", "iban"]);
    } else {
      valid = true;
    }

    if (valid) setStep((s) => s + 1);
  };

  const prevStep = () => {
    if (step === 0) onBack();
    else setStep((s) => s - 1);
  };

  if (step === 3) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center shadow-xl border border-slate-100">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">Application Received!</h2>
        <p className="text-slate-600 mb-8 max-w-md mx-auto">
          Your loan application ID #{Math.floor(Math.random() * 10000)} has been submitted successfully. We will review it within 24 hours.
        </p>
        <button
          onClick={() => setLocation("/")}
          className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden min-h-[600px] flex flex-col">
      {/* Progress Bar */}
      <div className="bg-slate-50 px-8 py-6 border-b border-slate-100">
        <div className="flex justify-between items-center mb-4">
          {STEPS.map((label, idx) => (
            <div key={idx} className={`flex items-center gap-2 ${idx <= step ? "text-blue-600" : "text-slate-400"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${idx <= step ? "bg-blue-100" : "bg-slate-200"}`}>
                {idx + 1}
              </div>
              <span className="hidden sm:block text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-blue-600"
            initial={{ width: "0%" }}
            animate={{ width: `${((step + 1) / 3) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-8 md:p-10 flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div 
              key="step0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold font-display text-slate-900">Personal Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">First Name</label>
                  <input {...form.register("firstName")} className="input-base" placeholder="John" />
                  {form.formState.errors.firstName && <p className="text-red-500 text-sm">{form.formState.errors.firstName.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Last Name</label>
                  <input {...form.register("lastName")} className="input-base" placeholder="Doe" />
                  {form.formState.errors.lastName && <p className="text-red-500 text-sm">{form.formState.errors.lastName.message}</p>}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Email Address</label>
                <input {...form.register("email")} type="email" className="input-base" placeholder="john@example.com" />
                {form.formState.errors.email && <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Monthly Net Income ({initialData.currency})</label>
                <input {...form.register("income")} type="number" className="input-base" placeholder="5000" />
                {form.formState.errors.income && <p className="text-red-500 text-sm">{form.formState.errors.income.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Identity Document</label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer relative">
                  <input 
                    type="file" 
                    onChange={handleFileChange} 
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    accept=".pdf,.jpg,.png"
                  />
                  <UploadCloud className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-600 font-medium">
                    {file ? file.name : "Click to upload ID (Passport/License)"}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">PDF, JPG or PNG up to 5MB</p>
                </div>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold font-display text-slate-900">Disbursement Method</h3>
              <p className="text-slate-500">Where should we send the funds?</p>

              <div className="grid md:grid-cols-2 gap-4">
                <label className="relative cursor-pointer">
                  <input 
                    type="radio" 
                    value="bank_transfer" 
                    {...form.register("paymentMethodType")} 
                    className="peer sr-only"
                  />
                  <div className="p-6 rounded-xl border-2 border-slate-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 transition-all hover:border-blue-300 h-full">
                    <Building2 className="w-8 h-8 text-blue-600 mb-3" />
                    <h4 className="font-bold text-slate-900">Bank Transfer</h4>
                    <p className="text-sm text-slate-500 mt-1">Receive funds directly to your IBAN account (1-2 days).</p>
                  </div>
                </label>

                <label className="relative cursor-pointer">
                  <input 
                    type="radio" 
                    value="card" 
                    {...form.register("paymentMethodType")} 
                    className="peer sr-only"
                    disabled
                  />
                  <div className="p-6 rounded-xl border-2 border-slate-100 bg-slate-50 opacity-60 cursor-not-allowed h-full">
                    <CreditCard className="w-8 h-8 text-slate-400 mb-3" />
                    <h4 className="font-bold text-slate-900">Direct to Card</h4>
                    <p className="text-sm text-slate-500 mt-1">Instant transfer to debit card (Coming Soon).</p>
                  </div>
                </label>
              </div>

              <div className="space-y-2 mt-4">
                <label className="text-sm font-medium text-slate-700">IBAN Number</label>
                <input 
                  {...form.register("iban")} 
                  className="input-base uppercase font-mono tracking-wider" 
                  placeholder="DE89 3704 0044 0532 0130 00" 
                />
                {form.formState.errors.iban && <p className="text-red-500 text-sm">{form.formState.errors.iban.message}</p>}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold font-display text-slate-900">Confirm Application</h3>
              
              <div className="bg-slate-50 rounded-xl p-6 space-y-4 border border-slate-100">
                <div className="flex justify-between border-b border-slate-200 pb-4">
                  <span className="text-slate-500">Loan Amount</span>
                  <span className="font-bold text-slate-900">{initialData.amount} {initialData.currency}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-4">
                  <span className="text-slate-500">Duration</span>
                  <span className="font-bold text-slate-900">{initialData.duration} months</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-4">
                  <span className="text-slate-500">Applicant</span>
                  <span className="font-bold text-slate-900">{form.getValues("firstName")} {form.getValues("lastName")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Account (IBAN)</span>
                  <span className="font-bold text-slate-900 font-mono">{form.getValues("iban")}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-blue-50 text-blue-800 rounded-xl text-sm">
                <input 
                  type="checkbox" 
                  {...form.register("termsAccepted")}
                  className="mt-1 w-4 h-4 rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                />
                <p>
                  I declare that the information provided is accurate and I agree to the 
                  <a href="#" className="underline font-bold ml-1">Terms of Service</a> and 
                  <a href="#" className="underline font-bold ml-1">Privacy Policy</a>.
                </p>
              </div>
              {form.formState.errors.termsAccepted && <p className="text-red-500 text-sm px-4">You must accept terms to proceed.</p>}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-auto pt-8 flex justify-between gap-4">
          <button
            onClick={prevStep}
            disabled={submitLoan.isPending}
            className="px-6 py-3 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          
          {step < 2 ? (
            <button
              onClick={nextStep}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2"
            >
              Next Step <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={form.handleSubmit(onSubmit)}
              disabled={submitLoan.isPending}
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold shadow-lg shadow-green-500/25 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {submitLoan.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
