import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Sparkles, 
  Users, 
  BarChart3, 
  TrendingUp, 
  Network, 
  FileText, 
  Sun, 
  Moon, 
  Compass, 
  UserPlus, 
  Maximize2,
  Lock,
  ChevronDown
} from 'lucide-react';

import { INITIAL_CAMPAIGNS, INITIAL_CHANNELS, ATTRIBUTION_COMPARISONS, FUNNEL_STAGES, CUSTOMER_JOURNEYS, REVENUE_FORECAST_DATA } from './data';
import CommandCenter from './components/CommandCenter';
import CampaignWrapped from './components/CampaignWrapped';
import PersonalityEngine from './components/PersonalityEngine';
import CampaignAnalytics from './components/CampaignAnalytics';
import AcquisitionIntelligence from './components/AcquisitionIntelligence';
import ForecastingCenter from './components/ForecastingCenter';
import AttributionEngine from './components/AttributionEngine';
import StrategistCopilot from './components/StrategistCopilot';
import ExecutiveReporting from './components/ExecutiveReporting';

export default function App() {
  const [activeModule, setActiveModule] = useState<string>('command');
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');
  const [showConfigAlert, setShowConfigAlert] = useState<boolean>(true);
  const [systemLogs, setSystemLogs] = useState<string[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Apply visual theme modes to HTML element
  useEffect(() => {
    const root = document.documentElement;
    if (themeMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [themeMode]);

  // Simulated live event stream for the executive dashboards
  useEffect(() => {
    const logs = [
      'Initialized core ledger databases... SECURED',
      'Loaded Mediterranean summer campaign CTR logs... INGESTED',
      'Attributed 4,500 leads to active Q2 social pipelines',
      'Demand predictor back-tested to 98.2% baseline accuracy',
    ];
    setSystemLogs(logs);

    const interval = setInterval(() => {
      const liveEvents = [
        `Ingested booking clickpath from user_${Math.floor(Math.random()*1000)} via Google Search.`,
        `Real-time adjustment parameters recalculated: ROAS holding at ${ (5.0 + Math.random() * 0.3).toFixed(2) }x.`,
        `Autonomous campaign bidding pipeline adjusted for Mediterranean Summer.`,
        `Scheduled delivery report generated for boardroom review.`
      ];
      setSystemLogs(prev => [liveEvents[Math.floor(Math.random()*liveEvents.length)], ...prev.slice(0, 5)]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const navigationItems = [
    { id: 'command', label: 'Command Center', icon: Zap, component: <CommandCenter campaigns={INITIAL_CAMPAIGNS} budgetLimit={1200000} /> },
    { id: 'wrapped', label: 'Campaign Wrapped', icon: Sparkles, component: <CampaignWrapped campaigns={INITIAL_CAMPAIGNS} /> },
    { id: 'profile', label: 'AI Personality Engine', icon: Compass, component: <PersonalityEngine campaigns={INITIAL_CAMPAIGNS} /> },
    { id: 'analytics', label: 'Campaign Analytics', icon: BarChart3, component: <CampaignAnalytics campaigns={INITIAL_CAMPAIGNS} funnelStages={FUNNEL_STAGES} /> },
    { id: 'pathways', label: 'Acquisition pathways', icon: Users, component: <AcquisitionIntelligence channels={INITIAL_CHANNELS} journeys={CUSTOMER_JOURNEYS} /> },
    { id: 'futures', label: 'Demand Projections', icon: TrendingUp, component: <ForecastingCenter initialForecast={REVENUE_FORECAST_DATA} /> },
    { id: 'attribution', label: 'Attribution Matrix', icon: Network, component: <AttributionEngine attributionComparisons={ATTRIBUTION_COMPARISONS} /> },
    { id: 'analyst', label: 'Copilot strategist', icon: Sparkles, component: <StrategistCopilot campaigns={INITIAL_CAMPAIGNS} channels={INITIAL_CHANNELS} /> },
    { id: 'reporting', label: 'Board Dossiers', icon: FileText, component: <ExecutiveReporting campaigns={INITIAL_CAMPAIGNS} channels={INITIAL_CHANNELS} /> },
  ];

  const currentComponent = navigationItems.find(item => item.id === activeModule)?.component || navigationItems[0].component;

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] font-sans selection:bg-blue-500/20 text-slate-800 dark:text-slate-200 transition-colors duration-300 relative pb-10">
      
      {/* Visual spotlights for premium executive aesthetic */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none" />
      <div className="absolute bottom-20 left-10 glow-spotlight-indigo pointer-events-none" />
      <div className="absolute top-1/2 right-10 glow-spotlight-indigo pointer-events-none" />

      {/* Global Information Alert for developer-secrets configuration verification */}
      {showConfigAlert && (
        <div id="cmo-config-alert" className="bg-slate-900 border-b border-white/10 text-white text-[11px] py-2.5 px-4 flex items-center justify-between text-left relative z-50">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-blue-600 text-white px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider text-[9px] shadow-[0_0_10px_rgba(37,99,235,0.4)]">
              SECRET CONTROL PANEL
            </span>
            <span className="text-slate-300">
              Connect your professional <strong className="text-white">GEMINI_API_KEY</strong> inside <strong className="text-white">Settings &gt; Secrets</strong> to activate unlimited deep boardroom generative analytics. Standard rule-based simulated CMO outputs are enabled natively.
            </span>
          </div>
          <button 
            id="dismiss-banner-btn"
            onClick={() => setShowConfigAlert(false)} 
            className="text-slate-450 hover:text-white text-xs font-bold font-sans ml-4 shrink-0 transition"
          >
            ✕ Dismiss
          </button>
        </div>
      )}

      {/* Primary High-Gloss Nav-Bar */}
      <header className="sticky top-0 z-45 backdrop-blur-md bg-white/80 dark:bg-[#020617]/80 border-b border-slate-200/50 dark:border-white/5 py-4 px-8 flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:scale-105 transition-transform duration-300">
            <svg className="w-5 h-5 text-white animate-spin" style={{ animationDuration: '30s' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div className="text-left">
            <h1 className="text-sm font-bold font-display uppercase tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              MarketingPilot AI <span className="text-[10px] font-mono font-bold text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/10">v1.2</span>
            </h1>
            <p className="text-[10px] text-slate-400 tracking-tight hidden sm:block">
              Executive Campaign Intelligence & Revenue Forecasting Suite
            </p>
          </div>
        </div>

        {/* Global actions and configurations */}
        <div className="flex items-center gap-3">
          
          {/* Theme switcher */}
          <button
            id="theme-toggler-btn"
            onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-850 text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-white/5 transition"
            title="Toggle theme mode"
          >
            {themeMode === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-[10px] font-mono font-bold rounded-lg uppercase tracking-wider">
            <Lock className="h-3 w-3" /> SECURED CONTAINER
          </span>
        </div>
      </header>

      {/* Main Structural Layout Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Vertical Directory (Sidebar for Desktop, Dropdown select for Mobile) */}
          <nav className="lg:col-span-3 space-y-4">
            
            {/* Mobile Navigation Dropdown Select */}
            <div className="block lg:hidden relative">
              <button
                id="mobile-nav-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#09090B] border border-slate-200 dark:border-white/5 flex justify-between items-center text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-sm"
              >
                <span className="flex items-center gap-2">
                  {React.createElement(navigationItems.find(n => n.id === activeModule)?.icon || Zap, { className: "h-4.5 w-4.5 text-blue-500" })}
                  {navigationItems.find(n => n.id === activeModule)?.label}
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {mobileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute w-full mt-1.5 rounded-xl bg-white dark:bg-[#09090B] border border-slate-200 dark:border-white/5 shadow-xl overflow-hidden z-20 text-left"
                  >
                    <div className="p-1 divide-y divide-slate-100 dark:divide-white/5">
                      {navigationItems.map((item) => {
                        const IconComponent = item.icon;
                        return (
                          <button
                            id={`mobile-nav-${item.id}`}
                            key={item.id}
                            onClick={() => {
                              setActiveModule(item.id);
                              setMobileMenuOpen(false);
                            }}
                            className={`w-full px-3.5 py-2.5 text-xs font-medium flex items-center gap-2.5 rounded-lg transition ${
                              activeModule === item.id
                                ? 'bg-blue-600/10 text-blue-500 dark:text-blue-400 font-semibold'
                                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/40'
                            }`}
                          >
                            <IconComponent className="h-4 w-4" />
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop Navigation Vertical Stack to replicate <aside> layout */}
            <div className="hidden lg:flex flex-col gap-1 p-5 rounded-2xl bg-white dark:bg-[#09090B] border border-slate-200/50 dark:border-white/5 relative overflow-hidden shadow-xs">
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-500 uppercase font-bold tracking-widest py-1.5 pl-2 block text-left">
                Intelligence
              </span>
              
              {navigationItems.slice(0, 5).map((item) => {
                const IconComponent = item.icon;
                const isSelected = activeModule === item.id;
                return (
                  <button
                    id={`nav-link-${item.id}`}
                    key={item.id}
                    onClick={() => setActiveModule(item.id)}
                    className={`w-full px-3 py-2.5 rounded-lg text-xs font-medium flex items-center gap-3 transition-all text-left font-sans ${
                      isSelected
                        ? 'bg-blue-600/10 text-blue-600 dark:text-blue-400 font-bold border border-blue-600/15 dark:border-blue-600/20 shadow-[0_0_15px_rgba(37,99,235,0.15)] relative'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-900/40 border border-transparent transition-colors'
                    }`}
                  >
                    <IconComponent className={`h-4.5 w-4.5 shrink-0 ${isSelected ? 'text-blue-500 dark:text-blue-400' : 'text-slate-450 dark:text-slate-500'}`} />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}

              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-500 uppercase font-bold tracking-widest pt-6 pb-1.5 pl-2 block text-left">
                Strategy
              </span>

              {navigationItems.slice(5).map((item) => {
                const IconComponent = item.icon;
                const isSelected = activeModule === item.id;
                return (
                  <button
                    id={`nav-link-${item.id}`}
                    key={item.id}
                    onClick={() => setActiveModule(item.id)}
                    className={`w-full px-3 py-2.5 rounded-lg text-xs font-medium flex items-center gap-3 transition-all text-left font-sans ${
                      isSelected
                        ? 'bg-blue-600/10 text-blue-600 dark:text-blue-400 font-bold border border-blue-600/15 dark:border-blue-600/20 shadow-[0_0_15px_rgba(37,99,235,0.15)] relative'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-900/40 border border-transparent transition-colors'
                    }`}
                  >
                    <IconComponent className={`h-4.5 w-4.5 shrink-0 ${isSelected ? 'text-blue-500 dark:text-blue-400' : 'text-slate-450 dark:text-slate-500'}`} />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}

              {/* AI Copilot Status panel inside Sidebar */}
              <div className="mt-8 pt-4 border-t border-slate-100 dark:border-white/5">
                <div className="p-4 bg-slate-900/5 dark:bg-slate-900/50 rounded-xl border border-slate-200/50 dark:border-white/5 text-left">
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">AI Copilot Status</div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">Ready to Optimize</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Real-Time Activity Log Card (Only on screens with space available) */}
            <div id="live-activity-panel" className="hidden lg:block p-4 rounded-2xl bg-white dark:bg-[#09090B] border border-slate-200/50 dark:border-white/5 text-left space-y-3">
              <div className="flex justify-between items-center text-[10px] uppercase font-mono tracking-wider font-semibold text-slate-400">
                <span>Enterprise telemetry</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </div>
              <div className="h-32 overflow-y-auto space-y-2 pr-1 select-none font-mono text-[9px] text-zinc-500 dark:text-slate-400 leading-normal scrollbar-none">
                {systemLogs.map((log, idx) => (
                  <div key={idx} className="border-b border-zinc-200/10 dark:border-white/5 pb-1.5 last:border-0">
                    <span className="text-blue-500 dark:text-blue-400">»</span> {log}
                  </div>
                ))}
              </div>
            </div>
          </nav>

          {/* Right Major Content Display viewport */}
          <main className="lg:col-span-9 min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {currentComponent}
              </motion.div>
            </AnimatePresence>
          </main>

        </div>
      </div>
    </div>
  );
}
