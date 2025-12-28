import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Euro, DollarSign, PoundSterling, JapaneseYen, SwissFranc } from "lucide-react";
import { motion } from "framer-motion";

interface LoanCalculatorProps {
  onApply: (amount: number, duration: number, currency: string) => void;
}

const CURRENCIES = [
  { value: "EUR", label: "Euro (EUR)", icon: Euro, rate: 0.045 }, // 4.5% interest
  { value: "USD", label: "US Dollar (USD)", icon: DollarSign, rate: 0.052 }, // 5.2% interest
  { value: "GBP", label: "British Pound (GBP)", icon: PoundSterling, rate: 0.048 },
  { value: "CHF", label: "Swiss Franc (CHF)", icon: SwissFranc, rate: 0.035 },
  { value: "JPY", label: "Japanese Yen (JPY)", icon: JapaneseYen, rate: 0.025 },
];

export function LoanCalculator({ onApply }: LoanCalculatorProps) {
  const [amount, setAmount] = useState(10000);
  const [duration, setDuration] = useState(24); // months
  const [currency, setCurrency] = useState("EUR");
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    const selectedCurr = CURRENCIES.find(c => c.value === currency) || CURRENCIES[0];
    const annualRate = selectedCurr.rate;
    const monthlyRate = annualRate / 12;
    
    // Formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
    const p = amount;
    const i = monthlyRate;
    const n = duration;

    if (i === 0) {
      setMonthlyPayment(p / n);
    } else {
      const payment = (p * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
      setMonthlyPayment(payment);
    }
  }, [amount, duration, currency]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(val);
  };

  const CurrencyIcon = CURRENCIES.find(c => c.value === currency)?.icon || Euro;

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
      <div className="p-8 md:p-10">
        <h2 className="text-2xl font-display font-bold text-slate-900 mb-6">Calculate Your Loan</h2>
        
        {/* Currency Selector */}
        <div className="mb-8">
          <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 block">Currency</label>
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="w-full h-12 rounded-xl border-slate-200 bg-slate-50 focus:ring-blue-500/20">
              <div className="flex items-center gap-2">
                <CurrencyIcon className="w-4 h-4 text-blue-600" />
                <SelectValue placeholder="Select currency" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {CURRENCIES.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  <div className="flex items-center gap-2">
                    <c.icon className="w-4 h-4 text-slate-500" />
                    {c.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Amount Slider */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">I want to borrow</label>
            <div className="text-2xl font-bold text-blue-600 font-display">{formatCurrency(amount)}</div>
          </div>
          <Slider
            value={[amount]}
            onValueChange={(vals) => setAmount(vals[0])}
            min={1000}
            max={100000}
            step={500}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-2">
            <span>{formatCurrency(1000)}</span>
            <span>{formatCurrency(100000)}</span>
          </div>
        </div>

        {/* Duration Slider */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Duration</label>
            <div className="text-2xl font-bold text-blue-600 font-display">{duration} months</div>
          </div>
          <Slider
            value={[duration]}
            onValueChange={(vals) => setDuration(vals[0])}
            min={6}
            max={60}
            step={1}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-2">
            <span>6 months</span>
            <span>5 years</span>
          </div>
        </div>

        {/* Result Area */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-8">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">Monthly Payment</p>
              <motion.div 
                key={monthlyPayment}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold text-slate-900 font-display"
              >
                {formatCurrency(monthlyPayment)}
              </motion.div>
            </div>
            <div className="text-right">
              <p className="text-slate-500 text-sm font-medium mb-1">Total Payback</p>
              <p className="text-lg font-semibold text-slate-700">{formatCurrency(monthlyPayment * duration)}</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => onApply(amount, duration, currency)}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] text-lg"
        >
          Apply for this Loan
        </button>
      </div>
    </div>
  );
}
