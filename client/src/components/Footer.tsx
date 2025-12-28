import { Link } from "wouter";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-300 font-body border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl font-display shadow-lg shadow-blue-600/20">
                N
              </div>
              <span className="text-xl font-bold font-display text-white">NexBank</span>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              La banque en ligne moderne pour vos prêts personnels. Transparent, rapide, sécurisé.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all duration-200">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-bold text-white mb-4 font-display">Produit</h3>
            <ul className="space-y-2.5">
              <li><Link href="/" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">Prêts personnels</Link></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">Prêts professionnels</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">Taux d'intérêt</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">Calcul de prêt</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-white mb-4 font-display">Entreprise</h3>
            <ul className="space-y-2.5">
              <li><Link href="/about" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">À Propos</Link></li>
              <li><Link href="/how-it-works" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">Comment ça marche</Link></li>
              <li><Link href="/why-us" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">Pourquoi nous</Link></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-200">Blog</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-white mb-4">Support</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:support@nexbank.fr" className="hover:text-blue-400 transition-colors">support@nexbank.fr</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+33123456789" className="hover:text-blue-400 transition-colors">+33 1 23 45 67 89</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Paris, France</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-sm">
            © {currentYear} NexBank. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-blue-400 transition-colors duration-200">Conditions d'utilisation</a>
            <a href="#" className="hover:text-blue-400 transition-colors duration-200">Politique de confidentialité</a>
            <a href="#" className="hover:text-blue-400 transition-colors duration-200">Cookies</a>
          </div>
        </div>

        {/* Security Badges */}
        <div className="mt-8 pt-8 border-t border-slate-700">
          <p className="text-slate-400 text-xs mb-4 font-semibold uppercase tracking-wider">Sécurité & Conformité</p>
          <div className="flex flex-wrap gap-3">
            <div className="px-3 py-1.5 bg-slate-700/50 rounded-lg text-xs font-semibold text-blue-300 border border-slate-600">
              PSD2 Compliant
            </div>
            <div className="px-3 py-1.5 bg-slate-700/50 rounded-lg text-xs font-semibold text-blue-300 border border-slate-600">
              SSL Encrypted
            </div>
            <div className="px-3 py-1.5 bg-slate-700/50 rounded-lg text-xs font-semibold text-blue-300 border border-slate-600">
              GDPR Ready
            </div>
            <div className="px-3 py-1.5 bg-slate-700/50 rounded-lg text-xs font-semibold text-blue-300 border border-slate-600">
              FCA Licensed
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
