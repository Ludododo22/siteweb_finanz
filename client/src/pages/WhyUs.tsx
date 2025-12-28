import { Link } from "wouter";
import { motion } from "framer-motion";
import { TrendingUp, Lock, Users, Zap, Award, Globe } from "lucide-react";
import { Footer } from "@/components/Footer";

export default function WhyUs() {
  const features = [
    {
      icon: Zap,
      title: "Ultra rapide",
      desc: "Approbation en 60 secondes, pas d'attente inutile",
    },
    {
      icon: Lock,
      title: "100% sécurisé",
      desc: "Chiffrement bancaire de grade militaire",
    },
    {
      icon: TrendingUp,
      title: "Meilleurs taux",
      desc: "Comparables aux banques traditionnelles",
    },
    {
      icon: Users,
      title: "Support 24/7",
      desc: "Équipe dédiée en français toujours disponible",
    },
    {
      icon: Award,
      title: "Réglementé",
      desc: "Respecte toutes les normes PSD2 et MiFID",
    },
    {
      icon: Globe,
      title: "Multi-devises",
      desc: "EUR, USD, GBP, CHF, JPY supportées",
    },
  ];

  const testimonials = [
    {
      name: "Marie D.",
      role: "Paris, France",
      text: "J'ai obtenu mon prêt en moins d'une heure! Incroyable. Aucun document à imprimer, tout en ligne.",
      rating: 5,
    },
    {
      name: "Hans K.",
      role: "Berlin, Allemagne",
      text: "Les meilleurs taux que j'ai trouvés. Pas de surprises, tout était transparent.",
      rating: 5,
    },
    {
      name: "Sofia R.",
      role: "Barcelona, Espagne",
      text: "Le service client m'a aidé avec mes questions. Très professionnel!",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-body">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
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
              <button className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors cursor-pointer">
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
            Pourquoi <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">nous</span> choisir?
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Nous sommes différents des banques traditionnelles. Voici pourquoi 50 000+ clients nous font confiance.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-lg hover:border-blue-200 transition-all"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-slate-900 mb-3 text-lg">{feature.title}</h3>
              <p className="text-slate-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-20"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left p-6 font-bold text-slate-900">Caractéristique</th>
                  <th className="text-center p-6 font-bold text-slate-900">NexBank</th>
                  <th className="text-center p-6 font-bold text-slate-600">Banques Traditionnelles</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-6 text-slate-700">Temps d'approbation</td>
                  <td className="p-6 text-center text-blue-600 font-bold">60 secondes</td>
                  <td className="p-6 text-center text-slate-600">3-5 jours</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-6 text-slate-700">Documents requis</td>
                  <td className="p-6 text-center text-blue-600 font-bold">Minimal</td>
                  <td className="p-6 text-center text-slate-600">Beaucoup</td>
                </tr>
                <tr>
                  <td className="p-6 text-slate-700">Frais transparents</td>
                  <td className="p-6 text-center text-blue-600 font-bold">✓ Oui</td>
                  <td className="p-6 text-center text-slate-600">✗ Non</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-6 text-slate-700">Support 24/7</td>
                  <td className="p-6 text-center text-blue-600 font-bold">✓ Oui</td>
                  <td className="p-6 text-center text-slate-600">✗ Non</td>
                </tr>
                <tr>
                  <td className="p-6 text-slate-700">Multi-devises</td>
                  <td className="p-6 text-center text-blue-600 font-bold">5 devises</td>
                  <td className="p-6 text-center text-slate-600">Limité</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center font-display">
            Ce que nos clients disent
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-slate-200">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <div key={j} className="w-5 h-5 bg-yellow-400 rounded-full" />
                  ))}
                </div>
                <p className="text-slate-700 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold text-slate-900">{testimonial.name}</p>
                  <p className="text-sm text-slate-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-12 text-center text-white"
        >
          <h2 className="text-4xl font-bold font-display mb-6">Prêt à changer votre vie financière?</h2>
          <p className="text-lg mb-8 text-blue-100">Rejoignez 50 000+ clients satisfaits. C'est gratuit et sans engagement.</p>
          <Link href="/">
            <button className="px-8 py-4 rounded-xl bg-white text-blue-600 font-bold text-lg hover:bg-slate-100 transition-colors cursor-pointer">
              Demander un prêt maintenant
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
