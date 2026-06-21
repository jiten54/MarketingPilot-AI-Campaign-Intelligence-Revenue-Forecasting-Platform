import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Download, CheckCircle, Mail, Slack, Calendar, RefreshCw, Layers, ShieldCheck, Printer } from 'lucide-react';
import { Campaign, ChannelPerformance } from '../types';

interface ExecutiveReportingProps {
  campaigns: Campaign[];
  channels: ChannelPerformance[];
}

export default function ExecutiveReporting({ campaigns, channels }: ExecutiveReportingProps) {
  const [selectedReportType, setSelectedReportType] = useState<'roas' | 'channels' | 'board'>('board');
  const [reportState, setReportState] = useState<'idle' | 'generating' | 'saved'>('idle');
  const [slackDelivery, setSlackDelivery] = useState<boolean>(true);
  const [emailDelivery, setEmailDelivery] = useState<boolean>(true);

  const triggerExport = (format: 'pdf' | 'excel') => {
    setReportState('generating');
    setTimeout(() => {
      setReportState('saved');
      setTimeout(() => {
        setReportState('idle');
        alert(`Successfully generated and dispatched Executive ${format.toUpperCase()} report matching standard GAAP boardroom structures.`);
      }, 1500);
    }, 1200);
  };

  return (
    <div id="executive-reporting-center" className="space-y-6">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold font-display text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <FileText className="h-5 w-5 text-indigo-500 animate-pulse" /> Board-Level Reporting Suite
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Produce certified marketing performance dossiers, Excel pivot spreads, and board-ready decks in one click.
          </p>
        </div>

        {/* Report framework selector */}
        <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl border border-zinc-200 dark:border-zinc-700 self-start sm:self-auto text-xs font-semibold">
          <button
            id="report-tab-board"
            onClick={() => setSelectedReportType('board')}
            className={`px-3 py-1.5 rounded-lg transition ${
              selectedReportType === 'board'
                ? 'bg-white dark:bg-zinc-900 text-teal-650 dark:text-teal-400 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}
          >
            Board presentation Deck
          </button>
          <button
            id="report-tab-roas"
            onClick={() => setSelectedReportType('roas')}
            className={`px-3 py-1.5 rounded-lg transition ${
              selectedReportType === 'roas'
                ? 'bg-white dark:bg-zinc-900 text-teal-650 dark:text-teal-400 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}
          >
            Corporate Campaign Ledger
          </button>
          <button
            id="report-tab-chan"
            onClick={() => setSelectedReportType('channels')}
            className={`px-3 py-1.5 rounded-lg transition ${
              selectedReportType === 'channels'
                ? 'bg-white dark:bg-zinc-900 text-teal-650 dark:text-teal-400 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}
          >
            Sourced Channel Spread
          </button>
        </div>
      </div>

      {/* Spreadsheet & Visual Dossier Mockup */}
      <div id="reporting-mock-canvas" className="p-6 rounded-2xl glass-panel relative overflow-hidden shadow-xs text-left space-y-4">
        
        {/* Document Header mock */}
        <div className="flex justify-between items-start pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="space-y-1">
            <span className="text-[9px] font-mono uppercase bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 px-2 py-0.5 rounded font-bold">
              GAAP Board Compliance Standard
            </span>
            <h4 id="reporting-doc-title" className="text-base font-bold text-zinc-950 dark:text-white">
              {selectedReportType === 'board' && '2026 Q2 CMO Marketing Presentation Report'}
              {selectedReportType === 'roas' && 'Detailed Corporate Ledger & Segment Outflow'}
              {selectedReportType === 'channels' && 'Strategic Channels Volume Attribution Matrix'}
            </h4>
            <span className="text-[10px] font-mono text-zinc-400 block pt-0.5">
              Ref ID: MP-CMO-2026-Q2 | Dispatched: 2026-06-21 Audit Block
            </span>
          </div>

          <div className="flex gap-2">
            <button
              id="print-reprt-btn"
              onClick={() => window.print()}
              className="p-1.5 rounded bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-500"
              title="Print layout"
            >
              <Printer className="h-4 w-4" />
            </button>
            <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 px-2.5 py-1 rounded font-bold uppercase">
              CONFIDENTIAL
            </span>
          </div>
        </div>

        {/* Content specific tables inside mockup */}
        <div className="h-56 overflow-y-auto pr-1">
          {selectedReportType === 'board' && (
            <div className="space-y-3 pt-2">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-normal leading-relaxed">
                The Q2 advertising campaign has concluded with an overarching investment of **$713,500** which generated an ultimate bookings index of **$3,848,000**, maintaining a consolidated portfolio ROAS of **5.13x**. This exceeds the initial Q2 board target of **3.5x** by **46.5%**.
              </p>
              
              <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-3 rounded-lg bg-zinc-100/50 dark:bg-zinc-850/30 border border-zinc-200/40 dark:border-zinc-800/40">
                  <span className="text-[9px] uppercase font-mono text-zinc-450 block">Incremental ROI Lift</span>
                  <span className="text-lg font-bold text-teal-400 mt-0.5 block">+413.2% Return</span>
                </div>
                <div className="p-3 rounded-lg bg-zinc-100/50 dark:bg-zinc-850/30 border border-zinc-200/40 dark:border-zinc-800/40">
                  <span className="text-[9px] uppercase font-mono text-zinc-450 block">Qualified Booking Volume</span>
                  <span className="text-lg font-bold text-indigo-400 mt-0.5 block">10,046 Conversions</span>
                </div>
              </div>
            </div>
          )}

          {selectedReportType === 'roas' && (
            <div className="pt-2 text-[11px] font-mono text-zinc-650 dark:text-zinc-300">
              <div className="grid grid-cols-4 border-b border-zinc-200/50 dark:border-zinc-800 pb-1.5 font-bold uppercase text-[9px] text-zinc-400">
                <span>Campaign Name</span>
                <span className="text-center">Allocation</span>
                <span className="text-center">Aquisition CAC</span>
                <span className="text-right">Return ROAS</span>
              </div>
              <div className="divide-y divide-zinc-200/30 dark:divide-zinc-800/20">
                {campaigns.map((c, i) => (
                  <div key={i} className="grid grid-cols-4 py-2 hover:bg-zinc-800/10">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-150 truncate">{c.name}</span>
                    <span className="text-center">${c.spend.toLocaleString()}</span>
                    <span className="text-center">${c.cac.toFixed(2)}</span>
                    <span className="text-right text-emerald-400 font-bold">{c.roas}x</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedReportType === 'channels' && (
            <div className="pt-2 text-[11px] font-mono text-zinc-650 dark:text-zinc-300">
              <div className="grid grid-cols-4 border-b border-zinc-200/50 dark:border-zinc-800 pb-1.5 font-bold uppercase text-[9px] text-zinc-400">
                <span>Distribution Source</span>
                <span className="text-center">Budget Spent</span>
                <span className="text-center">Qualified Leads</span>
                <span className="text-right">Lead Quality Log</span>
              </div>
              <div className="divide-y divide-zinc-200/30 dark:divide-zinc-800/20">
                {channels.map((chan, i) => (
                  <div key={i} className="grid grid-cols-4 py-2 hover:bg-zinc-800/10">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-150">{chan.channel}</span>
                    <span className="text-center">${chan.spend.toLocaleString()}</span>
                    <span className="text-center">{chan.leads.toLocaleString()}</span>
                    <span className="text-right text-indigo-400 font-bold">{chan.qualityScore}/10 index</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action download triggers */}
        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-3">
          <span className="text-[10px] text-zinc-500 font-sans">Dispatched directly to C-Suite upon generation.</span>
          
          <div className="flex gap-2.5 w-full sm:w-auto">
            <button
              id="export-pdf"
              onClick={() => triggerExport('pdf')}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-zinc-200 dark:border-zinc-700"
            >
              <FileText className="h-4 w-4" /> Download PDF Blueprint
            </button>
            <button
              id="export-excel"
              onClick={() => triggerExport('excel')}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-zinc-950 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="h-4 w-4" /> Dispatch Excel Spreadsheet
            </button>
          </div>
        </div>

      </div>

      {/* Automated Slack / Email scheduler triggers */}
      <div id="automated-scheduler-panel" className="p-6 rounded-2xl glass-panel relative overflow-hidden shadow-xs text-left space-y-4">
        <h4 className="text-xs uppercase font-bold text-zinc-400 tracking-wider">Automated Board Communication Logs</h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {/* Slack integration toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-100/50 dark:bg-zinc-800/40 border border-zinc-200/45 dark:border-zinc-850/50">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/15">
                <Slack className="h-4.5 w-4.5" />
              </div>
              <div className="space-y-0.5">
                <h5 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Disseminate reports to Slack channel</h5>
                <p className="text-[10px] text-zinc-500">Every Friday afternoon UTC</p>
              </div>
            </div>
            
            <button
              id="toggle-slack"
              onClick={() => setSlackDelivery(!slackDelivery)}
              className={`h-5 w-9 rounded-full p-0.5 transition-colors ${slackDelivery ? 'bg-indigo-500' : 'bg-zinc-300 dark:bg-zinc-800'}`}
            >
              <div className={`h-4 w-4 rounded-full bg-white transition-transform ${slackDelivery ? 'translate-x-[16px]' : 'translate-x-0'}`} />
            </button>
          </div>

          {/* Email integration toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-100/50 dark:bg-zinc-800/40 border border-zinc-200/45 dark:border-zinc-850/50">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/15">
                <Mail className="h-4.5 w-4.5" />
              </div>
              <div className="space-y-0.5">
                <h5 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Weekly board summary email</h5>
                <p className="text-[10px] text-zinc-500">Scheduled for board presentation prep</p>
              </div>
            </div>

            <button
              id="toggle-email"
              onClick={() => setEmailDelivery(!emailDelivery)}
              className={`h-5 w-9 rounded-full p-0.5 transition-colors ${emailDelivery ? 'bg-teal-500' : 'bg-zinc-300 dark:bg-zinc-800'}`}
            >
              <div className={`h-4 w-4 rounded-full bg-white transition-transform ${emailDelivery ? 'translate-x-[16px]' : 'translate-x-0'}`} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
