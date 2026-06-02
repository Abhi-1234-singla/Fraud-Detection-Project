import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FraudDetectionForm from './components/FraudDetectionForm';
import PredictionResultCard from './components/PredictionResultCard';
import RecentTransactionsTable from './components/RecentTransactionsTable';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import Footer from './components/Footer';
import { getTransactions, getDashboardStats } from './services/api';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentResult, setCurrentResult] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const fetchData = async () => {
    try {
      const [txData, statsData] = await Promise.all([
        getTransactions(10),
        getDashboardStats()
      ]);
      setTransactions(txData);
      setStats(statsData);
    } catch (error) {
      console.error("Failed to fetch initial data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePredictionResult = (result) => {
    setCurrentResult(result);
    // Refresh data to show new transaction
    fetchData();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-right" />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <main className="flex-grow">
        <HeroSection />
        
        <div className="container mx-auto px-6 py-12 space-y-24">
          
          {/* Dashboard Section */}
          <section id="dashboard" className="scroll-mt-24">
            <div className="mb-10">
              <h2 className="text-3xl font-bold mb-2">Platform Analytics</h2>
              <p className="text-gray-500 dark:text-gray-400">Real-time overview of fraud detection metrics</p>
            </div>
            <AnalyticsDashboard stats={stats} />
          </section>

          {/* Detection Section */}
          <section id="predict" className="scroll-mt-24">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold mb-2">Analyze Transaction</h2>
              <p className="text-gray-500 dark:text-gray-400">Run a manual check through our ML pipeline</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-6xl mx-auto">
              <FraudDetectionForm onPredictionResult={handlePredictionResult} />
              
              <div className="h-full relative">
                {currentResult ? (
                  <PredictionResultCard 
                    result={currentResult} 
                    onReset={() => setCurrentResult(null)} 
                  />
                ) : (
                  <div className="h-full min-h-[400px] glass-panel rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Awaiting Data</h3>
                    <p>Enter transaction details and run prediction to view AI analysis results here.</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Transactions Section */}
          <section id="transactions" className="scroll-mt-24">
            <RecentTransactionsTable transactions={transactions} />
          </section>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
