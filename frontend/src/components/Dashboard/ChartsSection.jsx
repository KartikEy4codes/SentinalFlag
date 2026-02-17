import React from 'react';

const ChartsSection = ({ stats }) => {
    // Mock data for rollout distribution
    const rolloutData = [
        { label: '0%', count: 12, color: '#94a3b8' },
        { label: '10-25%', count: 8, color: '#60a5fa' },
        { label: '50%', count: 15, color: '#818cf8' },
        { label: '100%', count: 24, color: '#34d399' },
    ];

    const envData = [
        { label: 'Dev', count: 45, color: '#60a5fa' },
        { label: 'Staging', count: 25, color: '#f59e0b' },
        { label: 'Prod', count: 30, color: '#ef4444' },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Rollout Distribution Chart (Simple Bar Chart) */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
                    Rollout Distribution
                </h3>
                <div className="flex items-end justify-between h-48 gap-4 px-2">
                    {rolloutData.map((item) => {
                        const height = (item.count / 30) * 100;
                        return (
                            <div key={item.label} className="flex-1 flex flex-col items-center group">
                                <div
                                    className="w-full rounded-t-lg transition-all duration-500 relative group-hover:brightness-110"
                                    style={{
                                        height: `${height}%`,
                                        backgroundColor: item.color,
                                        boxShadow: `0 4px 12px ${item.color}33`
                                    }}
                                >
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        {item.count} flags
                                    </div>
                                </div>
                                <span className="text-xs font-semibold text-slate-400 mt-4">{item.label}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Environment Breakdown (Simplified Pie Chart/Donut Progress) */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-purple-500 rounded-full" />
                    Environment Allocation
                </h3>
                <div className="flex items-center justify-around h-48">
                    <div className="space-y-4 flex-1">
                        {envData.map((item) => (
                            <div key={item.label}>
                                <div className="flex justify-between text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                                    <span>{item.label}</span>
                                    <span>{item.count}%</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-1000"
                                        style={{ width: `${item.count}%`, backgroundColor: item.color }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                        <div className="relative w-32 h-32">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="64" cy="64" r="58" stroke="#f1f5f9" strokeWidth="8" fill="transparent" />
                                <circle
                                    cx="64" cy="64" r="58"
                                    stroke="#818cf8" strokeWidth="8"
                                    fill="transparent"
                                    strokeDasharray="364.4"
                                    strokeDashoffset="100"
                                    strokeLinecap="round"
                                    className="transition-all duration-1000"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-2xl font-black text-slate-800">100</span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Flags</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChartsSection;
