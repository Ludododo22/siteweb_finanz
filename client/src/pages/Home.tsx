import { useState, useEffect } from "react";
import { LoanCalculator as Calculator } from "@/components/LoanCalculator";
import { ApplicationForm } from "@/components/ApplicationForm";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Check, ShieldCheck, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";

// Import hero images
import skyline1 from "@assets/stock_images/modern_city_skyline__bfe3755a.jpg";
import skyline2 from "@assets/stock_images/modern_city_skyline__9a436f7c.jpg";
import skyline3 from "@assets/stock_images/modern_city_skyline__bf343add.jpg";
import people1 from "@assets/stock_images/happy_diverse_people_5b3e7651.jpg";
import people2 from "@assets/stock_images/happy_diverse_people_a5e76b12.jpg";
import dashboard1 from "@assets/stock_images/laptop_computer_show_f437fa97.jpg";

const heroSlides = [
  { image: skyline1, title: "Financement transparent", subtitle: "Sans frais cachés" },
  { image: people1, title: "50 000+ clients satisfaits", subtitle: "Rejoint notre communauté" },
  { image: dashboard1, title: "Technologie de pointe", subtitle: "Approbation en 60 secondes" },
];

export default function Home() {
  const [loanData, setLoanData] = useState<{ amount: number; duration: number; currency: string } | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleApply = (amount: number, duration: number, currency: string) => {
    setLoanData({ amount, duration, currency });
    window.scrollTo({ top: 500, behavior: 'smooth' });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-body flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl font-display shadow-lg shadow-blue-600/20">
                  N
                </div>
                <span className="text-xl font-bold font-display text-slate-900">NexBank</span>
              </div>
            </Link>
            <div className="hidden md:flex gap-8 text-sm font-semibold text-slate-600">
              <Link href="/about" className="hover:text-blue-600 transition-colors">À Propos</Link>
              <Link href="/how-it-works" className="hover:text-blue-600 transition-colors">Comment ça marche</Link>
              <Link href="/why-us" className="hover:text-blue-600 transition-colors">Pourquoi nous</Link>
            </div>
            <button 
              onClick={() => {
                setLoanData({ amount: 10000, duration: 60, currency: "EUR" });
                window.scrollTo({ top: 800, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
            >
              Demander un prêt
            </button>
          </div>
        </div>
      </nav>

      {/* Full-Width Hero Slider */}
      <div className="relative w-full h-96 lg:h-[500px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: currentSlide === index ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Dark Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
            
            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: currentSlide === index ? 1 : 0, y: currentSlide === index ? 0 : 20 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-center px-4"
              >
                <h2 className="text-4xl lg:text-6xl font-bold font-display mb-3 leading-tight">{slide.title}</h2>
                <p className="text-xl lg:text-2xl text-white/90">{slide.subtitle}</p>
              </motion.div>
            </div>
          </motion.div>
        ))}

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 lg:w-14 lg:h-14 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200"
        >
          <ChevronLeft className="w-6 h-6 lg:w-8 lg:h-8" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 lg:w-14 lg:h-14 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200"
        >
          <ChevronRight className="w-6 h-6 lg:w-8 lg:h-8" />
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === index ? 'bg-white w-8 h-3' : 'bg-white/50 w-3 h-3 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {loanData ? (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <ApplicationForm 
              initialData={loanData} 
              onBack={() => setLoanData(null)} 
            />
          </div>
        ) : (
          <>
            {/* Features + Calculator Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
              <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">
                
                {/* Left Column: Copy & Trust Indicators */}
                <div className="lg:col-span-5 space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h1 className="text-5xl lg:text-6xl font-display font-bold leading-tight text-slate-900 mb-6">
                      Liberté <br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                        financière
                      </span>
                    </h1>
                    <p className="text-lg text-slate-600 leading-relaxed mb-8">
                      Obtenez un prêt en minutes avec notre processus d'approbation transparent et alimenté par l'IA. Pas de frais cachés, juste une banque honnête.
                    </p>
                    
                    <div className="space-y-4">
                      {[
                        { icon: Zap, text: "Décision instantanée en 60 secondes" },
                        { icon: ShieldCheck, text: "Sécurité de niveau bancaire" },
                        { icon: Check, text: "Options de remboursement flexibles" },
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
                      <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Approuvés par 50 000+ clients</p>
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

                {/* Right Column: Calculator */}
                <div className="lg:col-span-7 relative z-10">
                  {/* Abstract Background Blobs */}
                  <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl -z-10 animate-pulse" />
                  <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl -z-10" />

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Calculator onApply={handleApply} />
                  </motion.div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
