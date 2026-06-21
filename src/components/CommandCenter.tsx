import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, DollarSign, Percent, Award, ShieldAlert, Sparkles, Target, Zap } from 'lucide-react';
import { Campaign } from '../types';

interface CommandCenterProps {
  campaigns: Campaign[];
  budgetLimit: number;
}

export default function CommandCenter({ campaigns, budgetLimit }: CommandCenterProps) {
  // Aggregate Key marketing statistics
  const totalSpend = campaigns.reduce((acc, c) => acc + c.spend, 0);
  const totalRevenue = campaigns.reduce((acc, c) => acc + c.revenue, 0);
  const totalConversions = campaigns.reduce((acc, c) => acc + c.conversions, 0);
  const totalLeads = campaigns.reduce((acc, c) => acc + c.leads, 0);
  const totalClicks = campaigns.reduce((acc, c) => acc + c.clicks, 0);

  const blendedRoi = ((totalRevenue - totalSpend) / totalSpend) * 100;
  const blendedRoas = totalRevenue / totalSpend;
  const blendedCac = totalSpend / totalConversions;
  const blendedConversionRate = (totalConversions / totalClicks) * 100;

  // Complex calculated health indices for enterprise boards
  // Marketing Efficiency Score = ROAS weighted by Conversion Rate (normalized out of 100)
  const efficiencyScore = Math.min(Math.round((blendedRoas / 10) * 100 * 0.7 + (blendedConversionRate / 3) * 100 * 0.3), 100);
  
  // Blended health score based on campaign healths weighted by their spend share
  const weightedHealthScore = Math.round(
    campaigns.reduce((acc, c) => acc + (c.healthScore * (c.spend / totalSpend || 1)), 0)
  );

  const kpis = [
    {
      id: 'cc-roi',
      label: 'Marketing ROI',
      value: `${blendedRoi.toFixed(1)}%`,
      desc: 'Net Return on Marketing Invest',
      subtext: '+24.2% vs Last Quarter',
      trend: 'up',
      icon: Percent,
      color: 'from-blue-600/10 to-indigo-600/5 text-blue-600 dark:text-blue-400 border-blue-500/20 dark:border-blue-500/10',
    },
    {
      id: 'cc-revenue',
      label: 'Revenue Generated',
      value: `$${totalRevenue.toLocaleString()}`,
      desc: 'Attributed Sales Revenue',
      subtext: `Target: $3.5M (78.3% Met)`,
      trend: 'up',
      icon: DollarSign,
      color: 'from-indigo-600/10 to-indigo-500/5 text-indigo-600 dark:text-indigo-400 border-indigo-500/20 dark:border-[#3b82f6]/10',
    },
    {
      id: 'cc-cac',
      label: 'Avg. CAC',
      value: `$${blendedCac.toFixed(2)}`,
      desc: 'Fully Blended Acquisition Spend',
      subtext: '⬇ $12.40 lower than baseline',
      trend: 'down',
      icon: Target,
      color: 'from-rose-600/10 to-orange-600/5 text-rose-600 dark:text-rose-400 border-rose-500/20 dark:border-rose-500/10',
    },
    {
      id: 'cc-health',
      label: 'Campaign Health',
      value: `${weightedHealthScore}/100`,
      desc: 'Optimized Ad Channel Matrix',
      subtext: 'Stable Operations',
      trend: 'up',
      icon: Zap,
      color: 'from-emerald-600/10 to-emerald-500/5 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 dark:border-emerald-500/10',
    },
  ];

  return (
    <div id="marketing-command-center" className="space-y-6">
      {/* Visual Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 font-display flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400 animate-pulse" /> Marketing Operations Command Center
          </h2>
          <p className="text-xs text-zinc-500 dark:text-slate-400 mt-1">
            Real-time portfolio metrics, ad channels deployment ratios, and pipeline efficiency parameters.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 text-[11px] font-mono flex items-center gap-2 text-slate-600 dark:text-slate-350">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            SYSTEM ONLINE: 10,046 ACTIVE BOOKINGS
          </div>
        </div>
      </div>

      {/* Main KPI Board */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              id={kpi.id}
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className={`p-6 rounded-2xl bg-gradient-to-br ${kpi.color} border shadow-sm relative overflow-hidden group hover:scale-[1.01] transition-transform duration-300`}
            >
              <div className="flex justify-between items-start gap-2">
                <div className="space-y-1">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-zinc-500 dark:text-zinc-400 block font-sans">
                    {kpi.label}
                  </span>
                  <h3 className="text-3xl font-bold text-zinc-950 dark:text-white font-display tracking-tight leading-none">
                    {kpi.value}
                  </h3>
                </div>
                <div className="p-2.5 rounded-xl bg-white/60 dark:bg-zinc-900/60 shadow-xs border border-zinc-200/50 dark:border-zinc-800/50">
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-zinc-200/40 dark:border-zinc-800/30 flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400">
                <span>{kpi.desc}</span>
                <span className={`font-medium flex items-center gap-0.5 ${
                  kpi.trend === 'up' 
                    ? 'text-emerald-600 dark:text-emerald-400' 
                    : 'text-amber-600 dark:text-amber-400'
                }`}>
                  {kpi.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {kpi.subtext}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Strategic Efficiency & Portfolio Health Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Marketing Efficiency Rating */}
        <div id="efficiency-panel" className="p-6 rounded-2xl bg-white dark:bg-slate-900/45 border border-slate-200/50 dark:border-white/5 relative overflow-hidden shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 font-sans">
                Marketing Efficiency Score
              </span>
              <span className="px-1.5 py-0.5 rounded-sm bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-mono">
                MES v2.4
              </span>
            </div>
            
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-5xl font-bold dark:text-white text-slate-950 font-display tracking-tight">
                {efficiencyScore}
              </span>
              <span className="text-sm text-slate-450 font-medium">/ 105</span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Calculates conversion velocity, CAC variance ratios, and spend-to-revenue efficiency. High score denotes premium capital retention.
            </p>
          </div>

          <div className="mt-6 space-y-2">
            <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-850 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${efficiencyScore}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-500"
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>CRITICAL</span>
              <span className="text-blue-400">OPTIMAL RANGE</span>
            </div>
          </div>
        </div>

        {/* Global Portfolio Health */}
        <div id="health-panel" className="p-6 rounded-2xl bg-white dark:bg-slate-900/45 border border-slate-200/50 dark:border-white/5 relative overflow-hidden shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 font-sans">
                Weighted Portfolio Health
              </span>
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-5xl font-bold dark:text-white text-slate-950 font-display tracking-tight">
                {weightedHealthScore}%
              </span>
              <span className="text-sm text-slate-500 font-semibold uppercase tracking-wider">
                Stable
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Aggregated safety score across all active and paused ad channels. Evaluates lead degradation, conversion churn, and ROAS slippage.
            </p>
          </div>

          <div className="mt-6 space-y-2">
            <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-850 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${weightedHealthScore}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-indigo-650"
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span className="text-amber-500">UNDERGUARDED</span>
              <span className="text-blue-400 font-semibold">PREMIUM (85+)</span>
            </div>
          </div>
        </div>

        {/* Board Capital Aligned */}
        <div id="budget-deployment-panel" className="p-6 rounded-2xl bg-white dark:bg-slate-900/45 border border-slate-200/50 dark:border-white/5 relative overflow-hidden shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 font-sans">
                Budget Allocation Aligned
              </span>
              <Sparkles className="h-4 w-4 text-blue-500" />
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-bold dark:text-white text-slate-950 font-display tracking-tight">
                ${(totalSpend / 1000).toFixed(0)}k
              </span>
              <span className="text-sm text-slate-500 font-medium">/ ${(budgetLimit / 1000).toFixed(0)}k Capital Allocation</span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Consolidated enterprise ad spend deployment. Safe headroom is maintained at 84% to withstand potential dynamic bidding volatility.
            </p>
          </div>

          <div className="mt-6 space-y-2">
            <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-850 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(totalSpend / budgetLimit) * 100}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-650"
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>{((totalSpend / budgetLimit) * 105).toFixed(1)}% DEPLOYED</span>
              <span>SAFE HEADROOM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
