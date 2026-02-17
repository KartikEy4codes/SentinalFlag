import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockStats } from '../utils/mockData';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-mesh overflow-hidden relative font-sans">
      {/* Animated gradient clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[10%] w-[30vw] h-[30vw] bg-blue-400/10 rounded-full blur-[120px] animate-float"></div>
        <div className="absolute bottom-[10%] left-[10%] w-[25vw] h-[25vw] bg-purple-400/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-24">
          {/* Hero Section */}
          <div className="text-center mb-24 animate-slideUp">
            <div className="inline-block mb-6 px-5 py-2 glass rounded-full border border-blue-100/50">
              <span className="text-blue-600 text-xs font-black uppercase tracking-[0.2em]">🚀 Enterprise Feature Management</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-tight">
              Ship with <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Total Confidence</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              The enterprise-grade feature flag platform that empowers teams to deploy safely, test in production, and rollout with precision.
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => navigate('/flags')}
                className="btn-primary shine-effect px-10 py-4 text-base"
              >
                Go to Console
              </button>
              <button
                onClick={() => navigate('/login')}
                className="btn-ghost glass px-10 py-4 text-base border border-slate-200/50"
              >
                Sign In
              </button>
            </div>
          </div>

          {/* Stats Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
            <StatPreview label="Total Flags" value={mockStats.totalFlags} icon="🚩" color="text-blue-600" />
            <StatPreview label="Active Now" value={mockStats.enabledFlags} icon="⚡" color="text-green-600" />
            <StatPreview label="Staging Env" value="4" icon="🧪" color="text-purple-600" />
            <StatPreview label="Success Rate" value="99.9%" icon="📈" color="text-indigo-600" />
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            <FeatureCard
              icon="⚡"
              title="Instant Toggles"
              description="Flip switches in real-time without redeploying code. Our in-memory cache ensures sub-millisecond latency."
            />
            <FeatureCard
              icon="🎯"
              title="Smart Rollouts"
              description="Gradual rollouts by percentage, user ID, or custom attributes. Safe, granular, and fully automated."
            />
            <FeatureCard
              icon="🛡️"
              title="Shield Layer"
              description="Enterprise-grade security with audit logs, RBAC, and environment-specific governance."
            />
          </div>

          {/* Integration Status */}
          <div className="glass rounded-[32px] p-10 border border-white shadow-2xl shadow-blue-500/5 animate-slideUp" style={{ animationDelay: '0.2s' }}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">System Integrity</h2>
                <p className="text-slate-500 font-medium">Core infrastructure development status.</p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <TechBadge text="Node.js 20" />
                <TechBadge text="React 18" />
                <TechBadge text="MongoDB Atlas" />
                <TechBadge text="Redis Cache" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6 mt-12">
              <ProgressItem label="Backend Engine" percentage={100} />
              <ProgressItem label="Auth Layer" percentage={100} />
              <ProgressItem label="Rollout Strategy" percentage={90} />
              <ProgressItem label="Management UI" percentage={95} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Decoration */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50"></div>
    </div>
  );
};

const StatPreview = ({ label, value, icon, color }) => (
  <div className="glass rounded-3xl p-6 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 border border-white/50 card-hover group">
    <div className="text-3xl mb-4 grayscale group-hover:grayscale-0 transition-all duration-500">{icon}</div>
    <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">{label}</p>
    <p className={`text-3xl font-black ${color}`}>{value}</p>
  </div>
);

const FeatureCard = ({ icon, title, description }) => (
  <div className="glass rounded-[32px] p-8 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 border border-white/50 card-hover group">
    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
      {icon}
    </div>
    <h3 className="text-xl font-black text-slate-900 mb-4">{title}</h3>
    <p className="text-slate-500 leading-relaxed font-medium">{description}</p>
  </div>
);

const ProgressItem = ({ label, percentage }) => (
  <div className="group">
    <div className="flex justify-between mb-3 text-sm font-bold text-slate-400 group-hover:text-slate-900 transition-colors">
      <span>{label}</span>
      <span className="text-blue-600">{percentage}%</span>
    </div>
    <div className="w-full bg-slate-100 rounded-full h-2.5 p-0.5 overflow-hidden border border-white">
      <div
        className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(37,99,235,0.3)] shadow-inner"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
);

const TechBadge = ({ text }) => (
  <div className="px-5 py-2 bg-white rounded-xl text-slate-600 text-xs font-black uppercase tracking-widest border border-slate-100 shadow-sm hover:border-blue-200 transition-all">
    {text}
  </div>
);

export default Home;
