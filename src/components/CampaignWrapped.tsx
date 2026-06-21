import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trophy, Flame, Play, Eye, Compass, Volume2, CompassIcon, ArrowRight, RefreshCw, Star, HeartHandshake } from 'lucide-react';
import { Campaign } from '../types';

interface CampaignWrappedProps {
  campaigns: Campaign[];
}

export default function CampaignWrapped({ campaigns }: CampaignWrappedProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(false);
  const [wrappedStory, setWrappedStory] = useState<{
    bestCampaign: string;
    highestRoiCampaign: string;
    topAcquisitionChannel: string;
    biggestGrowthMonth: string;
    bestPerformingAudience: string;
    marketingSuccessStory: string;
  } | null>(null);

  // Compute stats for stories
  const sortedByROI = [...campaigns].sort((a, b) => b.roi - a.roi);
  const sortedByRevenue = [...campaigns].sort((a, b) => b.revenue - a.revenue);
  const bestCampaign = sortedByRevenue[0]?.name || 'N/A';
  const highestRoiCampaign = `${sortedByROI[0]?.name} (${sortedByROI[0]?.roi?.toFixed(0)}%)` || 'N/A';

  // Compute top channel
  const channelTotals = campaigns.reduce((acc, c) => {
    acc[c.channel] = (acc[c.channel] || 0) + c.conversions;
    return acc;
  }, {} as Record<string, number>);
  const topChannel = Object.entries(channelTotals).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

  const defaultStory = {
    bestCampaign: bestCampaign,
    highestRoiCampaign: highestRoiCampaign,
    topAcquisitionChannel: topChannel,
    biggestGrowthMonth: 'May 2026 (+28% high season demand)',
    bestPerformingAudience: sortedByRevenue[0]?.audience || 'High Net Worth Individuals',
    marketingSuccessStory: `The team conquered 2026 by delivering an integrated omnichannel tour de force. By linking programmatic discovery videos with heavy brand search intent recapture, you bypassed competitive auction fatigue. Average ROI reached a legendary and highly resilient levels, generating an incremental $3.85M in verified travel bookings.`
  };

  const activeStory = wrappedStory || defaultStory;

  const slides = [
    {
      title: 'Your Annual Marketing Ascent',
      subtitle: 'YEAR IN REVIEW',
      graphic: (
        <div className="relative flex items-center justify-center h-48 w-full">
          <div className="absolute inset-0 bg-radial from-blue-500/10 to-transparent blur-xl" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="border-2 border-dashed border-zinc-700/50 p-10 rounded-full flex items-center justify-center h-40 w-40"
          >
            <Trophy className="h-12 w-12 text-blue-400 animate-pulse" />
          </motion.div>
        </div>
      ),
      description: 'Slide to discover MarketingPilot’s elite corporate performance wrap. Let’s review the key victories.',
      cta: 'Begin Wrap experience'
    },
    {
      title: 'The Uncontested Champion',
      subtitle: 'BEST IN SHOW CAMPAIGN',
      graphic: (
        <div className="p-4 bg-zinc-900/85 border border-amber-500/30 rounded-xl max-w-sm mx-auto shadow-lg space-y-2">
          <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400">HIGHEST VALUATION</span>
          <h4 className="text-lg font-bold text-blue-450 font-display">{activeStory.bestCampaign}</h4>
          <p className="text-[11px] text-zinc-400 leading-normal">
            Driven by unprecedented booking surges across multiple regions. This project set a global standard.
          </p>
        </div>
      ),
      description: 'This campaign delivered the absolute highest gross conversion revenue, lifting the brand’s global index.',
      cta: 'Review Efficiency Champions'
    },
    {
      title: 'Pure Efficiency Peak',
      subtitle: 'HIGHEST ROI CAMPAIGN',
      graphic: (
        <div className="p-4 bg-zinc-900/85 border border-indigo-505/30 rounded-xl max-w-sm mx-auto shadow-lg space-y-2">
          <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-400">MAX EFFECT OVERHEAD</span>
          <h4 className="text-lg font-bold text-indigo-300 font-display">{activeStory.highestRoiCampaign}</h4>
          <p className="text-[11px] text-zinc-400 leading-normal">
            Minimizing baseline capital and maximizing direct-booking capture. Exceptional performance metrics.
          </p>
        </div>
      ),
      description: 'This campaign operated with peak financial leverage, providing superior unit economics.',
      cta: 'Explore Acquisition Catalyst'
    },
    {
      title: 'Top Traffic Engine',
      subtitle: 'TOP ACQUISITION CHANNEL',
      graphic: (
        <div className="p-4 bg-zinc-900/85 border border-blue-500/30 rounded-xl max-w-sm mx-auto shadow-lg space-y-2">
          <span className="text-[10px] uppercase font-mono tracking-widest text-blue-400">VOLUME & QUALITY CHAMPION</span>
          <h4 className="text-lg font-bold text-blue-400 font-display">{activeStory.topAcquisitionChannel}</h4>
          <p className="text-[11px] text-zinc-400 leading-normal">
            Closing raw customer journeys and stabilizing the cost-per-lead curve week-over-week.
          </p>
        </div>
      ),
      description: 'The absolute backbone of your conversion pipeline, guiding leads seamlessly into bookings.',
      cta: 'View Target Audience'
    },
    {
      title: 'Audience Sweet Spot',
      subtitle: 'BEST PERFORMING AUDIENCE',
      graphic: (
        <div className="p-4 bg-zinc-900/85 border border-pink-500/30 rounded-xl max-w-sm mx-auto shadow-lg space-y-2">
          <span className="text-[10px] uppercase font-mono tracking-widest text-pink-400">MOST ENGAGED COHORT</span>
          <h4 className="text-lg font-bold text-pink-300 font-display">{activeStory.bestPerformingAudience}</h4>
          <p className="text-[11px] text-zinc-400 leading-normal">
            Demonstrating premium average order values, low booking churn, and supreme repeat-stay indices.
          </p>
        </div>
      ),
      description: 'Your strategic asset. Tailor copy and imagery specifically to nurture this segment.',
      cta: 'Read Annual Success Story'
    },
    {
      title: 'The AI Success Story',
      subtitle: 'EXECUTIVE BOARD SYNOPSIS',
      graphic: (
        <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-805 text-left space-y-2 max-w-md mx-auto max-h-44 overflow-y-auto">
          <span className="text-[9px] font-mono uppercase bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded">
            AI Generated Playbook
          </span>
          <p className="text-xs text-zinc-300 leading-relaxed italic">
            "{activeStory.marketingSuccessStory}"
          </p>
        </div>
      ),
      description: 'Generated instantly based on your budget margins and performance ratios.',
      cta: 'Restart Slideshow'
    }
  ];

  // Call server-side API to reconstruct annual campaign wrapped story dynamically
  const generateNewWrappedWithAI = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/wrapped', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ performanceData: campaigns })
      });
      if (response.ok) {
        const data = await response.json();
        setWrappedStory(data);
        setCurrentSlide(5); // Jump to success story slide
      }
    } catch (err) {
      console.error('Failed to query campaign wrapped story:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      setCurrentSlide(0);
    }
  };

  return (
    <div id="campaign-wrapped" className="p-1 rounded-2xl bg-[#09090B] border border-white/5 overflow-hidden relative shadow-2xl">
      {/* Absolute background effects */}
      <div className="absolute top-0 right-0 h-48 w-48 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-48 w-48 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Interactive Panel */}
        <div className="flex-1 space-y-4 max-w-lg text-left">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px] font-mono font-bold tracking-wider flex items-center gap-1">
              <Star className="h-3 w-3 fill-amber-400" /> SPOTIFY-WRAPPED STYLE
            </span>
            <span className="text-xs text-zinc-500">Boardroom Presentation Ready</span>
          </div>

          <h3 className="text-3xl font-bold font-display text-white tracking-tight">
            Enterprise Wrapped: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Marketing Year Stories</span>
          </h3>

          <p className="text-xs text-zinc-400 leading-relaxed">
            Every dollar allocated tells a narrative. Access custom annual campaign summaries crafted in executive style, mapping channel margins, key conversion seasons, and audience hotspots.
          </p>

          <div className="pt-2 flex flex-wrap gap-2.5">
            <button
              onClick={() => setCurrentSlide(0)}
              className="text-[11px] font-medium text-zinc-400 hover:text-white transition-colors underline underline-offset-4"
            >
              Reset Guide
            </button>
            <button
              id="wrapped-ai-generate"
              disabled={loading}
              onClick={generateNewWrappedWithAI}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition duration-200 flex items-center gap-1.5 shadow-md disabled:opacity-50"
            >
              <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Synthesizing with AI...' : 'Re-generate with AI'}
            </button>
          </div>
        </div>

        {/* Dynamic Presentation Card (Right) */}
        <div className="w-full md:w-96 min-h-[360px] rounded-xl bg-zinc-900 border border-zinc-800/80 p-6 flex flex-col justify-between text-center relative overflow-hidden">
          {/* Header indicator */}
          <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
            <span>ANNUAL STORYBOARD {currentSlide + 1} / 6</span>
            <span className="text-blue-400 uppercase tracking-widest font-bold">
              {slides[currentSlide].subtitle}
            </span>
          </div>

          {/* Graphic Element */}
          <div className="my-auto py-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h4 className="text-xl font-bold font-display text-zinc-100">
                  {slides[currentSlide].title}
                </h4>
                <div>{slides[currentSlide].graphic}</div>
                <p className="text-xs text-zinc-400 px-4 leading-relaxed">
                  {slides[currentSlide].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            {/* Slide indicators dotted progress */}
            <div className="flex justify-center gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentSlide ? 'w-6 bg-blue-500' : 'w-1.5 bg-zinc-700'
                  }`}
                  onClick={() => setCurrentSlide(i)}
                />
              ))}
            </div>

            <button
              id="wrapped-next-btn"
              onClick={handleNext}
              className="w-full py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-750 text-white font-medium text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>{slides[currentSlide].cta}</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
