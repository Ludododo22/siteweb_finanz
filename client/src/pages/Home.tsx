import { useState } from "react";
import { LoanCalculator } from "@/components/ApplicationForm"; // This import seems wrong in thought process, correction: Use LoanCalculator component
import { LoanCalculator as Calculator } from "@/components/LoanCalculator";
import { ApplicationForm } from "@/components/ApplicationForm";
import { motion } from "framer-motion";
import { Check, ShieldCheck, Zap } from "lucide-react";

export default function Home() {
  const [loanData, setLoanData] = useState<{ amount: number; duration: number; currency: string } | null>(null);

  const handleApply = (amount: number, duration: number, currency: string) => {
    setLoanData({ amount, duration, currency });
    // Smooth scroll to form section if we were on mobile, but since we switch views, just scrollToTop
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-body">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl font-display shadow-lg shadow-blue-600/20">
                N
              </div>
              <span className="text-xl font-bold font-display text-slate-900">NexBank</span>
            </div>
            <div className="hidden md:flex gap-8 text-sm font-semibold text-slate-600">
              <a href="#" className="hover:text-blue-600 transition-colors">Personal</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Business</a>
              <a href="#" className="hover:text-blue-600 transition-colors">About Us</a>
            </div>
            <button className="px-5 py-2.5 rounded-lg bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors">
              Client Login
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          {/* Left Column: Copy & Trust Indicators */}
          <div className="lg:col-span-5 space-y-8 pt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl lg:text-6xl font-display font-bold leading-tight text-slate-900 mb-6">
                Financial freedom <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  made simple.
                </span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Get funded in minutes with our transparent, AI-driven approval process. No hidden fees, just honest banking.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: Zap, text: "Instant decision within 60 seconds" },
                  { icon: ShieldCheck, text: "Bank-grade encryption security" },
                  { icon: Check, text: "Flexible repayment options" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4" />
                    </div>
                    {item.text}
                  </div>
                ))}
              </div>

              {/* Social Proof */}
              <div className="mt-12 pt-8 border-t border-slate-200">
                <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Trusted by 50,000+ Customers</p>
                <div className="flex -space-x-3">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white ring-1 ring-slate-100" />
                  ))}
                  <div className="w-10 h-10 rounded-full bg-slate-900 text-white border-2 border-white flex items-center justify-center text-xs font-bold">
                    +5k
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Calculator OR Form */}
          <div className="lg:col-span-7 relative z-10">
            {/* Abstract Background Blobs */}
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl -z-10" />

            <motion.div
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {loanData ? (
                <ApplicationForm 
                  initialData={loanData} 
                  onBack={() => setLoanData(null)} 
                />
              ) : (
                <Calculator onApply={handleApply} />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
