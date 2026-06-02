import React, { useState, useEffect } from 'react';
import { ShieldCheck, Moon, Sun, Bell } from 'lucide-react';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass-panel py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-8 w-8 text-fintech-primary" />
          <span className="text-xl font-bold tracking-tight">Aura<span className="text-fintech-primary">Guard</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 font-medium">
          <a href="#dashboard" className="hover:text-fintech-primary transition-colors">Dashboard</a>
          <a href="#predict" className="hover:text-fintech-primary transition-colors">Detection</a>
          <a href="#transactions" className="hover:text-fintech-primary transition-colors">Transactions</a>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <Bell className="h-5 w-5" />
          </button>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {darkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5" />}
          </button>
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-fintech-primary to-fintech-accent flex items-center justify-center text-white font-semibold">
            AD
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
