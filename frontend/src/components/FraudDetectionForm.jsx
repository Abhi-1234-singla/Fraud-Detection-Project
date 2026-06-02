import React, { useState } from 'react';
import { CreditCard, DollarSign, ArrowRightLeft, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { predictFraud } from '../services/api';

const FraudDetectionForm = ({ onPredictionResult }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    oldbalanceOrig: '',
    newbalanceOrig: '',
    oldbalanceDest: '',
    newbalanceDest: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) || '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await predictFraud(formData);
      onPredictionResult(result);
      toast.success('Analysis complete');
    } catch (error) {
      console.error(error);
      toast.error('Failed to process transaction');
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ label, name, icon: Icon, placeholder }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="number"
          name={name}
          value={formData[name]}
          onChange={handleChange}
          required
          step="0.01"
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-fintech-dark/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-fintech-primary focus:border-transparent transition-all outline-none"
        />
      </div>
    </div>
  );

  return (
    <div className="glass-panel rounded-2xl p-6 md:p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-fintech-primary/5 rounded-bl-full -z-10"></div>
      
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-fintech-primary/10 rounded-lg text-fintech-primary">
          <ArrowRightLeft className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">New Transaction</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Enter details for AI screening</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField 
          label="Transaction Amount" 
          name="amount" 
          icon={DollarSign} 
          placeholder="e.g. 5000.00" 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6 p-4 bg-gray-50/50 dark:bg-fintech-dark/30 rounded-xl border border-gray-100 dark:border-gray-800">
            <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wider">Sender Account</h3>
            <InputField 
              label="Balance Before" 
              name="oldbalanceOrig" 
              icon={CreditCard} 
              placeholder="0.00" 
            />
            <InputField 
              label="Balance After" 
              name="newbalanceOrig" 
              icon={CreditCard} 
              placeholder="0.00" 
            />
          </div>
          
          <div className="space-y-6 p-4 bg-gray-50/50 dark:bg-fintech-dark/30 rounded-xl border border-gray-100 dark:border-gray-800">
            <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wider">Receiver Account</h3>
            <InputField 
              label="Balance Before" 
              name="oldbalanceDest" 
              icon={CreditCard} 
              placeholder="0.00" 
            />
            <InputField 
              label="Balance After" 
              name="newbalanceDest" 
              icon={CreditCard} 
              placeholder="0.00" 
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-4 rounded-xl bg-fintech-primary text-white font-semibold hover:bg-blue-600 transition-colors shadow-lg hover:shadow-fintech-primary/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <><Loader2 className="h-5 w-5 animate-spin" /> Processing...</>
          ) : (
            'Predict Fraud Risk'
          )}
        </button>
      </form>
    </div>
  );
};

export default FraudDetectionForm;
