import React from 'react';
import { ShieldCheck, Globe, Mail, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-fintech-dark border-t border-gray-200 dark:border-gray-800 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="h-8 w-8 text-fintech-primary" />
              <span className="text-xl font-bold tracking-tight">Aura<span className="text-fintech-primary">Guard</span></span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm">
              Enterprise-grade machine learning for real-time transaction screening and financial fraud prevention.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Product</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><a href="#" className="hover:text-fintech-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-fintech-primary transition-colors">API Documentation</a></li>
              <li><a href="#" className="hover:text-fintech-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-fintech-primary transition-colors">Case Studies</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Company</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><a href="#" className="hover:text-fintech-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-fintech-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-fintech-primary transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-fintech-primary transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} AuraGuard Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-gray-400">
            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors"><Globe className="h-5 w-5" /></a>
            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors"><Mail className="h-5 w-5" /></a>
            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors"><MessageCircle className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
