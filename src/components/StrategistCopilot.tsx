import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { Sparkles, MessageSquare, Send, CheckCircle2, AlertTriangle, Lightbulb, Compass, ChevronRight, BarChart, TrendingUp, HelpCircle, RefreshCw } from 'lucide-react';
import { Campaign, ChannelPerformance, CopilotMessage, BenchmarkData } from '../types';
import { COMPETITOR_BENCHMARKS } from '../data';

// Extend local benchmark types
export interface LocalBenchmark {
  category: string;
  yourPerformance: number;
  competitorAverage: number;
  industryLeader: number;
}

interface StrategistCopilotProps {
  campaigns: Campaign[];
  channels: ChannelPerformance[];
}

interface StrategyDoc {
  overview: string;
  recommendations: {
    priority: string;
    metric: string;
    title: string;
    description: string;
    impact: string;
    actionableStep: string;
  }[];
  allocationProjection: string;
}

export default function StrategistCopilot({ campaigns, channels }: StrategistCopilotProps) {
  const [strategy, setStrategy] = useState<StrategyDoc | null>(null);
  const [loadingStrategy, setLoadingStrategy] = useState<boolean>(false);
  const [chatInput, setChatInput] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<CopilotMessage[]>([
    {
      sender: 'assistant',
      content: `### MarketingPilot AI Copilot Activated

Welcome to your campaign intelligence room. I have fully indexed all 7 active campaigns, including conversion funnels, CAC weights, and historical sales forecast trends.

**Strategic Anomalies Detected**:
* **TikTok Gen-Z campaign** is experiencing a high conversion bounce rate, bringing its actual ROAS down to **3.29x** (industry average: 3.42x).
* **Email newsletter** loyalty cohort generates **7.01x ROAS**, indicating vast potential for localized copy extensions.

How can I assist you with budget allocations, growth curves, or attribution weightings today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [sendingMsg, setSendingMsg] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Load baseline strategic plan upon mounting using standard defaults
  const fetchStrategyRecommendations = async () => {
    setLoadingStrategy(true);
    try {
      const response = await fetch('/api/strategist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaigns, channels })
      });
      if (response.ok) {
        const data = await response.json();
        setStrategy(data);
      }
    } catch (err) {
      console.error('Failed to query marketing strategist API:', err);
    } finally {
      setLoadingStrategy(false);
    }
  };

  // Get initial report if empty
  useEffect(() => {
    if (!strategy) {
      fetchStrategyRecommendations();
    }
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg: CopilotMessage = {
      sender: 'user',
      content: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    const inputToSubmit = chatInput;
    setChatInput('');
    setSendingMsg(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...chatMessages, userMsg],
          contextData: { campaigns, channels }
        })
      });

      if (response.ok) {
        const data = await response.json();
        setChatMessages(prev => [
          ...prev,
          {
            sender: 'assistant',
            content: data.text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        throw new Error('Failed response');
      }
    } catch (err) {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'assistant',
          content: 'Apologies, CMO. The connection to the campaign intelligence processor was interrupted. Please confirm secret credentials or retry in a moment.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setSendingMsg(false);
    }
  };

  return (
    <div id="ai-marketing-intelligence-room" className="space-y-6">
      
      {/* Competitor Benchmarking Grid (Bonus Feature) */}
      <div id="competitor-benchmarks-panel" className="p-6 rounded-2xl glass-panel relative overflow-hidden shadow-xs space-y-4">
        <h4 className="text-sm uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400 font-sans flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-emerald-500" /> Peer-to-Peer Competitor Benchmarking Matrix
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-zinc-100/50 dark:bg-zinc-800/40 border border-zinc-200/40 dark:border-zinc-850/50 space-y-2 text-left">
            <span className="text-[10px] font-mono text-zinc-455">Acquisition Value (Blended ROAS)</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-teal-500">5.13x</span>
              <span className="text-xs text-zinc-500">vs 3.42x Peer Ave</span>
            </div>
            <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-teal-500 rounded-full w-[84%]" />
            </div>
            <span className="text-[9px] text-zinc-500 block font-sans">You are performing +50% above industry standards.</span>
          </div>

          <div className="p-4 rounded-xl bg-zinc-100/50 dark:bg-zinc-800/40 border border-zinc-200/40 dark:border-zinc-850/50 space-y-2 text-left">
            <span className="text-[10px] font-mono text-zinc-455">Customer Acquisition Cost (CAC)</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-indigo-400">$74.51</span>
              <span className="text-xs text-zinc-500">vs $115.00 Peer Ave</span>
            </div>
            <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full w-[95%]" />
            </div>
            <span className="text-[9px] text-emerald-500 block font-semibold font-sans">Save average $40.49 per conversion!</span>
          </div>

          <div className="p-4 rounded-xl bg-zinc-100/50 dark:bg-zinc-800/40 border border-zinc-200/40 dark:border-zinc-850/50 space-y-2 text-left">
            <span className="text-[10px] font-mono text-zinc-455">Lead qualification conversion rate</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-pink-400">15.62%</span>
              <span className="text-xs text-zinc-500 font-sans">vs 11.20% Industry</span>
            </div>
            <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-pink-500 rounded-full w-[78%]" />
            </div>
            <span className="text-[9px] text-zinc-500 block font-sans">Moat rating: Grade A (High customer retention).</span>
          </div>
        </div>
      </div>

      {/* Main Double-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column: AI Marketing Strategist Recommendations (Core Module 8) */}
        <div id="ai-strategist-panel" className="lg:col-span-6 p-6 rounded-2xl glass-panel relative overflow-hidden shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-sm uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400 font-sans flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-teal-400 animate-spin" style={{ animationDuration: '8s' }} /> AI Marketing Strategist Briefings
              </h4>
              <button
                id="refresh-strategy-btn"
                disabled={loadingStrategy}
                onClick={fetchStrategyRecommendations}
                className="p-1 rounded bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition"
                title="Refresh Strategy Brief"
              >
                <RefreshCw className={`h-3.5 w-3.5 text-zinc-500 ${loadingStrategy ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {loadingStrategy ? (
              <div className="py-20 flex flex-col justify-center items-center gap-3">
                <RefreshCw className="h-8 w-8 text-teal-400 animate-spin" />
                <span className="text-xs font-mono text-zinc-400">Executing machine learning audit portfolio...</span>
              </div>
            ) : strategy ? (
              <div className="space-y-4 text-left">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans bg-zinc-100/40 dark:bg-zinc-800/30 p-3 rounded-lg border border-zinc-200/50 dark:border-zinc-800/40">
                  {strategy.overview}
                </p>

                {/* Recommendations Loop */}
                <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                  {strategy.recommendations?.map((rec, i) => (
                    <div key={i} className="p-3.5 rounded-xl border border-zinc-200/60 dark:border-zinc-820 bg-zinc-100/20 dark:bg-zinc-850/20 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold font-mono uppercase ${
                          rec.priority === 'HIGH' 
                            ? 'bg-amber-500/15 text-amber-500' 
                            : 'bg-indigo-500/15 text-indigo-400'
                        }`}>
                          {rec.priority} PRIORITY — {rec.metric}
                        </span>
                        <span className="text-[10px] font-bold text-teal-500">{rec.impact}</span>
                      </div>
                      <h5 className="text-xs font-bold text-zinc-900 dark:text-white">{rec.title}</h5>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-normal">{rec.description}</p>
                      <div className="text-[10px] font-mono text-indigo-400 bg-indigo-500/5 border-l-2 border-indigo-400 pl-2 py-0.5">
                        <span className="font-bold uppercase tracking-wider text-pink-400">Tactical Action:</span> {rec.actionableStep}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-20 text-center text-xs text-zinc-500 font-mono">
                No active strategy briefs generated inside your browser session. Click refresh.
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-zinc-200/30 dark:border-zinc-800/30 text-left">
            <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 block">Board Allocation Outlookes</span>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-normal italic mt-1 pb-1">
              {strategy?.allocationProjection || 'Redirection forecasts stable.'}
            </p>
          </div>
        </div>

        {/* Right Column: AI Marketing Copilot Chat (Bonus Feature) */}
        <div id="ai-copilot-panel" className="lg:col-span-6 p-6 rounded-2xl bg-zinc-950 border border-zinc-850 shadow-xl flex flex-col justify-between min-h-[460px] relative overflow-hidden">
          
          {/* Subtle cosmic mesh background */}
          <div className="absolute top-0 right-0 h-44 w-44 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Chat Header */}
          <div className="flex justify-between items-center text-left pb-3 border-b border-zinc-850/80 relative z-10">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/15">
                <MessageSquare className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">BOARDROOM MARKETING COPILOT</h4>
                <span className="text-[9px] font-mono text-zinc-450 block">Powered by Gemini 3.5 Flash</span>
              </div>
            </div>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          {/* Conversation Stream */}
          <div className="flex-1 my-4 overflow-y-auto max-h-80 pr-1 space-y-4 text-left relative z-10 scrollbar-none">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse text-right' : 'mr-auto text-left'
                }`}
              >
                {/* Bubble details */}
                <div className={`p-4 rounded-xl text-xs space-y-1 ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-bl-none markdown-body'
                }`}>
                  {msg.sender === 'user' ? (
                    <p className="leading-relaxed font-semibold">{msg.content}</p>
                  ) : (
                    <div>
                      <Markdown>{msg.content}</Markdown>
                    </div>
                  )}
                  <span className="text-[8px] font-mono text-zinc-500 block pt-1.5">{msg.timestamp}</span>
                </div>
              </div>
            ))}
            {sendingMsg && (
              <div className="flex gap-2 items-center text-xs font-mono text-zinc-500 bg-zinc-900/40 p-2.5 rounded-lg border border-zinc-850">
                <RefreshCw className="h-3.5 w-3.5 animate-spin text-teal-400" />
                <span>CEO Analyst preparing advisory response...</span>
              </div>
            ) }
            <div ref={messagesEndRef} />
          </div>

          {/* Form Input bar */}
          <form onSubmit={handleSendMessage} className="pt-3 border-t border-zinc-850/80 flex gap-2 relative z-10">
            <input
              id="copilot-input-box"
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask Copilot: 'Suggest Q3 budget allocation between social and search'..."
              className="flex-1 px-3.5 py-2 rounded-xl text-xs font-sans text-zinc-100 bg-zinc-900 border border-zinc-800 focus:outline-none focus:ring-1 focus:ring-teal-500 placeholder-zinc-500 min-w-0"
            />
            <button
              id="send-copilot-chat"
              type="submit"
              disabled={sendingMsg || !chatInput.trim()}
              className="p-2 px-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-zinc-950 font-bold transition disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
