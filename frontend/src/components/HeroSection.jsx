import React from 'react';
import { ArrowRight, Shield, Activity, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-fintech-primary/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fintech-primary/10 text-fintech-primary font-medium text-sm mb-6 border border-fintech-primary/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fintech-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-fintech-primary"></span>
            </span>
            Live Threat Monitoring Active
          </span>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Next-Gen AI <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fintech-primary to-fintech-accent">
              Fraud Detection
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
            Protect your financial institution with enterprise-grade machine learning. 
            Analyze transactions in real-time with our advanced predictive models.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#predict" className="w-full sm:w-auto px-8 py-3 rounded-full bg-fintech-primary text-white font-medium hover:bg-blue-600 transition-all shadow-lg hover:shadow-fintech-primary/30 flex items-center justify-center gap-2">
              Start Screening <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#dashboard" className="w-full sm:w-auto px-8 py-3 rounded-full bg-white dark:bg-fintech-card text-gray-900 dark:text-white font-medium border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
              View Analytics
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {[
            { icon: Shield, title: "99.9% Accuracy", desc: "Industry leading precision" },
            { icon: Activity, title: "< 50ms Latency", desc: "Real-time processing" },
            { icon: Lock, title: "Bank-Grade Security", desc: "End-to-end encryption" }
          ].map((item, i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center group hover:-translate-y-1 transition-transform">
              <div className="h-12 w-12 rounded-full bg-fintech-primary/10 flex items-center justify-center mb-4 group-hover:bg-fintech-primary group-hover:text-white transition-colors text-fintech-primary">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
