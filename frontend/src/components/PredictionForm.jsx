import React, { useState } from 'react';
import { fraudService } from '../services/api';
import { Loader2, ArrowRightLeft, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';

const TRANSACTION_TYPES = [
  { value: 'TRANSFER', desc: 'Money sent to another account' },
  { value: 'CASH_OUT', desc: 'Withdrawal of money' },
  { value: 'CASH_IN', desc: 'Deposit of money' },
  { value: 'PAYMENT', desc: 'Payment for goods/services' },
  { value: 'DEBIT', desc: 'Direct debit from account' }
];

const PredictionForm = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    transaction_type: 'TRANSFER',
    amount: '',
    oldbalanceOrig: '',
    newbalanceOrig: '',
    oldbalanceDest: '',
    newbalanceDest: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Convert string values to numbers
      const payload = {
        transaction_type: formData.transaction_type,
        amount: parseFloat(formData.amount),
        oldbalanceOrig: parseFloat(formData.oldbalanceOrig),
        newbalanceOrig: parseFloat(formData.newbalanceOrig),
        oldbalanceDest: parseFloat(formData.oldbalanceDest),
        newbalanceDest: parseFloat(formData.newbalanceDest)
      };
      
      const response = await fraudService.predict(payload);
      onSuccess(response.data);
      toast.success('Scan complete');
    } catch (error) {
      toast.error('Failed to run prediction');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const selectedTypeDesc = TRANSACTION_TYPES.find(t => t.value === formData.transaction_type)?.desc;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-xl overflow-hidden">
      <div className="p-5 border-b border-gray-800 bg-gray-900/50">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <ArrowRightLeft className="w-5 h-5 text-cyan-400" />
          New Transaction Scan
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1.5">Transaction Type</label>
          <select 
            name="transaction_type" 
            value={formData.transaction_type}
            onChange={handleChange}
            className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-shadow appearance-none"
          >
            {TRANSACTION_TYPES.map(type => (
              <option key={type.value} value={type.value}>{type.value}</option>
            ))}
          </select>
          <p className="text-xs text-cyan-500/80 mt-1.5 ml-1">{selectedTypeDesc}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1.5">Amount</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <DollarSign className="h-4 w-4 text-gray-500" />
            </div>
            <input 
              type="number" 
              name="amount" 
              required
              step="0.01"
              value={formData.amount}
              onChange={handleChange}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-shadow"
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 p-4 rounded-xl border border-gray-800/50 bg-gray-950/30">
          <div className="col-span-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Sender details</div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Balance Before</label>
            <input type="number" name="oldbalanceOrig" required step="0.01" value={formData.oldbalanceOrig} onChange={handleChange} className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm" placeholder="0.00" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Balance After</label>
            <input type="number" name="newbalanceOrig" required step="0.01" value={formData.newbalanceOrig} onChange={handleChange} className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm" placeholder="0.00" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 p-4 rounded-xl border border-gray-800/50 bg-gray-950/30">
          <div className="col-span-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Receiver details</div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Balance Before</label>
            <input type="number" name="oldbalanceDest" required step="0.01" value={formData.oldbalanceDest} onChange={handleChange} className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm" placeholder="0.00" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Balance After</label>
            <input type="number" name="newbalanceDest" required step="0.01" value={formData.newbalanceDest} onChange={handleChange} className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm" placeholder="0.00" />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Run Fraud Analysis'}
        </button>
      </form>
    </div>
  );
};

export default PredictionForm;
