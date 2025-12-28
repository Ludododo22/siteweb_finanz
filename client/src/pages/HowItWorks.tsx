import { Link } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle, FileText, DollarSign, Clock } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      icon: DollarSign,
      title: "Calculez votre prêt",
      desc: "Utilisez notre calculateur pour déterminer le montant et la durée de votre prêt. Voyez instantanément votre mensualité.",
    },
    {
      number: "2",
      icon: FileText,
      title: "Remplissez le formulaire",
      desc: "Entrez vos informations personnelles et professionnelles. Cela prend moins de 5 minutes.",
    },
    {
      number: "3",
      icon: Clock,
      title: "Approbation rapide",
      desc: "Notre système IA analyse votre demande en 60 secondes et vous donne une réponse instantanée.",
    },
    {
      number: "4",
      icon: CheckCircle,
      title: "Déblocage des fonds",
      desc: "Une fois approuvé, les fonds sont transférés sur votre compte dans les 24 heures.",
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
            Comment ça <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">marche</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Obtenez votre prêt en 4 étapes simples. Pas de complication, juste un processus transparent et rapide.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line - hidden on mobile */}
          <div className="hidden lg:block absolute top-32 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 -z-10" />
          
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 border border-slate-200 h-full">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg font-display flex-shrink-0 shadow-lg shadow-blue-600/30">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-3 text-lg">{step.title}</h3>
                  <p className="text-slate-600">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 grid md:grid-cols-2 gap-8"
        >
          <div className="bg-white rounded-2xl p-8 border border-slate-200">
            <h3 className="font-bold text-lg text-slate-900 mb-4">Conditions requises</h3>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Être un résident d'Europe de plus de 18 ans</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Avoir un revenu mensuel régulier</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Disposer d'un compte bancaire valide</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Avoir une pièce d'identité valide</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-200">
            <h3 className="font-bold text-lg text-slate-900 mb-4">Questions fréquentes</h3>
            <div className="space-y-4 text-slate-600">
              <div>
                <p className="font-semibold text-slate-900 mb-1">Combien de temps ça prend?</p>
                <p>La plupart des demandes sont traitées en moins de 60 secondes.</p>
              </div>
              <div>
                <p className="font-semibold text-slate-900 mb-1">Y a-t-il des frais cachés?</p>
                <p>Non! Tous les frais sont affichés clairement avant validation.</p>
              </div>
              <div>
                <p className="font-semibold text-slate-900 mb-1">Quand reçois-je l'argent?</p>
                <p>Les fonds sont versés dans les 24 heures après approbation.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-20"
        >
          <Link href="/">
            <button className="px-8 py-4 rounded-xl bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 cursor-pointer">
              Prêt? Commencez maintenant
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
