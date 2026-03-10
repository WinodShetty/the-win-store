import React from "react";
import { useApp } from "../context/AppContext";
import { siteConfig } from "../config/siteConfig";
import { Instagram, Facebook, X, Youtube } from "lucide-react";

export const Footer = () => {
  const { t } = useApp();

  const socialIcons = [
    { Icon: Instagram, link: siteConfig.socialLinks?.instagram },
    //{ Icon: Facebook, link: siteConfig.socialLinks?.facebook },
    { Icon: X, link: siteConfig.socialLinks?.twitter },
    { Icon: Youtube, link: siteConfig.socialLinks?.youtube }, // YouTube commented
  ].filter(item => item.link); // Hide if link not provided

  return (
    <footer
      id="contact"
      className="bg-[#050505] pt-24 pb-12 px-4 border-t border-white/10 relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-sky-500 to-transparent opacity-30" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
        
        {/* Brand Section */}
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-teal-500 rounded-xl overflow-hidden shadow-lg shadow-sky-500/20">
              <img
                src="/images/logo.jpg"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-3xl font-black tracking-tighter text-white">
              {siteConfig.brandName}
            </span>
          </div>

          <p className="text-slate-400 leading-relaxed text-lg">
            Your life changes the moment your mindset changes. This is that moment.
          </p>
        </div>

        {/* Quick Links */}
        <div className="hidden md:block space-y-8">
          <h4 className="text-white font-black uppercase tracking-[0.3em] text-xs">
            Quick Links
          </h4>
          <ul className="space-y-5 text-slate-400 font-bold">
            <li>
              <a
                href="#products"
                className="hover:text-sky-400 transition-colors"
              >
                eBooks Store
              </a>
            </li>
            <li>
              <a
                href="#home"
                className="hover:text-sky-400 transition-colors"
              >
                About The Win
              </a>
            </li>
            <li>
              <a
                href="/terms"
                className="hover:text-sky-400 transition-colors"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                href="/privacy"
                className="hover:text-sky-400 transition-colors"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Contact + Social */}
        <div className="space-y-8">
          <h4 className="text-white font-black uppercase tracking-[0.3em] text-xs">
            Connect With Us
          </h4>

          <ul className="space-y-5 text-slate-400 font-bold">

            {/* WhatsApp */}
            <li className="flex items-center gap-3">
              <span className="text-sky-500">WhatsApp:</span>
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-400 transition-colors"
              >
                {siteConfig.whatsappNumber}
              </a>
            </li>

            {/* Email */}
            <li className="flex items-center gap-3">
              <span className="text-sky-500">Email:</span>
              <a
                href={`mailto:support@${siteConfig.domain}`}
                className="hover:text-sky-400 transition-colors"
              >
                support@{siteConfig.domain}
              </a>
            </li>

            {/* Social Icons */}
            <li className="flex gap-4 pt-4">
              {socialIcons.map(({ Icon, link }, idx) => (
                <a
                  key={idx}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all hover:-translate-y-1 border border-white/10 shadow-xl"
                >
                  <Icon size={20} />
                </a>
              ))}
            </li>

          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 text-xs font-bold uppercase tracking-widest">
        <p>
          © {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.
        </p>
        <p className="text-slate-600">{t.footerCredit}</p>
      </div>
    </footer>
  );
};