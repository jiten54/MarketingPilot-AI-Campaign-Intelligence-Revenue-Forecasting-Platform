import { Campaign, ChannelPerformance, AttributionModelComparison, FunnelStage, CustomerTouchpoint, ForecastPoint } from './types';

// Extend types with specific items if needed
export interface BenchmarkDataPoint {
  category: string;
  yourPerformance: number;
  competitorAverage: number;
  industryLeader: number;
}

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-01',
    name: 'Mediterranean Summer Cruise Promo',
    status: 'active',
    channel: 'Google Search',
    budget: 350000,
    spend: 210000,
    revenue: 1250000,
    clicks: 145000,
    impressions: 4800000,
    conversions: 3200,
    leads: 12000,
    roi: 495.23,
    roas: 5.95,
    cac: 65.62,
    conversionRate: 2.21,
    audience: 'Luxury Travelers 35-64',
    healthScore: 94,
    growthRate: 18.4,
    startDate: '2026-05-01',
  },
  {
    id: 'camp-02',
    name: 'Carribean Winter Escape Retargeting',
    status: 'active',
    channel: 'Paid Social (Meta)',
    budget: 200000,
    spend: 185000,
    revenue: 962000,
    clicks: 112000,
    impressions: 3900000,
    conversions: 2450,
    leads: 9800,
    roi: 419.46,
    roas: 5.2,
    cac: 75.51,
    conversionRate: 2.19,
    audience: 'Couples & Honeymooners',
    healthScore: 88,
    growthRate: 12.1,
    startDate: '2026-04-15',
  },
  {
    id: 'camp-03',
    name: 'Ultra-Luxury Suite Voyager Campaign',
    status: 'active',
    channel: 'Native & Programmatic',
    budget: 150000,
    spend: 64000,
    revenue: 416000,
    clicks: 45000,
    impressions: 2100000,
    conversions: 416,
    leads: 3100,
    roi: 550.0,
    roas: 6.5,
    cac: 153.84,
    conversionRate: 0.92,
    audience: 'High Net Worth Individuals',
    healthScore: 92,
    growthRate: 24.5,
    startDate: '2026-05-15',
  },
  {
    id: 'camp-04',
    name: 'Hospitality Autumn Spa Retreat',
    status: 'completed',
    channel: 'Email Newsletter',
    budget: 50000,
    spend: 48500,
    revenue: 340000,
    clicks: 88000,
    impressions: 450000,
    conversions: 1700,
    leads: 4200,
    roi: 601.03,
    roas: 7.01,
    cac: 28.52,
    conversionRate: 1.93,
    audience: 'Past Guest Loyalty Members',
    healthScore: 96,
    growthRate: 4.2,
    startDate: '2026-02-10',
  },
  {
    id: 'camp-05',
    name: 'TikTok Cruises Gen-Z Discovery',
    status: 'active',
    channel: 'Paid Social (TikTok)',
    budget: 120000,
    spend: 85000,
    revenue: 280000,
    clicks: 195000,
    impressions: 8900000,
    conversions: 890,
    leads: 14500,
    roi: 229.41,
    roas: 3.29,
    cac: 95.5,
    conversionRate: 0.46,
    audience: 'Millennials & Gen-Z Adventurers',
    healthScore: 74,
    growthRate: 35.8,
    startDate: '2026-05-10',
  },
  {
    id: 'camp-06',
    name: 'YouTube Immersive Resort Tour Video',
    status: 'active',
    channel: 'Paid Video (YouTube)',
    budget: 180000,
    spend: 120000,
    revenue: 490000,
    clicks: 92000,
    impressions: 6500000,
    conversions: 1150,
    leads: 8900,
    roi: 308.33,
    roas: 4.08,
    cac: 104.34,
    conversionRate: 1.25,
    audience: 'Active Family Planners',
    healthScore: 82,
    growthRate: 15.2,
    startDate: '2026-03-01',
  },
  {
    id: 'camp-07',
    name: 'European Capital Escapades Co-op',
    status: 'paused',
    channel: 'Partnership & Affiliate',
    budget: 100000,
    spend: 35000,
    revenue: 110000,
    clicks: 22000,
    impressions: 850000,
    conversions: 240,
    leads: 1800,
    roi: 214.28,
    roas: 3.14,
    cac: 145.83,
    conversionRate: 1.09,
    audience: 'Frequent Flyer Alliance Members',
    healthScore: 68,
    growthRate: -3.5,
    startDate: '2026-04-01',
  }
];

export const INITIAL_CHANNELS: ChannelPerformance[] = [
  {
    channel: 'Google Search',
    spend: 210000,
    revenue: 1250000,
    conversions: 3200,
    cac: 65.62,
    roas: 5.95,
    leads: 12000,
    qualityScore: 9.2,
  },
  {
    channel: 'Paid Social (Meta)',
    spend: 185000,
    revenue: 962000,
    conversions: 2450,
    cac: 75.51,
    roas: 5.2,
    leads: 9800,
    qualityScore: 8.5,
  },
  {
    channel: 'Native & Programmatic',
    spend: 64000,
    revenue: 416000,
    conversions: 416,
    cac: 153.84,
    roas: 6.5,
    leads: 3100,
    qualityScore: 8.9,
  },
  {
    channel: 'Email Newsletter',
    spend: 48500,
    revenue: 340000,
    conversions: 1700,
    cac: 28.52,
    roas: 7.01,
    leads: 4200,
    qualityScore: 9.6,
  },
  {
    channel: 'Paid Social (TikTok)',
    spend: 85000,
    revenue: 280000,
    conversions: 890,
    cac: 95.5,
    roas: 3.29,
    leads: 14500,
    qualityScore: 6.8,
  },
  {
    channel: 'Paid Video (YouTube)',
    spend: 120000,
    revenue: 490000,
    conversions: 1150,
    cac: 104.34,
    roas: 4.08,
    leads: 8900,
    qualityScore: 7.9,
  },
  {
    channel: 'Partnership & Affiliate',
    spend: 35000,
    revenue: 110000,
    conversions: 240,
    cac: 145.83,
    roas: 3.14,
    leads: 1800,
    qualityScore: 7.1,
  }
];

export const ATTRIBUTION_COMPARISONS: AttributionModelComparison[] = [
  {
    channel: 'Google Search',
    firstTouch: 30,
    lastTouch: 45,
    multiTouch: 38,
    revenueAttributed: {
      firstTouch: 1154400,
      lastTouch: 1731600,
      multiTouch: 1462080,
    },
  },
  {
    channel: 'Paid Social (Meta)',
    firstTouch: 35,
    lastTouch: 22,
    multiTouch: 28,
    revenueAttributed: {
      firstTouch: 1346800,
      lastTouch: 846560,
      multiTouch: 1077440,
    },
  },
  {
    channel: 'Native & Programmatic',
    firstTouch: 8,
    lastTouch: 10,
    multiTouch: 9,
    revenueAttributed: {
      firstTouch: 307840,
      lastTouch: 384800,
      multiTouch: 346320,
    },
  },
  {
    channel: 'Email Newsletter',
    firstTouch: 5,
    lastTouch: 15,
    multiTouch: 12,
    revenueAttributed: {
      firstTouch: 192400,
      lastTouch: 577200,
      multiTouch: 461760,
    },
  },
  {
    channel: 'Paid Social (TikTok)',
    firstTouch: 14,
    lastTouch: 4,
    multiTouch: 8,
    revenueAttributed: {
      firstTouch: 538720,
      lastTouch: 153920,
      multiTouch: 307840,
    },
  },
  {
    channel: 'Paid Video (YouTube)',
    firstTouch: 6,
    lastTouch: 2,
    multiTouch: 3,
    revenueAttributed: {
      firstTouch: 230880,
      lastTouch: 76960,
      multiTouch: 115440,
    },
  },
  {
    channel: 'Partnership & Affiliate',
    firstTouch: 2,
    lastTouch: 2,
    multiTouch: 2,
    revenueAttributed: {
      firstTouch: 76960,
      lastTouch: 76960,
      multiTouch: 76960,
    },
  }
];

export const FUNNEL_STAGES: FunnelStage[] = [
  {
    stage: 'Impressions',
    count: 27550000,
    percentageOfPrevious: 100,
    percentageOfTotal: 100,
    costPerStage: 0.027 // CPM calculation
  },
  {
    stage: 'Clicks / Visits',
    count: 699000,
    percentageOfPrevious: 2.53,
    percentageOfTotal: 2.53,
    costPerStage: 1.07 // Cost per click average
  },
  {
    stage: 'Leads / Inquiries',
    count: 64300,
    percentageOfPrevious: 9.19,
    percentageOfTotal: 0.23,
    costPerStage: 11.64
  },
  {
    stage: 'Deposits / Qualified Leads',
    count: 14500,
    percentageOfPrevious: 22.55,
    percentageOfTotal: 0.05,
    costPerStage: 51.62
  },
  {
    stage: 'Completed Bookings',
    count: 10046,
    percentageOfPrevious: 69.28,
    percentageOfTotal: 0.036,
    costPerStage: 74.51
  }
];

export const CUSTOMER_JOURNEYS: CustomerTouchpoint[] = [
  {
    id: 'user-001',
    userId: 'Hassan K.',
    touchpoints: [
      { channel: 'Paid Social (Meta)', timestamp: '2026-05-10', type: 'impression', campaign: 'Carribean Winter Escape' },
      { channel: 'Paid Video (YouTube)', timestamp: '2026-05-12', type: 'click', campaign: 'YouTube Immersive Resort Tour' },
      { channel: 'Google Search', timestamp: '2026-05-18', type: 'click', campaign: 'Mediterranean Summer Cruise Promo', value: 4500 },
      { channel: 'Email Newsletter', timestamp: '2026-05-20', type: 'purchase', campaign: 'Hospitality Autumn Spa Retreat', value: 4500 }
    ],
    converted: true,
    totalValue: 4500
  },
  {
    id: 'user-002',
    userId: 'Amandine L.',
    touchpoints: [
      { channel: 'Paid Social (TikTok)', timestamp: '2026-06-01', type: 'click', campaign: 'TikTok Cruises Gen-Z Discovery' },
      { channel: 'Google Search', timestamp: '2026-06-05', type: 'click', campaign: 'Mediterranean Summer Cruise Promo' },
      { channel: 'Google Search', timestamp: '2026-06-06', type: 'purchase', campaign: 'Mediterranean Summer Cruise Promo', value: 8200 }
    ],
    converted: true,
    totalValue: 8200
  },
  {
    id: 'user-003',
    userId: 'Jonathan R.',
    touchpoints: [
      { channel: 'Native & Programmatic', timestamp: '2026-04-20', type: 'impression', campaign: 'Ultra-Luxury Suite Voyager' },
      { channel: 'Native & Programmatic', timestamp: '2026-04-22', type: 'click', campaign: 'Ultra-Luxury Suite Voyager' },
      { channel: 'Google Search', timestamp: '2026-04-25', type: 'click', campaign: 'Ultra-Luxury Suite Voyager', value: 12500 }
    ],
    converted: false,
    totalValue: 0
  },
  {
    id: 'user-004',
    userId: 'Serena M.',
    touchpoints: [
      { channel: 'Paid Social (Meta)', timestamp: '2026-05-25', type: 'click', campaign: 'Carribean Winter Escape' },
      { channel: 'Email Newsletter', timestamp: '2026-05-28', type: 'click', campaign: 'Past Guest Loyalty' },
      { channel: 'Email Newsletter', timestamp: '2026-06-03', type: 'purchase', campaign: 'Past Guest Loyalty', value: 3100 }
    ],
    converted: true,
    totalValue: 3100
  },
  {
    id: 'user-005',
    userId: 'Takashi Y.',
    touchpoints: [
      { channel: 'Partnership & Affiliate', timestamp: '2026-05-15', type: 'click', campaign: 'European Capital Escapades Co-op' },
      { channel: 'Paid Video (YouTube)', timestamp: '2026-05-19', type: 'impression', campaign: 'YouTube Immersive Resort Tour' },
      { channel: 'Google Search', timestamp: '2026-05-24', type: 'click', campaign: 'Mediterranean Summer Cruise Promo', value: 6400 }
    ],
    converted: true,
    totalValue: 6400
  }
];

export const REVENUE_FORECAST_DATA: ForecastPoint[] = [
  { date: 'Jan 2026', actual: 480000, forecastedOptimistic: 480000, forecastedConservative: 480000, forecastedRealistic: 480000 },
  { date: 'Feb 2026', actual: 520000, forecastedOptimistic: 510000, forecastedConservative: 510000, forecastedRealistic: 512000 },
  { date: 'Mar 2026', actual: 590000, forecastedOptimistic: 580000, forecastedConservative: 560000, forecastedRealistic: 575000 },
  { date: 'Apr 2026', actual: 610000, forecastedOptimistic: 620000, forecastedConservative: 590000, forecastedRealistic: 605000 },
  { date: 'May 2026', actual: 780000, forecastedOptimistic: 750000, forecastedConservative: 710000, forecastedRealistic: 735000 },
  { date: 'Jun 2026', actual: 868000, forecastedOptimistic: 820000, forecastedConservative: 790000, forecastedRealistic: 810000 },
  { date: 'Jul 2026', actual: null, forecastedOptimistic: 1050000, forecastedConservative: 880000, forecastedRealistic: 960000 },
  { date: 'Aug 2026', actual: null, forecastedOptimistic: 1210000, forecastedConservative: 920000, forecastedRealistic: 1080000 },
  { date: 'Sep 2026', actual: null, forecastedOptimistic: 1140000, forecastedConservative: 840000, forecastedRealistic: 990000 },
  { date: 'Oct 2026', actual: null, forecastedOptimistic: 1020000, forecastedConservative: 810000, forecastedRealistic: 910000 },
  { date: 'Nov 2026', actual: null, forecastedOptimistic: 1180000, forecastedConservative: 890000, forecastedRealistic: 1050000 },
  { date: 'Dec 2026', actual: null, forecastedOptimistic: 1390000, forecastedConservative: 980000, forecastedRealistic: 1200000 }
];

export const COMPETITOR_BENCHMARKS: BenchmarkDataPoint[] = [
  { category: 'Customer Acquisition Cost (CAC)', yourPerformance: 74.51, competitorAverage: 115.00, industryLeader: 62.00 },
  { category: 'Return On Ad Spend (ROAS)', yourPerformance: 5.13, competitorAverage: 3.42, industryLeader: 6.20 },
  { category: 'Marketing ROI (%)', yourPerformance: 413.2, competitorAverage: 242.0, industryLeader: 520.0 },
  { category: 'Lead-to-Booking Rate (%)', yourPerformance: 15.62, competitorAverage: 11.20, industryLeader: 19.50 },
  { category: 'Channel Quality Index (/10)', yourPerformance: 8.52, competitorAverage: 7.10, industryLeader: 9.10 },
  { category: 'Annual Growth Rate (%)', yourPerformance: 28.6, competitorAverage: 14.5, industryLeader: 35.0 }
];
