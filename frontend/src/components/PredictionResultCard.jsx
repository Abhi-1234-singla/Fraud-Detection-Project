import React from 'react';
import { AlertTriangle, CheckCircle, ShieldAlert, Clock, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const PredictionResultCard = ({ result, onReset }) => {
  if (!result) return null;

  const isFraud = result.prediction === 'Fraudulent';
  
  const getRiskColor = (level) => {
    switch (level) {
      case 'High': return 'text-fintech-danger bg-fintech-danger/10 border-fintech-danger/20';
      case 'Medium': return 'text-fintech-warning bg-fintech-warning/10 border-fintech-warning/20';
      case 'Low': return 'text-fintech-secondary bg-fintech-secondary/10 border-fintech-secondary/20';
      default: return 'text-gray-500 bg-gray-100 border-gray-200';
    }
  };

  const getRiskBarColor = (level) => {
    switch (level) {
      case 'High': return 'bg-fintech-danger';
      case 'Medium': return 'bg-fintech-warning';
      case 'Low': return 'bg-fintech-secondary';
      default: return 'bg-gray-500';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 h-full flex flex-col"
    >
      <div className={clsx(
        "p-6 text-center text-white relative",
        isFraud ? "bg-gradient-to-br from-fintech-danger to-red-700" : "bg-gradient-to-br from-fintech-secondary to-emerald-700"
      )}>
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-mono">
          {result.transaction_id}
        </div>
        
        <div className="flex justify-center mb-4 mt-6">
          {isFraud ? (
            <ShieldAlert className="h-16 w-16 opacity-90 animate-pulse" />
          ) : (
            <CheckCircle className="h-16 w-16 opacity-90" />
          )}
        </div>
        
        <h2 className="text-3xl font-bold mb-1">
          {isFraud ? 'Fraud Detected' : 'Transaction Safe'}
        </h2>
        <p className="text-white/80 text-sm flex items-center justify-center gap-1">
          <Clock className="h-4 w-4" /> Analyzed on {new Date(result.timestamp).toLocaleString()}
        </p>
      </div>

      <div className="p-6 md:p-8 flex-1 flex flex-col">
        <div className="mb-8">
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Risk Assessment</span>
            <span className={clsx("px-3 py-1 rounded-full text-xs font-semibold border", getRiskColor(result.risk_level))}>
              {result.risk_level} Risk
            </span>
          </div>
          
          <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mt-3 relative">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${result.fraud_probability}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={clsx("h-full rounded-full", getRiskBarColor(result.risk_level))}
            />
          </div>
          <div className="mt-2 text-right text-sm font-bold text-gray-700 dark:text-gray-300">
            {result.fraud_probability.toFixed(1)}% Probability
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-gray-400" /> AI Insights
          </h3>
          <ul className="space-y-3">
            {result.reasons.map((reason, idx) => (
              <motion.li 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (idx * 0.1) }}
                key={idx}
                className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-fintech-dark/50 p-3 rounded-lg border border-gray-100 dark:border-gray-800"
              >
                <div className={clsx("mt-0.5 rounded-full w-1.5 h-1.5 shrink-0", isFraud ? "bg-fintech-danger" : "bg-fintech-secondary")} />
                {reason}
              </motion.li>
            ))}
          </ul>
        </div>

        <button 
          onClick={onReset}
          className="mt-8 w-full py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCcw className="h-4 w-4" /> Analyze Another
        </button>
      </div>
    </motion.div>
  );
};

export default PredictionResultCard;
