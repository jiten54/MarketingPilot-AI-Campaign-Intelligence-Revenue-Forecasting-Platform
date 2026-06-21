export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  channel: string;
  budget: number;
  spend: number;
  revenue: number;
  clicks: number;
  impressions: number;
  conversions: number;
  leads: number;
  roi: number; // calculated as (revenue - spend) / spend * 100
  roas: number; // revenue / spend
  cac: number; // spend / conversions
  conversionRate: number; // conversions / clicks * 100
  audience: string;
  healthScore: number; // 0 - 100
  growthRate: number; // growth compared to previous period
  startDate: string;
}

export interface ChannelPerformance {
  channel: string;
  spend: number;
  revenue: number;
  conversions: number;
  cac: number;
  roas: number;
  leads: number;
  qualityScore: number; // 1-10 scale
}

export interface AttributionModelComparison {
  channel: string;
  firstTouch: number; // attribution value/percentage
  lastTouch: number;
  multiTouch: number; // e.g. Linear or W-Shaped
  revenueAttributed: {
    firstTouch: number;
    lastTouch: number;
    multiTouch: number;
  };
}

export interface ForecastPoint {
  date: string;
  actual: number | null;
  forecastedOptimistic: number;
  forecastedConservative: number;
  forecastedRealistic: number;
}

export interface FunnelStage {
  stage: string;
  count: number;
  percentageOfPrevious: number;
  percentageOfTotal: number;
  costPerStage: number;
}

export interface CustomerTouchpoint {
  id: string;
  userId: string;
  touchpoints: {
    channel: string;
    timestamp: string;
    type: 'click' | 'impression' | 'sign_up' | 'purchase';
    campaign: string;
    value?: number;
  }[];
  converted: boolean;
  totalValue: number;
}

export interface BenchmarkData {
  category: string;
  yourPerformance: number;
  competitorAverage: number;
  industryLeader: number;
}

export interface CopilotMessage {
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}
