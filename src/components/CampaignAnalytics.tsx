import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Campaign, FunnelStage } from '../types';
import { BarChart3, PieChartIcon, AlignJustify, ArrowLeftRight, CheckCircle2, AlertTriangle, PlayCircle, Layers, Award } from 'lucide-react';

interface CampaignAnalyticsProps {
  campaigns: Campaign[];
  funnelStages: FunnelStage[];
}

export default function CampaignAnalytics({ campaigns, funnelStages }: CampaignAnalyticsProps) {
  const [activeChartTab, setActiveChartTab] = useState<'roi' | 'leads' | 'funnel'>('roi');
  const [compareCampA, setCompareCampA] = useState<string>('camp-01');
  const [compareCampB, setCompareCampB] = useState<string>('camp-02');

  const campA = campaigns.find(c => c.id === compareCampA) || campaigns[0];
  const campB = campaigns.find(c => c.id === compareCampB) || campaigns[1];

  // Colors for charts
  const TEAL = '#3b82f6'; // Professional Sapphire Blue
  const INDIGO = '#6366f1';
  const PINK = '#ec4899';
  const AMBER = '#f59e0b';
  const GRAY = '#888888';

  // Format dataset for ROI chart
  const roiChartData = campaigns.map(c => ({
    name: c.name.length > 20 ? c.name.slice(0, 18) + '...' : c.name,
    ROI: Math.round(c.roi),
    Spend: c.spend,
    Revenue: c.revenue,
    ROAS: c.roas,
  }));

  // Format dataset for Lead Churn vs conversion
  const leadConvData = campaigns.map(c => ({
    name: c.name.length > 20 ? c.name.slice(0, 18) + '...' : c.name,
    Leads: c.leads,
    Bookings: c.conversions,
    Spend: c.spend
  }));

  // Funnel chart data adaptation
  const funnelChartData = funnelStages.map(s => ({
    stage: s.stage,
    count: s.count,
    cost: Math.round(s.count * s.costPerStage),
  }));

  return (
    <div id="campaign-analytics-center" className="space-y-6">
      
      {/* Top Controller Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold font-display text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" /> Campaign Analytics & Visual Leadership
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Evaluate ROI vectors, lead generation velocity, and run side-by-side campaign comparisons.
          </p>
        </div>

        {/* Chart View Selector */}
        <div className="flex bg-slate-50 dark:bg-[#0c0c0e] p-1 rounded-xl border border-slate-200/50 dark:border-white/5 self-start sm:self-auto">
          <button
            id="tab-chart-roi"
            onClick={() => setActiveChartTab('roi')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeChartTab === 'roi'
                ? 'bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 shadow-sm border border-zinc-200 dark:border-zinc-800'
                : 'text-zinc-550 hover:text-zinc-750 dark:hover:text-zinc-300'
            }`}
          >
            ROI & Revenue Vector
          </button>
          <button
            id="tab-chart-leads"
            onClick={() => setActiveChartTab('leads')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeChartTab === 'leads'
                ? 'bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 shadow-sm border border-zinc-200 dark:border-zinc-800'
                : 'text-zinc-550 hover:text-zinc-750 dark:hover:text-zinc-300'
            }`}
          >
            Leads vs Bookings
          </button>
          <button
            id="tab-chart-funnel"
            onClick={() => setActiveChartTab('funnel')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeChartTab === 'funnel'
                ? 'bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 shadow-sm border border-zinc-200 dark:border-zinc-800'
                : 'text-zinc-550 hover:text-zinc-750 dark:hover:text-zinc-300'
            }`}
          >
            Pipeline Funnel Stages
          </button>
        </div>
      </div>

      {/* Primary Analytics Visualization Canvas */}
      <div id="analytics-canvas-box" className="p-5 rounded-2xl glass-panel relative overflow-hidden shadow-xs">
        
        {/* Render Active Chart selection */}
        <div className="h-80 w-full text-xs font-mono font-medium">
          {activeChartTab === 'roi' && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={roiChartData} margin={{ top: 20, right: 10, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={TEAL} stopOpacity={0.4}/>
                    <stop offset="95%" stopColor={TEAL} stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={INDIGO} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={INDIGO} stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="name" tick={{ fill: GRAY }} />
                <YAxis yAxisId="left" tickFormatter={(v) => `$${v/1000}k`} tick={{ fill: GRAY }} />
                <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `${v}%`} tick={{ fill: GRAY }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(9, 9, 11, 0.95)', 
                    borderColor: 'rgba(63, 63, 70, 0.4)', 
                    color: '#fff',
                    borderRadius: '8px'
                  }} 
                />
                <Legend iconType="circle" />
                <Area yAxisId="left" name="Revenue Earned ($)" type="monotone" dataKey="Revenue" stroke={TEAL} fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} />
                <Area yAxisId="left" name="Capital Invested ($)" type="monotone" dataKey="Spend" stroke={INDIGO} fillOpacity={1} fill="url(#colorSpend)" strokeWidth={1} />
                <Line yAxisId="right" name="ROI percentage" type="monotone" dataKey="ROI" stroke={PINK} strokeWidth={2.5} activeDot={{ r: 8 }} />
              </AreaChart>
            </ResponsiveContainer>
          )}

          {activeChartTab === 'leads' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leadConvData} margin={{ top: 20, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="name" tick={{ fill: GRAY }} />
                <YAxis yAxisId="left" tick={{ fill: GRAY }} label={{ value: 'Leads Generated', angle: -90, position: 'insideLeft', offset: 0 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: GRAY }} label={{ value: 'Booked Depositors', angle: 90, position: 'insideRight', offset: 0 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(9, 9, 11, 0.95)', 
                    borderColor: 'rgba(63, 63, 70, 0.4)', 
                    color: '#fff',
                    borderRadius: '8px'
                  }} 
                />
                <Legend iconType="square" />
                <Bar yAxisId="left" name="Total Inquiring Leads" dataKey="Leads" fill={INDIGO} radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" name="Completed Holiday Bookings" dataKey="Bookings" fill={TEAL} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}

          {activeChartTab === 'funnel' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={funnelChartData} margin={{ top: 20, right: 30, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis type="number" tickFormatter={(v) => v >= 1000000 ? `${v/1000000}M` : `${v/1000}k`} tick={{ fill: GRAY }} />
                <YAxis type="category" dataKey="stage" tick={{ fill: GRAY }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(9, 9, 11, 0.95)', 
                    borderColor: 'rgba(63, 63, 70, 0.4)', 
                    color: '#fff',
                    borderRadius: '8px'
                  }} 
                />
                <Legend iconType="circle" />
                <Bar name="Audience Stage Depth (Users)" dataKey="count" fill="url(#colorSpendGrad)" radius={[0, 4, 4, 0]}>
                  {funnelChartData.map((entry, index) => {
                    const colors = [INDIGO, TEAL, PINK, AMBER, '#10b981'];
                    return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Core Module 4: Campaign Side-by-Side Comparison Tool */}
      <div id="campaign-comparison-panel" className="p-6 rounded-2xl glass-panel relative overflow-hidden shadow-xs space-y-4">
        <h4 className="text-sm uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400 font-sans flex items-center gap-2">
          <ArrowLeftRight className="h-4 w-4 text-indigo-500" /> Executive Side-by-Side Comparison Matrix
        </h4>

        {/* Dropdown selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-semibold text-zinc-450 dark:text-zinc-500 font-mono">Benchmark Campaign A</label>
            <select
              id="camp-select-a"
              value={compareCampA}
              onChange={(e) => setCompareCampA(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs text-zinc-850 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {campaigns.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-semibold text-zinc-450 dark:text-zinc-500 font-mono">Contender Campaign B</label>
            <select
              id="camp-select-b"
              value={compareCampB}
              onChange={(e) => setCompareCampB(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs text-zinc-850 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {campaigns.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison grid of specific key outputs */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
          {/* ROI Metric */}
          <div className="p-3 bg-zinc-100/50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200/40 dark:border-zinc-800/50 flex flex-col justify-between text-center">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Return (ROI)</span>
            <div className="flex justify-around items-baseline mt-1 space-x-1">
              <div>
                <span className="text-xs font-mono text-zinc-400">A:</span>
                <span className="text-sm font-semibold text-zinc-900 dark:text-white ml-0.5">{campA.roi.toFixed(0)}%</span>
              </div>
              <span className="text-[10px] text-zinc-400">vs</span>
              <div>
                <span className="text-xs font-mono text-zinc-400">B:</span>
                <span className="text-sm font-semibold text-teal-400 ml-0.5">{campB.roi.toFixed(0)}%</span>
              </div>
            </div>
            <span className={`text-[9px] font-bold mt-1.5 ${campB.roi > campA.roi ? 'text-emerald-500' : 'text-amber-500'}`}>
              {campB.roi > campA.roi ? `B is +${(campB.roi - campA.roi).toFixed(0)}% higher` : `A leads by ${(campA.roi - campB.roi).toFixed(0)}%`}
            </span>
          </div>

          {/* Unit CAC Metric */}
          <div className="p-3 bg-zinc-100/50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200/40 dark:border-zinc-800/50 flex flex-col justify-between text-center">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Unit CAC</span>
            <div className="flex justify-around items-baseline mt-1 space-x-1">
              <div>
                <span className="text-xs font-mono text-zinc-400">A:</span>
                <span className="text-sm font-semibold text-zinc-900 dark:text-white ml-0.5">${campA.cac.toFixed(0)}</span>
              </div>
              <span className="text-[10px] text-zinc-400">vs</span>
              <div>
                <span className="text-xs font-mono text-zinc-400">B:</span>
                <span className="text-sm font-semibold text-indigo-400 ml-0.5">${campB.cac.toFixed(0)}</span>
              </div>
            </div>
            <span className={`text-[9px] font-bold mt-1.5 ${campB.cac < campA.cac ? 'text-emerald-500' : 'text-amber-500'}`}>
              {campB.cac < campA.cac ? `B saves $${(campA.cac - campB.cac).toFixed(0)} per acquisition` : `A has lower CAC by $${(campB.cac - campA.cac).toFixed(0)}`}
            </span>
          </div>

          {/* Ad Spend Metric */}
          <div className="p-3 bg-zinc-100/50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200/40 dark:border-zinc-800/50 flex flex-col justify-between text-center">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Ad Spend</span>
            <div className="flex justify-around items-baseline mt-1 space-x-1">
              <div>
                <span className="text-xs font-mono text-zinc-400">A:</span>
                <span className="text-sm font-semibold text-zinc-900 dark:text-white ml-0.5">${(campA.spend / 1000).toFixed(0)}k</span>
              </div>
              <span className="text-[10px] text-zinc-400">vs</span>
              <div>
                <span className="text-xs font-mono text-zinc-400">B:</span>
                <span className="text-sm font-semibold text-teal-400 ml-0.5">${(campB.spend / 1000).toFixed(0)}k</span>
              </div>
            </div>
            <span className="text-[9px] text-zinc-400 mt-1.5">
              Budget Diff: ${(Math.abs(campA.budget - campB.budget)/1000).toFixed(0)}k
            </span>
          </div>

          {/* Conversions Metric */}
          <div className="p-3 bg-zinc-100/50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200/40 dark:border-zinc-800/50 flex flex-col justify-between text-center">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Conversions</span>
            <div className="flex justify-around items-baseline mt-1 space-x-1">
              <div>
                <span className="text-xs font-mono text-zinc-400">A:</span>
                <span className="text-sm font-semibold text-zinc-900 dark:text-white ml-0.5">{campA.conversions}</span>
              </div>
              <span className="text-[10px] text-zinc-400">vs</span>
              <div>
                <span className="text-xs font-mono text-zinc-400">B:</span>
                <span className="text-sm font-semibold text-purple-400 ml-0.5">{campB.conversions}</span>
              </div>
            </div>
            <span className="text-[9px] text-zinc-400 font-bold mt-1.5">
              Net difference: {Math.abs(campA.conversions - campB.conversions)}
            </span>
          </div>

          {/* Conversions Performance Rate */}
          <div className="p-3 bg-zinc-100/50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200/40 dark:border-zinc-800/50 flex flex-col justify-between text-center">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Conversion %</span>
            <div className="flex justify-around items-baseline mt-1 space-x-1">
              <div>
                <span className="text-xs font-mono text-zinc-400">A:</span>
                <span className="text-sm font-semibold text-zinc-900 dark:text-white ml-0.5">{campA.conversionRate}%</span>
              </div>
              <span className="text-[10px] text-zinc-400">vs</span>
              <div>
                <span className="text-xs font-mono text-zinc-400">B:</span>
                <span className="text-sm font-semibold text-pink-400 ml-0.5">{campB.conversionRate}%</span>
              </div>
            </div>
            <span className="text-[9px] text-zinc-400 mt-1.5">
              Diff: {Math.abs(campA.conversionRate - campB.conversionRate).toFixed(2)}% pts
            </span>
          </div>
        </div>
      </div>

      {/* Core Module 4: Campaign Leaderboard */}
      <div id="campaign-leaderboard-panel" className="p-6 rounded-2xl glass-panel relative overflow-hidden shadow-xs space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-sm uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400 font-sans flex items-center gap-2">
            <Award className="h-4 w-4 text-teal-500 animate-spin" style={{ animationDuration: '6s' }} /> Executive Portfolio Leaderboard
          </h4>
          <span className="text-[10px] font-mono text-zinc-400">7 Active Campaigns</span>
        </div>

        <div className="overflow-x-auto">
          <table id="campaign-leaderboard-table" className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 text-[10px] uppercase font-mono text-zinc-400">
                <th className="py-2 pb-3 font-semibold">Campaign Name</th>
                <th className="py-2 pb-3 font-semibold text-center">Status</th>
                <th className="py-2 pb-3 font-semibold text-right">Spend</th>
                <th className="py-2 pb-3 font-semibold text-right">Revenue</th>
                <th className="py-2 pb-3 font-semibold text-center">ROAS</th>
                <th className="py-2 pb-3 font-semibold text-center hidden md:table-cell">Audience Segment</th>
                <th className="py-2 pb-3 font-semibold text-right">Health Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-250/40 dark:divide-zinc-800/40 font-sans">
              {campaigns.map((c, i) => (
                <tr key={c.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850/40 transition-colors">
                  <td className="py-3 font-semibold text-zinc-900 dark:text-zinc-150 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-500" /> {c.name}
                  </td>
                  <td className="py-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider ${
                      c.status === 'active' 
                        ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' 
                        : c.status === 'paused'
                        ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                        : 'bg-zinc-300 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3 text-right font-mono">${c.spend.toLocaleString()}</td>
                  <td className="py-3 text-right font-mono text-zinc-950 dark:text-zinc-100">${c.revenue.toLocaleString()}</td>
                  <td className="py-3 text-center font-mono font-bold text-blue-600 dark:text-blue-400">{c.roas}x</td>
                  <td className="py-3 text-center text-zinc-500 dark:text-zinc-400 hidden md:table-cell">{c.audience}</td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className="font-mono font-semibold">{c.healthScore}</span>
                      <div className="w-12 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                        <div 
                          className={`h-full ${
                            c.healthScore >= 90 
                              ? 'bg-emerald-500' 
                              : c.healthScore >= 75 
                              ? 'bg-indigo-500' 
                              : 'bg-amber-500'
                          }`}
                          style={{ width: `${c.healthScore}%` }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
