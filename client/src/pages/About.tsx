import { Link } from "wouter";
import { motion } from "framer-motion";
import { Award, Globe, Heart, Zap } from "lucide-react";
import { Footer } from "@/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50 font-body">
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
            <Link href="/">
              <button className="btn-primary text-sm">
                Demander un prêt
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl lg:text-6xl font-display font-bold leading-tight text-slate-900 mb-6">
            À Propos de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">NexBank</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Nous révolutionnons l'accès aux prêts en Europe avec la transparence, la technologie et l'humanité au cœur de notre mission.
          </p>
        </motion.div>

        {/* Values */}
        <div className="grid md:grid-cols-4 gap-8 mb-20">
          {[
            { icon: Heart, title: "Honnêteté", desc: "Pas de frais cachés, transparence totale" },
            { icon: Zap, title: "Rapidité", desc: "Approbation en moins de 60 secondes" },
            { icon: Globe, title: "Global", desc: "Accessible en 5 devises européennes" },
            { icon: Award, title: "Excellence", desc: "Service client 24/7 en français" },
          ].map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card-base p-8 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                <value.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2 text-lg">{value.title}</h3>
              <p className="text-slate-600">{value.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-12 border border-blue-100"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-6 font-display">Notre Mission</h2>
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            Chez NexBank, nous croyons que chacun mérite un accès équitable à des prêts honnêtes. Depuis 2020, nous avons aidé plus de 50 000 clients à réaliser leurs rêves sans stress financier inutile.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed">
            Notre équipe de fintech experts et de banquiers passionnés travaille 24/7 pour vous offrir la meilleure expérience de prêt en Europe.
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
