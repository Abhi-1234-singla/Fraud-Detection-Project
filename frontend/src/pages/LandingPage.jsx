import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, BarChart3, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none" />

      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 max-w-7xl w-full mx-auto relative z-10">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-8 h-8 text-cyan-400" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            Aegis AI
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
          <Link to="/signup" className="bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 px-4 py-2 rounded-lg hover:bg-cyan-500/20 transition-colors shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-8">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Hybrid AI + Rule-Based Engine v2.0
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            Next-Gen <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">Fraud Detection</span> Platform
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Protect your financial ecosystem with state-of-the-art machine learning models combined with deterministic business rules for unparalleled accuracy and zero false positives.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup" className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity shadow-[0_0_30px_rgba(34,211,238,0.3)]">
              Start Free Trial
            </Link>
            <a href="#features" className="w-full sm:w-auto bg-gray-800 border border-gray-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-700 transition-colors">
              Explore Features
            </a>
          </div>
        </motion.div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-900/50 border-t border-gray-800 z-10 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Enterprise-Grade Security Architecture</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Our hybrid approach ensures that obvious frauds are caught instantly while complex patterns are identified by advanced XGBoost models.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Deterministic Rules", desc: "Instantly block impossible transactions like negative balances before hitting the ML pipeline." },
              { icon: BarChart3, title: "XGBoost Machine Learning", desc: "Analyzes hundreds of features to catch sophisticated fraud rings and subtle behavioral anomalies." },
              { icon: Lock, title: "Explainable AI", desc: "Get detailed reasoning for every flagged transaction, ensuring compliance and easy manual review." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-gray-800/50 border border-gray-700 p-8 rounded-2xl backdrop-blur-sm hover:border-cyan-500/30 transition-colors group"
              >
                <div className="w-14 h-14 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
