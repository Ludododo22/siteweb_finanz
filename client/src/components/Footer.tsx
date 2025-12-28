import { Link } from "wouter";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 font-body">
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
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-bold text-white mb-4">Produit</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Prêts personnels</Link></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Prêts professionnels</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Taux d'intérêt</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Calcul de prêt</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-white mb-4">Entreprise</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-blue-400 transition-colors">À Propos</Link></li>
              <li><Link href="/how-it-works" className="hover:text-blue-400 transition-colors">Comment ça marche</Link></li>
              <li><Link href="/why-us" className="hover:text-blue-400 transition-colors">Pourquoi nous</Link></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
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
        <div className="border-t border-slate-800 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm mb-4 md:mb-0">
            © {currentYear} NexBank. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-blue-400 transition-colors">Conditions d'utilisation</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Politique de confidentialité</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Cookies</a>
          </div>
        </div>

        {/* Security Badges */}
        <div className="mt-8 pt-8 border-t border-slate-800">
          <p className="text-slate-400 text-xs mb-4">Sécurité & Conformité</p>
          <div className="flex flex-wrap gap-4">
            <div className="px-3 py-1.5 bg-slate-800 rounded-lg text-xs font-semibold text-blue-400">
              🔒 PSD2 Compliant
            </div>
            <div className="px-3 py-1.5 bg-slate-800 rounded-lg text-xs font-semibold text-blue-400">
              🛡️ SSL Encrypted
            </div>
            <div className="px-3 py-1.5 bg-slate-800 rounded-lg text-xs font-semibold text-blue-400">
              ✓ GDPR Ready
            </div>
            <div className="px-3 py-1.5 bg-slate-800 rounded-lg text-xs font-semibold text-blue-400">
              🏦 FCA Licensed
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
