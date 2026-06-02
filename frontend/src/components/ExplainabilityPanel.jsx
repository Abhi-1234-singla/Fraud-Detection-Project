import React from 'react';
import { AlertTriangle, CheckCircle2, Info, BrainCircuit, ShieldAlert } from 'lucide-react';

const ExplainabilityPanel = ({ prediction }) => {
  if (!prediction) return null;

  const isFraud = prediction.prediction === 'Fraudulent';
  const hasRulesTriggered = prediction.triggered_rules && prediction.triggered_rules.length > 0;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className={`p-6 border-b border-gray-800 flex items-center justify-between ${isFraud ? 'bg-red-500/10' : 'bg-emerald-500/10'}`}>
        <div className="flex items-center gap-3">
          {isFraud ? (
            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
          ) : (
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            </div>
          )}
          <div>
            <h2 className={`text-xl font-bold ${isFraud ? 'text-red-400' : 'text-emerald-400'}`}>
              {isFraud ? 'High Risk Transaction Detected' : 'Transaction Appears Safe'}
            </h2>
            <p className="text-gray-400 text-sm mt-0.5">ID: {prediction.transaction_id}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Risk Score</p>
          <p className={`text-3xl font-bold ${isFraud ? 'text-red-500' : 'text-emerald-500'}`}>
            {prediction.fraud_probability}%
          </p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        
        {/* Source of Detection */}
        <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-950 border border-gray-800">
          <div className="mt-1">
            {hasRulesTriggered ? <ShieldAlert className="w-5 h-5 text-amber-500" /> : <BrainCircuit className="w-5 h-5 text-cyan-500" />}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-1">
              Detection Source: {hasRulesTriggered ? 'Deterministic Rule Engine' : 'AI Machine Learning Model'}
            </h3>
            <p className="text-sm text-gray-400">
              {hasRulesTriggered 
                ? "This transaction violated strict business logic rules and was blocked before ML evaluation." 
                : `Analyzed using XGBoost model with ${prediction.confidence_score}% confidence based on behavioral patterns.`}
            </p>
          </div>
        </div>

        {/* Triggered Rules */}
        {hasRulesTriggered && (
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Info className="w-4 h-4" /> Triggered Rules
            </h3>
            <ul className="space-y-2">
              {prediction.triggered_rules.map((rule, idx) => (
                <li key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-red-500/5 border border-red-500/10 text-red-300 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* AI Explanations */}
        <div>
          <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Info className="w-4 h-4" /> Reasoning & Analysis
          </h3>
          <ul className="space-y-2">
            {prediction.reasons.map((reason, idx) => (
              <li key={idx} className={`flex items-start gap-3 p-3 rounded-lg border text-sm ${isFraud ? 'bg-red-500/5 border-red-500/10 text-red-200' : 'bg-emerald-500/5 border-emerald-500/10 text-emerald-200'}`}>
                <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${isFraud ? 'bg-red-500' : 'bg-emerald-500'}`} />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Recommendation */}
        <div className="pt-4 border-t border-gray-800">
          <h3 className="text-sm font-semibold text-white mb-2">System Recommendation</h3>
          <p className="text-sm text-gray-400">
            {isFraud 
              ? "Immediately block this transaction and flag the associated accounts for manual review. Do not process funds."
              : "Allow transaction to proceed. Continue standard monitoring."}
          </p>
        </div>

      </div>
    </div>
  );
};

export default ExplainabilityPanel;
