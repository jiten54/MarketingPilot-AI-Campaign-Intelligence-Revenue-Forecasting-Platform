import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, UserCheck, Sparkles, Award, Quote, HelpCircle, RefreshCw, Send, Image, Download, Share2 } from 'lucide-react';
import { Campaign } from '../types';

interface PersonalityEngineProps {
  campaigns: Campaign[];
}

interface PersonalityProfile {
  personality: string;
  tagline: string;
  governingTraits: string[];
  cmorating: string;
  boardroomQuote: string;
  narrative: string;
}

const PRESET_PROFILES: Record<string, PersonalityProfile> = {
  'Revenue Accelerator': {
    personality: 'Revenue Accelerator',
    tagline: 'High-velocity campaigns mapped to maximize direct booking revenue per click.',
    governingTraits: ['High-Velocity Pipeline', 'Immediate Profit Focus', 'Aggressive Programmatic Bid'],
    cmorating: 'A +',
    boardroomQuote: 'We do not chase vanity engagement. Every allocation is a scientific pipeline engineered to secure premium high-net bookings.',
    narrative: 'This posture shows extreme capacity in scaling bottom-of-funnel conversion. By placing substantial support behind direct search and email newsletters, marketing capital is extracted at maximum return, raising the company’s absolute liquidity.'
  },
  'Customer Magnet': {
    personality: 'Customer Magnet',
    tagline: 'Deep client retention coupled with low-cost first-touch relationship marketing.',
    governingTraits: ['Stellar Organic Appeal', 'Elite Past-Guest Retargeting', 'Ultra-Low CAC Ratio'],
    cmorating: 'A',
    boardroomQuote: 'The highest efficiency marketing relies on loyalty. Our previous guests are our greatest champions, creating self-sustaining loops.',
    narrative: 'Nurtures long-term subscriber bases. Your newsletter systems generate a staggering 7.01x ROAS, representing an elite loyalty moat that buffers your margins against competitive search engine bid inflation.'
  },
  'Brand Builder': {
    personality: 'Brand Builder',
    tagline: 'Immersive storytelling designed to establish lasting high-net-worth authority.',
    governingTraits: ['Cinema-Grade Video Capture', 'High Impressions Footprint', 'Strategic Multi-Touch Nurturing'],
    cmorating: 'B +',
    boardroomQuote: 'A customer who books on price is instantly lost to price. A customer booked on story is a customer for three generations.',
    narrative: 'Prioritizes high-intent long-range planning. Programmatic native ads paired with YouTube resorts tours create an initial luxury impression, raising average order sizes and establishing key emotional connections before booking.'
  },
  'Growth Hacker': {
    personality: 'Growth Hacker',
    tagline: 'Hyper-responsive campaign triggers exploiting micro-trends across emerging channels.',
    governingTraits: ['Agile TikTok Deployment', 'High CTR Optimization', 'Rapid-Iterate Creative Sourcing'],
    cmorating: 'A -',
    boardroomQuote: 'Our playbook changes with the feed. We capture attention at the absolute lowest cost and route it into conversion paths instantly.',
    narrative: 'Shows significant tactical flexibility on emerging platforms. Led by viral Gen-Z discovery links, this profile minimizes creative cost overhead and captures early organic momentum with premium ad layouts.'
  }
};

export default function PersonalityEngine({ campaigns }: PersonalityEngineProps) {
  const [selectedStyle, setSelectedStyle] = useState<string>('Revenue Accelerator');
  const [loading, setLoading] = useState<boolean>(false);
  const [customProfile, setCustomProfile] = useState<PersonalityProfile | null>(null);
  const [copiedStatus, setCopiedStatus] = useState<string | null>(null);

  // Auto calculate average stats to send for AI assessment
  const totalSpend = campaigns.reduce((acc, c) => acc + c.spend, 0);
  const totalRevenue = campaigns.reduce((acc, c) => acc + c.revenue, 0);
  const roas = totalRevenue / totalSpend;

  const activeProfile = customProfile || PRESET_PROFILES[selectedStyle] || PRESET_PROFILES['Revenue Accelerator'];

  const triggerAIEvaluation = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/personality', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metrics: {
            roas: roas.toFixed(2),
            campaignCount: campaigns.length,
            spend: totalSpend,
            revenue: totalRevenue
          }
        })
      });
      if (response.ok) {
        const data = await response.json();
        setCustomProfile(data);
      }
    } catch (err) {
      console.error('Failed to construct custom AI Marketing profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePresetSelect = (presetName: string) => {
    setCustomProfile(null);
    setSelectedStyle(presetName);
  };

  const triggerActionNotification = (msg: string) => {
    setCopiedStatus(msg);
    setTimeout(() => setCopiedStatus(null), 3000);
  };

  return (
    <div id="marketing-personality-engine" className="space-y-6">
      
      {/* Header section */}
      <div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold font-display text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" /> AI Marketing Personality Engine
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Classify your company's marketing operations DNA based on spend ratios, retention velocity, and campaign behavior.
            </p>
          </div>
          <button
            id="assess-profile-btn"
            disabled={loading}
            onClick={triggerAIEvaluation}
            className="self-start md:self-auto px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-550 text-white font-medium text-xs transition duration-200 flex items-center gap-2 shadow-md shadow-blue-500/10 disabled:opacity-50"
          >
            <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Evaluating Team DNA...' : 'Run Real-time AI Profile Analysis'}
          </button>
        </div>

        {/* Preset Selector tabs */}
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.keys(PRESET_PROFILES).map((preset) => (
            <button
              id={`personality-tab-${preset}`}
              key={preset}
              onClick={() => handlePresetSelect(preset)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                activeProfile.personality === preset && !customProfile
                  ? 'bg-blue-600/10 border-blue-600/30 text-blue-650 dark:text-blue-400 font-semibold'
                  : 'bg-white dark:bg-slate-900/40 border-slate-200 dark:border-white/5 text-slate-650 dark:text-slate-400 hover:border-slate-300 dark:hover:border-zinc-700'
              }`}
            >
              {preset}
            </button>
          ))}
          {customProfile && (
            <span className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/35 text-blue-600 dark:text-blue-400 text-xs font-semibold flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" /> Customized AI Profile
            </span>
          )}
        </div>
      </div>

      {/* Main Board Visual Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Side: Editorial Synopsis Card */}
        <div id="personality-synopsis-panel" className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-slate-900/45 border border-slate-200/50 dark:border-white/5 relative overflow-hidden flex flex-col justify-between shadow-xs">
          <div className="space-y-4">
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-blue-400 bg-blue-500/5 px-2 py-0.5 rounded">
              Corporate Strategy Breakdown
            </span>
            <h4 id="active-personality-title" className="text-2xl font-bold font-display text-zinc-950 dark:text-white">
              {activeProfile.personality}
            </h4>
            <p className="text-sm italic text-zinc-650 dark:text-zinc-350 font-sans border-l-2 border-blue-500/40 pl-3">
              "{activeProfile.tagline}"
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {activeProfile.narrative}
            </p>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-200/50 dark:border-white/5 space-y-3">
            <h5 className="text-xs uppercase font-semibold text-slate-400 tracking-wider">Governing Strategy Traits</h5>
            <div className="flex flex-wrap gap-2">
              {activeProfile.governingTraits.map((trait, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded bg-slate-100/50 dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 text-slate-700 dark:text-slate-305 font-mono text-[10px] uppercase font-medium"
                >
                  ⚜ {trait}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Shareable Executive Card Visualizer (Glass Boardroom Aesthetic) */}
        <div id="personality-shareable-card" className="lg:col-span-5 p-1.5 rounded-2xl bg-gradient-to-tr from-slate-950 via-slate-900 to-[#020617] border border-white/5 shadow-xl flex flex-col justify-between min-h-[380px] relative overflow-hidden text-white">
          
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-radial from-blue-500/10 to-transparent blur-3xl pointer-events-none" />

          {/* Top Logo and Badge */}
          <div className="p-5 flex justify-between items-center relative z-10">
            <div className="flex items-center gap-1.5">
              <div className="p-1.5 rounded bg-white/10 border border-white/15">
                <Award className="h-4 w-4 text-emerald-400" />
              </div>
              <span className="text-xs font-bold font-display uppercase tracking-wider text-zinc-100">
                MarketingPilot
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/30 border border-zinc-800/80 px-2.5 py-0.5 rounded-full">
              <span className="text-[10px] font-mono text-zinc-400">CMO Rating</span>
              <span className="text-xs font-bold text-emerald-400">{activeProfile.cmorating}</span>
            </div>
          </div>

          {/* Mid Section: Identity Statement */}
          <div className="px-6 py-4 text-left relative z-10 my-auto">
            <span className="text-[9px] font-mono uppercase tracking-widest text-blue-400">Verified Style Card</span>
            <h3 className="text-3xl font-extrabold font-display leading-tight tracking-tight text-white mt-1">
              The {activeProfile.personality}
            </h3>
            <p className="text-[11px] text-zinc-400 leading-normal mt-2 italic">
              "{activeProfile.tagline}"
            </p>

            <div className="mt-4 p-3.5 rounded bg-black/40 border border-zinc-800/40 text-[10px] flex items-start gap-2 text-zinc-300 leading-relaxed italic relative">
              <Quote className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
              <span>{activeProfile.boardroomQuote}</span>
            </div>
            
            {copiedStatus && (
              <div className="mt-3 px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded text-emerald-300 text-[10px] font-mono text-center animate-bounce">
                ✓ {copiedStatus}
              </div>
            )}
          </div>

          {/* Bottom Share Actions Row */}
          <div className="p-4 bg-black/45 border-t border-zinc-800/50 flex items-center justify-between relative z-10 rounded-b-xl gap-2 text-xs">
            <span className="text-[9px] text-zinc-500 font-mono tracking-widest">
              ID: MP-AI-2026
            </span>
            <div className="flex gap-2">
              <button
                id="share-card-btn"
                onClick={() => triggerActionNotification('Boardroom profile link compiled to clipboard!')}
                className="px-2.5 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 font-semibold text-zinc-300 border border-zinc-700/60 transition-colors flex items-center gap-1"
                title="Copy share link"
              >
                <Share2 className="h-3 w-3" />
              </button>
              <button
                id="download-card-mockup"
                onClick={() => triggerActionNotification('PDF Executive Dossier generated successfully.')}
                className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors flex items-center gap-1.5"
              >
                <Download className="h-3.5 w-3.5" /> Download Asset
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
