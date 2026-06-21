import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, Users, Sparkles, HelpCircle, ArrowRight, UserPlus, Star, ChevronDown, CheckCircle, Search, Mail, Video, Zap } from 'lucide-react';
import { ChannelPerformance, CustomerTouchpoint } from '../types';

interface AcquisitionIntelligenceProps {
  channels: ChannelPerformance[];
  journeys: CustomerTouchpoint[];
}

export default function AcquisitionIntelligence({ channels, journeys }: AcquisitionIntelligenceProps) {
  const [selectedJourneyUser, setSelectedJourneyUser] = useState<string>('user-001');

  const selectedJourney = journeys.find(j => j.id === selectedJourneyUser) || journeys[0];

  const getChannelIcon = (channel: string) => {
    if (channel.includes('Search')) return Search;
    if (channel.includes('Social') || channel.includes('TikTok') || channel.includes('Meta')) return Zap;
    if (channel.includes('Email')) return Mail;
    if (channel.includes('Video') || channel.includes('YouTube')) return Video;
    return Compass;
  };

  return (
    <div id="customer-acquisition-intelligence" className="space-y-6">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold font-display text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Users className="h-5 w-5 text-indigo-500" /> Customer Acquisition & Touchpoint Intelligence
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Audit buyer behavior pathways, analyze high-worth touchpoint maps, and evaluate lead quality scores.
          </p>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Source Performances & Quality Index */}
        <div id="source-performance-panel" className="lg:col-span-7 p-6 rounded-2xl glass-panel relative overflow-hidden shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-sm uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400 font-sans">
              Source Performances & Quality Metrics
            </h4>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-bold">
              High Season Priority Index
            </span>
          </div>

          <div className="space-y-4 divide-y divide-zinc-200/50 dark:divide-zinc-800/50">
            {channels.map((chan, idx) => {
              const ChannelIcon = getChannelIcon(chan.channel);
              return (
                <div key={idx} className="pt-3 first:pt-0 flex items-center justify-between gap-4 group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-650 dark:text-zinc-300">
                      <ChannelIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{chan.channel}</h5>
                      <span className="text-[10px] font-mono text-zinc-450 dark:text-zinc-500 mt-0.5 block">
                        ROAS: {chan.roas}x | Conversions: {chan.conversions}
                      </span>
                    </div>
                  </div>

                  {/* Quality indicators & CAC bars */}
                  <div className="text-right space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-zinc-400">Quality:</span>
                      <span className="text-xs font-bold text-teal-600 dark:text-teal-400">{chan.qualityScore}/10</span>
                    </div>
                    <div className="w-24 h-1.5 rounded-full bg-zinc-150 dark:bg-zinc-800 overflow-hidden">
                      <div 
                        className="h-full bg-teal-500"
                        style={{ width: `${chan.qualityScore * 10}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Core Module 5: Customer Journey Map & Pathway Timelines */}
        <div id="customer-journey-panel" className="lg:col-span-5 p-6 rounded-2xl glass-panel relative overflow-hidden shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <h4 className="text-sm uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400 font-sans">
              Dynamic Customer Journey Timelines
            </h4>

            {/* User Account Journey picker */}
            <div className="flex gap-2.5 overflow-x-auto pb-2 border-b border-zinc-200/40 dark:border-zinc-800/40 scrollbar-none">
              {journeys.map(j => (
                <button
                  id={`journey-picker-${j.id}`}
                  key={j.id}
                  onClick={() => setSelectedJourneyUser(j.id)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-semibold transition-all ${
                    j.id === selectedJourneyUser
                      ? 'bg-indigo-500 text-white shadow-md'
                      : 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-850 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-350'
                  }`}
                >
                  {j.userId}
                </button>
              ))}
            </div>

            {/* Timeline Tree Nodes */}
            <div className="pt-2 relative pl-4 space-y-5 border-l-2 border-zinc-200 dark:border-zinc-800 ml-2.5">
              
              {selectedJourney.touchpoints.map((tp, idx) => {
                const NodeIcon = getChannelIcon(tp.channel);
                return (
                  <div key={idx} className="relative first:mt-0">
                    {/* Ring Indicator */}
                    <div className="absolute -left-[25px] top-1 p-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border-2 border-indigo-400">
                      <NodeIcon className="h-3 w-3 text-indigo-500" />
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-zinc-400 block">{tp.timestamp}</span>
                      <h5 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
                        {tp.channel}
                      </h5>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-normal">
                        Campaign: <span className="font-mono text-zinc-700 dark:text-zinc-300">{tp.campaign}</span> ({tp.type})
                      </p>
                      {tp.value && (
                        <span className="inline-block px-1.5 py-0.5 mt-1 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 font-mono text-[9px] font-bold">
                          Value Attributed: ${tp.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}

            </div>
          </div>

          {/* Checkout Conversion Status */}
          <div className="mt-6 pt-4 border-t border-zinc-250/50 dark:border-zinc-800/40 flex items-center justify-between text-xs font-sans">
            <span className="text-zinc-500">Journey Output:</span>
            {selectedJourney.converted ? (
              <span className="text-emerald-500 font-bold flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4" /> SECURED BOOKING (${selectedJourney.totalValue.toLocaleString()})
              </span>
            ) : (
              <span className="text-amber-500 font-bold flex items-center gap-1.5">
                <Compass className="h-4 w-4 animate-spin" /> ACTIVE ENGAGEMENT PIPELINE
              </span>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
