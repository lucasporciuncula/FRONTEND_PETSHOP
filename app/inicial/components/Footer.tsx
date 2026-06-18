"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="w-full bg-gray-900 text-gray-300 pt-16 relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-gray-800">
        <div className="space-y-4">
          <h5 className="text-white font-bold text-lg tracking-wide mb-2">Address</h5>
          <div className="flex items-center gap-3 text-sm"><MapPin className="w-4 h-4 text-[#eed5aa]" /> <span>123 Street, New York, USA</span></div>
          <div className="flex items-center gap-3 text-sm"><Phone className="w-4 h-4 text-[#eed5aa]" /> <span>+012 345 67890</span></div>
          <div className="flex items-center gap-3 text-sm"><Mail className="w-4 h-4 text-[#eed5aa]" /> <span>info@example.com</span></div>
          
          <div className="flex gap-2 pt-2 text-gray-400">
            <a href="#" className="w-9 h-9 rounded-lg border border-gray-700 hover:bg-white hover:text-gray-900 flex items-center justify-center transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-lg border border-gray-700 hover:bg-white hover:text-gray-900 flex items-center justify-center transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-lg border border-gray-700 hover:bg-white hover:text-gray-900 flex items-center justify-center transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-lg border border-gray-700 hover:bg-white hover:text-gray-900 flex items-center justify-center transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
        </div>

        <div className="space-y-3">
          <h5 className="text-white font-bold text-lg tracking-wide mb-2">Quick Links</h5>
          {["About Us", "Contact Us", "Our Services"].map((l, i) => (
            <Link key={i} href="#" className="block text-sm hover:text-white transition-all">➔ {l}</Link>
          ))}
        </div>

        <div className="space-y-3">
          <h5 className="text-white font-bold text-lg tracking-wide mb-2">Popular Links</h5>
          {["About Us", "Contact Us", "Our Services"].map((l, i) => (
            <Link key={i} href="#" className="block text-sm hover:text-white transition-all">➔ {l}</Link>
          ))}
        </div>

        <div className="space-y-4">
          <h5 className="text-white font-bold text-lg tracking-wide mb-2">Newsletter</h5>
          <div className="relative w-full">
            <input type="email" placeholder="Your email" className="w-full bg-gray-800 border-0 rounded-xl py-3 pl-4 pr-24 text-sm text-white focus:outline-none" />
            <button className="absolute right-1.5 top-1.5 bg-[#4a2f20] hover:bg-[#664533] text-white px-4 py-1.5 rounded-lg text-xs font-bold">SignUp</button>
          </div>
        </div>
      </div>

      <button onClick={scrollToTop} className="fixed bottom-6 right-6 bg-[#4a2f20] hover:bg-[#664533] text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg z-50">
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
}