import React from 'react';
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { TrendingUp, ShieldAlert, CheckCircle, Activity } from 'lucide-react';

const AnalyticsDashboard = ({ stats }) => {
  if (!stats) return null;

  const COLORS = ['#ef4444', '#f59e0b', '#10b981']; // High, Medium, Low
  const PREDICTION_COLORS = ['#ef4444', '#10b981']; // Fraud, Safe

  const predictionData = [
    { name: 'Fraudulent', value: stats.fraudulent_transactions },
    { name: 'Safe', value: stats.safe_transactions }
  ];

  const StatCard = ({ title, value, sub, icon: Icon, colorClass }) => (
    <div className="glass-panel p-6 rounded-2xl flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{value}</h3>
        {sub && <p className="text-xs text-gray-400">{sub}</p>}
      </div>
      <div className={`p-3 rounded-xl ${colorClass}`}>
        <Icon className="h-6 w-6" />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Screened" 
          value={stats.total_transactions} 
          sub="All time transactions"
          icon={Activity} 
          colorClass="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" 
        />
        <StatCard 
          title="Fraud Rate" 
          value={`${stats.fraud_rate}%`} 
          sub="Detected anomalies"
          icon={TrendingUp} 
          colorClass="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" 
        />
        <StatCard 
          title="Flagged Fraud" 
          value={stats.fraudulent_transactions} 
          icon={ShieldAlert} 
          colorClass="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" 
        />
        <StatCard 
          title="Safe Transactions" 
          value={stats.safe_transactions} 
          icon={CheckCircle} 
          colorClass="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-lg font-bold mb-6">Risk Level Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.risk_distribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stats.risk_distribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-lg font-bold mb-6">Detection Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={predictionData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#374151" opacity={0.2} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" tick={{ fill: '#6b7280' }} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={40}>
                  {predictionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PREDICTION_COLORS[index % PREDICTION_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
