import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { AttributionModelComparison } from '../types';
import { Network, HelpCircle, RefreshCw, Layers, DollarSign, ArrowUpRight, GitFork } from 'lucide-react';

interface AttributionEngineProps {
  attributionComparisons: AttributionModelComparison[];
}

export default function AttributionEngine({ attributionComparisons }: AttributionEngineProps) {
  const [metricMode, setMetricMode] = useState<'percent' | 'revenue'>('percent');

  const TEAL = '#14b8a6';
  const INDIGO = '#6366f1';
  const PINK = '#ec4899';
  const GRAY = '#888888';

  // Format dataset dynamically based on toggled metricMode
  const chartData = attributionComparisons.map(item => ({
    channel: item.channel,
    'First Touch': metricMode === 'percent' ? item.firstTouch : item.revenueAttributed.firstTouch,
    'Last Touch': metricMode === 'percent' ? item.lastTouch : item.revenueAttributed.lastTouch,
    'Multi-Touch': metricMode === 'percent' ? item.multiTouch : item.revenueAttributed.multiTouch,
  }));

  // Total attributed values
  const totalFirstTouchRevenue = attributionComparisons.reduce((acc, c) => acc + c.revenueAttributed.firstTouch, 0);

  return (
    <div id="marketing-attribution-engine" className="space-y-6">
      
      {/* Header element */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold font-display text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Network className="h-5 w-5 text-teal-400" /> Multi-Channel Attribution Engine
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Compare First Touch (demand creation), Last Touch (checkout closures), and strategic Multi-Touch models.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl border border-zinc-200 dark:border-zinc-700 self-start sm:self-auto text-xs font-semibold">
          <button
            id="attr-toggle-pct"
            onClick={() => setMetricMode('percent')}
            className={`px-3 py-1.5 rounded-lg transition ${
              metricMode === 'percent'
                ? 'bg-white dark:bg-zinc-900 text-teal-650 dark:text-teal-400 shadow-sm'
                : 'text-zinc-450 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}
          >
            Attribution Weight (%)
          </button>
          <button
            id="attr-toggle-rev"
            onClick={() => setMetricMode('revenue')}
            className={`px-3 py-1.5 rounded-lg transition ${
              metricMode === 'revenue'
                ? 'bg-white dark:bg-zinc-900 text-teal-650 dark:text-teal-400 shadow-sm'
                : 'text-zinc-450 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}
          >
            Attributed Revenue ($)
          </button>
        </div>
      </div>

      {/* Main Bar Chart Comparison */}
      <div id="attribution-primary-chart" className="p-5 rounded-2xl glass-panel relative overflow-hidden shadow-xs">
        <div className="h-80 w-full text-xs font-mono font-medium">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="channel" tick={{ fill: GRAY }} />
              <YAxis 
                tickFormatter={(v) => metricMode === 'percent' ? `${v}%` : `$${v/1000}k`} 
                tick={{ fill: GRAY }} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(9, 9, 11, 0.95)', 
                  borderColor: 'rgba(63, 63, 70, 0.4)', 
                  color: '#fff',
                  borderRadius: '8px'
                }} 
              />
              <Legend iconType="circle" />
              <Bar name="First Touch (Audience Creator)" dataKey="First Touch" fill={INDIGO} radius={[4, 4, 0, 0]} />
              <Bar name="Last Touch (Cart Closer)" dataKey="Last Touch" fill={TEAL} radius={[4, 4, 0, 0]} />
              <Bar name="Linear Multi-Touch Weights" dataKey="Multi-Touch" fill={PINK} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Deep Dive Grid Card Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Attribution Insight Card 1: First Touch bias */}
        <div id="first-touch-info" className="p-5 rounded-2xl glass-panel text-left space-y-3 shadow-xs">
          <span className="text-[10px] uppercase font-mono font-bold text-indigo-400 bg-indigo-500/5 px-2.5 py-0.5 rounded">
            Creation Focus
          </span>
          <h4 className="text-sm font-bold text-zinc-950 dark:text-zinc-100 flex items-center gap-1.5">
            First-Touch Model Catalyst
          </h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Credits 100% of purchase reward to the initial channel clicked. Your metrics highlight that **Paid Social (Meta)** dominates first-touch models (**35%** vs last touch **22%**), proving its status as the supreme corporate audience generator.
          </p>
        </div>

        {/* Attribution Insight Card 2: Last Touch bias */}
        <div id="last-touch-info" className="p-5 rounded-2xl glass-panel text-left space-y-3 shadow-xs">
          <span className="text-[10px] uppercase font-mono font-bold text-teal-400 bg-teal-500/5 px-2.5 py-0.5 rounded">
            Checkout Closer
          </span>
          <h4 className="text-sm font-bold text-zinc-950 dark:text-zinc-100 flex items-center gap-1.5">
            Last-Touch Model Catalyst
          </h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Credits reward to the final link clicked immediately before payment checkout. Pre-eminently dominated by **Google Search** (**45%** vs first touch **30%**). Demonstrates that users create demand elsewhere and use search to convert.
          </p>
        </div>

        {/* Attribution Insight Card 3: Multi-Touch Linear */}
        <div id="multi-touch-info" className="p-5 rounded-2xl glass-panel text-left space-y-3 shadow-xs">
          <span className="text-[10px] uppercase font-mono font-bold text-pink-400 bg-pink-500/5 px-2.5 py-0.5 rounded">
            Blended Equity
          </span>
          <h4 className="text-sm font-bold text-zinc-950 dark:text-zinc-100 flex items-center gap-1.5">
            W-Shaped & Linear Core Hybrid
          </h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Distributes conversion credits proportionally across every pathway. Recommended for global enterprises, protecting against under-funding initial channels (socials/native ad) which build early intent pipelines.
          </p>
        </div>

      </div>
    </div>
  );
}
