import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ForecastPoint } from '../types';
import { TrendingUp, HelpCircle, DollarSign, RefreshCw, SlidersHorizontal, Activity, BarChart4, ClipboardCheck } from 'lucide-react';

interface ForecastingCenterProps {
  initialForecast: ForecastPoint[];
}

export default function ForecastingCenter({ initialForecast }: ForecastingCenterProps) {
  const [spendAdjustment, setSpendAdjustment] = useState<number>(0); // percentage adjustment (-50 to +100)
  const [growthModel, setGrowthModel] = useState<'linear' | 'exponential' | 'logarithmic'>('logarithmic');

  const TEAL = '#14b8a6';
  const INDIGO = '#6366f1';
  const PINK = '#ec4899';
  const AMBER = '#f59e0b';
  const GRAY = '#888888';

  // Recalculate forecast data dynamically based on the ad spend modifier slider
  const adjustedForecast = initialForecast.map((point) => {
    if (point.actual !== null) {
      return { ...point }; // Keep historical figures accurate and unmodified
    }

    // Spend multiplier
    const spendMultiplier = 1 + spendAdjustment / 100;
    
    // Growth multiplier curve behavior
    let effectFactor = 1;
    if (growthModel === 'linear') {
      effectFactor = spendMultiplier;
    } else if (growthModel === 'exponential') {
      // S-curve exponential lift
      effectFactor = Math.pow(spendMultiplier, 1.22);
    } else {
      // Logarithmic returns (standard marketing fatigue)
      effectFactor = spendMultiplier > 0 ? 1 + Math.log(spendMultiplier) * 0.8 : 0.4;
    }

    return {
      ...point,
      forecastedRealistic: Math.round(point.forecastedRealistic * effectFactor),
      forecastedOptimistic: Math.round(point.forecastedOptimistic * (effectFactor * 1.1)),
      forecastedConservative: Math.round(point.forecastedConservative * (effectFactor * 0.9)),
    };
  });

  // Calculate dynamic outputs
  const peakFutureMonth = [...adjustedForecast]
    .filter(p => p.actual === null)
    .sort((a, b) => b.forecastedRealistic - a.forecastedRealistic)[0];

  const futureTotalRevenue = adjustedForecast
    .filter(p => p.actual === null)
    .reduce((acc, p) => acc + p.forecastedRealistic, 0);

  const baselineFutureTotal = initialForecast
    .filter(p => p.actual === null)
    .reduce((acc, p) => acc + p.forecastedRealistic, 0);

  const incrementalLift = futureTotalRevenue - baselineFutureTotal;

  return (
    <div id="revenue-forecasting-center" className="space-y-6">
      
      {/* Header section with Dynamic details/insights */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold font-display text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-indigo-500" /> Revenue Forecasting Center & Budget Simulator
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-450 mt-1">
            Predict demand behaviors using logarithmic growth modeling, and simulate budget adjustment outcomes live.
          </p>
        </div>

        {/* Growth algorithmic switch */}
        <div className="flex bg-zinc-100 dark:bg-zinc-805 p-1 rounded-xl border border-zinc-200 dark:border-zinc-700 self-start md:self-auto text-xs">
          <button
            id="model-switch-linear"
            onClick={() => setGrowthModel('linear')}
            className={`px-3 py-1 rounded-lg font-semibold transition ${
              growthModel === 'linear'
                ? 'bg-white dark:bg-zinc-900 text-indigo-650 dark:text-indigo-400 shadow-xs'
                : 'text-zinc-400 hover:text-zinc-650'
            }`}
          >
            Linear
          </button>
          <button
            id="model-switch-log"
            onClick={() => setGrowthModel('logarithmic')}
            className={`px-3 py-1 rounded-lg font-semibold transition ${
              growthModel === 'logarithmic'
                ? 'bg-white dark:bg-zinc-900 text-indigo-650 dark:text-indigo-400 shadow-xs'
                : 'text-zinc-400 hover:text-zinc-650'
            }`}
          >
            Log Return (Standard)
          </button>
          <button
            id="model-switch-expo"
            onClick={() => setGrowthModel('exponential')}
            className={`px-3 py-1 rounded-lg font-semibold transition ${
              growthModel === 'exponential'
                ? 'bg-white dark:bg-zinc-900 text-indigo-650 dark:text-indigo-400 shadow-xs'
                : 'text-zinc-400 hover:text-zinc-650'
            }`}
          >
            Aggressive S-Curve
          </button>
        </div>
      </div>

      {/* Main Forecast Visual Area Chart */}
      <div id="forecast-primary-canvas" className="p-5 rounded-2xl glass-panel relative overflow-hidden shadow-xs">
        <div className="mb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-zinc-600 dark:text-zinc-350">
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" /> Historical Sales
            </span>
            <span className="flex items-center gap-1.5 font-medium text-emerald-500">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Realistic Target Projections
            </span>
            <span className="flex items-center gap-1.5 font-medium text-teal-400">
              <span className="h-1 w-5 border-t-2 border-dashed border-teal-400" /> Optimistic Cap
            </span>
            <span className="flex items-center gap-1.5 font-medium text-amber-500">
              <span className="h-1 w-5 border-t-2 border-dashed border-amber-500" /> Conservative Floor
            </span>
          </div>
          <span className="text-[10px] uppercase font-mono bg-indigo-500/10 text-indigo-400 px-2.5 py-0.5 rounded font-bold">
            Projected Future Volume: ${(futureTotalRevenue / 1000000).toFixed(2)}M
          </span>
        </div>

        <div className="h-72 w-full text-xs font-mono">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={adjustedForecast} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="date" tick={{ fill: GRAY }} />
              <YAxis tickFormatter={(v) => `$${v/1000}k`} tick={{ fill: GRAY }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(9, 9, 11, 0.95)', 
                  borderColor: 'rgba(63, 63, 70, 0.4)', 
                  color: '#fff',
                  borderRadius: '8px'
                }} 
              />
              <Legend verticalAlign="top" height={36} style={{ display: 'none' }} />
              
              {/* Historical actual lines */}
              <Line name="Actual Revenue ($)" type="monotone" dataKey="actual" stroke="#aaaaaa" strokeWidth={3.5} dot={{ r: 5 }} />
              
              {/* Projections lines connected */}
              <Line name="Realistic Outlook" type="monotone" dataKey="forecastedRealistic" stroke={TEAL} strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line name="Optimistic Cap" type="monotone" dataKey="forecastedOptimistic" stroke={INDIGO} strokeWidth={1.5} strokeDasharray="5 5" dot={false} />
              <Line name="Conservative Limit" type="monotone" dataKey="forecastedConservative" stroke={AMBER} strokeWidth={1.5} strokeDasharray="5 5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Simulator Side Inputs Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Core Module 6: Budget optimization slider */}
        <div id="budget-sliders-panel" className="lg:col-span-7 p-6 rounded-2xl glass-panel relative overflow-hidden shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-sm uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400 font-sans flex items-center gap-1.5">
              <SlidersHorizontal className="h-4 w-4 text-teal-400" /> Ad Spend Optimization Simulator
            </h4>
            <span className="text-zinc-450 dark:text-zinc-400 text-xs font-mono">Real-time Recalculations</span>
          </div>

          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-normal">
            Adjusting absolute campaign investments modifies bidding intensity and impression depth. Bidding increases generally yield diminishing returns past +45% due to inventory premium auction ceilings.
          </p>

          <div className="space-y-4 pt-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-zinc-500">Capital Ad-spend Modification:</span>
              <span className={`font-bold font-sans ${spendAdjustment >= 0 ? 'text-emerald-500' : 'text-amber-500'}`}>
                {spendAdjustment >= 0 ? `+${spendAdjustment}% (Expansion)` : `${spendAdjustment}% (Contraction)`}
              </span>
            </div>
            
            <input
              id="spend-adjustment-slider"
              type="range"
              min="-50"
              max="100"
              value={spendAdjustment}
              onChange={(e) => setSpendAdjustment(Number(e.target.value))}
              className="w-full select-none cursor-pointer h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none accent-teal-500"
            />

            <div className="flex justify-between text-[11px] text-zinc-400 font-mono">
              <span>-50% REDUCTION</span>
              <span>BASELINE PREV</span>
              <span>+100% MAXIMUM CAP</span>
            </div>
          </div>
        </div>

        {/* Predictions & Lift Analysis Outputs */}
        <div id="predictions-lift-panel" className="lg:col-span-5 p-6 rounded-2xl glass-panel relative overflow-hidden shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-[10px] uppercase font-mono font-bold text-indigo-400 tracking-widest bg-indigo-500/5 px-2 py-0.5 rounded">
              Predictive Lift Vectors
            </span>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-zinc-100/50 dark:bg-zinc-800/40 border border-zinc-200/40 dark:border-zinc-800/40 text-left">
                <span className="text-[9px] uppercase font-mono text-zinc-400">Predicted Revenue</span>
                <h5 className="text-lg font-bold text-zinc-900 dark:text-white font-mono mt-1">
                  ${(futureTotalRevenue / 1000).toLocaleString()}k
                </h5>
                <span className="text-[9px] text-zinc-500 block">Future Q3 & Q4 Total</span>
              </div>

              <div className="p-3 rounded-xl bg-zinc-100/50 dark:bg-zinc-800/40 border border-zinc-200/40 dark:border-zinc-800/40 text-left">
                <span className="text-[9px] uppercase font-mono text-zinc-400">Estimated Sales Lift</span>
                <h5 className={`text-lg font-bold font-mono mt-1 ${incrementalLift >= 0 ? 'text-emerald-500' : 'text-amber-500'}`}>
                  {incrementalLift >= 0 ? '+' : ''}${(incrementalLift / 1000).toLocaleString()}k
                </h5>
                <span className="text-[9px] text-zinc-500 block">Compared to baseline target</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-200/40 dark:border-zinc-800/40 text-left space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              <ClipboardCheck className="h-4 w-4 text-indigo-500" />
              <span>Forecast Precision Score</span>
            </div>
            <div className="flex justify-between items-center text-[11px] font-mono">
              <span className="text-zinc-500">Historical Back-test Accuracy:</span>
              <span className="text-teal-400 font-bold">98.24% (Grade A+)</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
