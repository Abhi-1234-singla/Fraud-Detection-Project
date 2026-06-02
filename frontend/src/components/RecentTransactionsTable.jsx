import React from 'react';
import { ArrowDownRight, ArrowUpRight, Filter, Download } from 'lucide-react';
import clsx from 'clsx';

const RecentTransactionsTable = ({ transactions }) => {
  return (
    <div className="glass-panel rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-white/50 dark:bg-fintech-card/50">
        <div>
          <h2 className="text-xl font-bold">Recent Screening Log</h2>
          <p className="text-sm text-gray-500">Live monitoring of API requests</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors">
            <Filter className="h-4 w-4" />
          </button>
          <button className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors">
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50 dark:bg-fintech-dark/80 text-gray-600 dark:text-gray-400 font-semibold border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="px-6 py-4">Transaction ID</th>
              <th className="px-6 py-4">Date & Time</th>
              <th className="px-6 py-4 text-right">Amount</th>
              <th className="px-6 py-4 text-center">AI Prediction</th>
              <th className="px-6 py-4 text-center">Risk Level</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                  No transactions monitored yet.
                </td>
              </tr>
            ) : (
              transactions.map((tx) => (
                <tr key={tx._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-gray-600 dark:text-gray-300">
                    {tx.transaction_id}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(tx.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right font-medium">
                    ${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <span className={clsx(
                        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border",
                        tx.prediction === 'Fraudulent' 
                          ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/50"
                          : "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/50"
                      )}>
                        {tx.prediction === 'Fraudulent' ? <ArrowDownRight className="h-3 w-3" /> : <ArrowUpRight className="h-3 w-3" />}
                        {tx.prediction}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <div className="flex items-center gap-2">
                        <div className={clsx(
                          "w-2 h-2 rounded-full",
                          tx.risk_level === 'High' ? "bg-fintech-danger" :
                          tx.risk_level === 'Medium' ? "bg-fintech-warning" : "bg-fintech-secondary"
                        )}></div>
                        <span className="text-gray-700 dark:text-gray-300">{tx.risk_level}</span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTransactionsTable;
