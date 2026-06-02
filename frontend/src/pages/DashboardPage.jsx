import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { fraudService } from '../services/api';
import PredictionForm from '../components/PredictionForm';
import ExplainabilityPanel from '../components/ExplainabilityPanel';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ShieldCheck, LogOut, Activity, AlertTriangle, CheckCircle2, History } from 'lucide-react';
import toast from 'react-hot-toast';

const COLORS = ['#ef4444', '#10b981']; // Red for fraud, Green for safe

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('predict');
  const [lastPrediction, setLastPrediction] = useState(null);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, historyRes] = await Promise.all([
        fraudService.getDashboardStats(),
        fraudService.getHistory()
      ]);
      setStats(statsRes.data);
      setHistory(historyRes.data);
    } catch (error) {
      console.error("Error fetching dashboard data", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handlePredictionSuccess = (data) => {
    setLastPrediction(data);
    fetchDashboardData(); // Refresh stats and history
  };

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-gray-800 flex items-center gap-2">
          <ShieldCheck className="w-8 h-8 text-cyan-400" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            Aegis AI
          </span>
        </div>
        
        <div className="p-4 flex-1 space-y-2">
          <button 
            onClick={() => setActiveTab('predict')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'predict' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-gray-400 hover:bg-gray-800'}`}
          >
            <Activity className="w-5 h-5" />
            Scanner
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'history' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-gray-400 hover:bg-gray-800'}`}
          >
            <History className="w-5 h-5" />
            Transaction History
          </button>
        </div>

        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 px-4 py-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 truncate">
              <p className="text-sm font-medium text-white truncate">{user?.name}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-400/10 rounded-lg transition-colors border border-transparent hover:border-red-400/20"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto space-y-8">
          
          {/* Header Stats */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-lg">
                <p className="text-gray-400 text-sm font-medium mb-1">Total Transactions</p>
                <p className="text-3xl font-bold text-white">{stats.total_transactions}</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-bl-full pointer-events-none" />
                <p className="text-gray-400 text-sm font-medium mb-1">Fraud Detected</p>
                <div className="flex items-end gap-2">
                  <p className="text-3xl font-bold text-red-400">{stats.fraudulent_transactions}</p>
                  <AlertTriangle className="w-5 h-5 text-red-500 mb-1" />
                </div>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-bl-full pointer-events-none" />
                <p className="text-gray-400 text-sm font-medium mb-1">Safe Transactions</p>
                <div className="flex items-end gap-2">
                  <p className="text-3xl font-bold text-emerald-400">{stats.safe_transactions}</p>
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mb-1" />
                </div>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-lg">
                <p className="text-gray-400 text-sm font-medium mb-1">Fraud Rate</p>
                <p className="text-3xl font-bold text-white">{stats.fraud_rate}%</p>
              </div>
            </div>
          )}

          {activeTab === 'predict' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <PredictionForm onSuccess={handlePredictionSuccess} />
              </div>
              <div className="lg:col-span-2 space-y-8">
                {lastPrediction ? (
                  <ExplainabilityPanel prediction={lastPrediction} />
                ) : (
                  <div className="bg-gray-900/50 border border-gray-800 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center text-center h-[400px]">
                    <ShieldCheck className="w-16 h-16 text-gray-700 mb-4" />
                    <h3 className="text-xl font-medium text-gray-400">Ready to Scan</h3>
                    <p className="text-gray-500 max-w-sm mt-2">Enter transaction details in the form to run it through our hybrid AI & Rules engine.</p>
                  </div>
                )}
                
                {/* Charts */}
                {stats && stats.total_transactions > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-lg">
                      <h3 className="text-sm font-medium text-gray-400 mb-4">Fraud vs Safe Distribution</h3>
                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'Fraudulent', value: stats.fraudulent_transactions },
                                { name: 'Safe', value: stats.safe_transactions }
                              ]}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {[0, 1].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151' }} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-lg">
                      <h3 className="text-sm font-medium text-gray-400 mb-4">Risk Level Distribution</h3>
                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={stats.risk_distribution}>
                            <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip cursor={{ fill: '#374151', opacity: 0.2 }} contentStyle={{ backgroundColor: '#111827', borderColor: '#374151' }} />
                            <Bar dataKey="value" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="p-5 border-b border-gray-800 flex justify-between items-center bg-gray-900/50">
                <h3 className="font-semibold text-lg">Recent Transactions</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-800/30 text-gray-400 text-xs uppercase tracking-wider">
                      <th className="px-6 py-4 font-medium">Type / ID</th>
                      <th className="px-6 py-4 font-medium">Amount</th>
                      <th className="px-6 py-4 font-medium">Risk Score</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {history.length > 0 ? history.map((txn) => (
                      <tr key={txn.transaction_id} className="hover:bg-gray-800/20 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-medium text-white">{txn.transaction_type}</div>
                          <div className="text-xs text-gray-500 mt-1">{txn.transaction_id}</div>
                        </td>
                        <td className="px-6 py-4 text-white font-medium">${txn.amount.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-gray-800 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${txn.fraud_probability > 75 ? 'bg-red-500' : txn.fraud_probability > 30 ? 'bg-yellow-500' : 'bg-emerald-500'}`}
                                style={{ width: `${txn.fraud_probability}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-400">{txn.fraud_probability}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            txn.prediction === 'Fraudulent' 
                              ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          }`}>
                            {txn.prediction}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400">
                          {new Date(txn.timestamp).toLocaleString()}
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                          No transactions found. Go to Scanner to test some.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
