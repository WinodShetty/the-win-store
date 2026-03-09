import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { Lock, TrendingUp, ShoppingBag, Users, Tag, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { generateAccessToken } from "../modules/ebook-engine/utils/access";

export const Admin = () => {
  const [password, setPassword] = React.useState('');
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const stats = [
    { label: 'Total Revenue', value: '₹12,450', icon: TrendingUp, color: 'text-emerald-400' },
    { label: 'Total Orders', value: '142', icon: ShoppingBag, color: 'text-sky-400' },
    { label: 'Coupon Usage', value: '64', icon: Tag, color: 'text-orange-400' },
    { label: 'Active Users', value: '1,204', icon: Users, color: 'text-indigo-400' },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === siteConfig.adminPassword) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect Password');
    }
  };

  // 🔐 LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#0A0A0A] border border-white/10 p-8 rounded-3xl max-w-md w-full space-y-8"
        >
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-sky-500/10 rounded-2xl flex items-center justify-center mx-auto text-sky-500">
              <Lock size={32} />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Access</h1>
            <p className="text-slate-500">Enter password to access dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500 transition-colors"
            />
            <button className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-xl transition-colors">
              Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // 🔥 DASHBOARD
  return (
    <div className="min-h-screen bg-[#050505] pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* 🔐 Test Access Generator */}
        <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-2xl">
          <h3 className="text-white font-bold mb-4">Generate Test Access Link</h3>

          <button
            onClick={async () => {
              const token = await generateAccessToken("book-1", "en");
              alert(`http://127.0.0.1:3000/ebook/book-1/en?access=${token}`);
            }}
            className="bg-sky-500 px-4 py-2 rounded-xl text-white font-bold"
          >
            Generate Book-1 EN Link
          </button>
        </div>

        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white">Admin Dashboard</h1>
            <p className="text-slate-500">Welcome back, Vinod.</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg border border-white/10 flex items-center gap-2 text-sm transition-all">
              <Download size={16} /> Export CSV
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-[#0A0A0A] border border-white/10 p-6 rounded-2xl space-y-4">
              <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-slate-500 text-sm">{stat.label}</p>
                <p className="text-2xl font-black text-white">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};