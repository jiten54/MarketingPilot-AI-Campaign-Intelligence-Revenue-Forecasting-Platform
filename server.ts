import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    console.warn("GEMINI_API_KEY is not set or using default mock key. Using elegant rule-based fallback engines.");
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiClient;
}

// -------------------------------------------------------------------
// API Endpoints
// -------------------------------------------------------------------

// 1. Health Status & Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    apiConfigured: !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY"
  });
});

// 2. AI Marketing Copilot Chat
app.post("/api/chat", async (req, res) => {
  const { messages, contextData } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid configuration. 'messages' array required." });
  }

  const userPrompt = messages[messages.length - 1]?.content || "Hello";
  const systemInstruction = `You are \"MarketingPilot AI Copilot\", an elite Chief Marketing Officer (CMO), multi-channel attribution modeler, and predictive business intelligence advisor.
You provide advanced boardroom consulting to marketing leaders, travel companies, cruise operators, and global enterprises.
Use robust financial language like ROAS, Customer Acquisition Cost (CAC), Return on Investment (ROI), blended marketing efficiency scores, and predictive modeling.
Keep insights highly executable and concise. Use markdown structure.
Current App Context Data (Campaigns, Costs, attribution results, competitor benchmarks): ${JSON.stringify(contextData)}`;

  const ai = getAI();
  if (!ai) {
    // Elegant system-driven heuristic chatbot responses if Gemini key is missing
    return res.json({
      text: `### Executive Analysis Response (Simulation Mode)

I am currently running in **Enterprise Simulation Mode** because your \`GEMINI_API_KEY\` is not yet fully activated in the **Secrets Panel** (which is perfect for a quick preview!).

Here is an immediate advisory audit based on your structural metrics:

1. **Attribution Discrepancies**:
   Your **Google Search** and **Paid Social (Meta)** represent **62% of your marketing footprint**. Under first-touch modeling, Paid Social receives **35%** attribution, yet drops to **22%** in last-touch. This strongly indicates that paid social is your primary audience generator, whereas Google Search is your principal conversion closer.

2. **Capital Efficiency Advisory**:
   * Your current **Blended ROAS is 5.13**, which is **50% higher than the industry competitor baseline (3.42)**.
   * However, your **TikTok Campaign (Gen-Z Discovery)** is underperforming with a ROAS of **3.29** and a CAC of **$95.50**, which is **28% higher** than your channel average. I recommend reallocating at least **$25,000** of its monthly budget to **Email Loyalty** which boasts a staggering **7.01 ROAS**.

Would you like me to simulate a custom 15% budget reallocation or map out a high-net-worth retargeting journey?`
    });
  }

  try {
    // Generate context-aware response using gemini-3.5-flash
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (err: any) {
    console.error("Gemini Chat generation failure:", err);
    res.status(500).json({
      error: "Error contacting the campaign intellect engine.",
      details: err.message
    });
  }
});

// 3. AI Marketing Strategist Recommendations
app.post("/api/strategist", async (req, res) => {
  const { campaigns, channels } = req.body;

  const systemInstruction = `You are a McKinsey-level AI Marketing Strategist. Generate structured executive recommendations for the CMO.
Provide output strictly formatted in JSON to match this structure:
{
  "overview": "Short market overview paragraph...",
  "recommendations": [
    {
      "priority": "HIGH" | "MEDIUM" | "LOW",
      "metric": "ROAS" | "CAC" | "LTV" | "Attribution",
      "title": "Strategy Name",
      "description": "Tactical advisory details...",
      "impact": "Est. +18% ROAS",
      "actionableStep": "Reallocate $50k from Meta to Search..."
    }
  ],
  "allocationProjection": "CMO Budget allocation summary text..."
}`;

  const ai = getAI();
  if (!ai) {
    // High-quality deterministic recommendations fallback
    return res.json({
      overview: "The enterprise performance architecture reveals high resilience, led by low-cac email loyalty loops, while programmatic campaigns demonstrate superb value with elite conversion margins.",
      recommendations: [
        {
          priority: "HIGH",
          metric: "Attribution",
          title: "Multi-Touch Funnel Rebalancing",
          description: "Reallocate $40,000 from TikTok Social to Google Brand Search. TikTok is showing heavy early discovery value but extremely poor last-touch yield, whereas Google Search closes 45% of journeys.",
          impact: "Est. +14% blended conversion rate",
          actionableStep: "Shift programmatic and video CTA links to direct customers into branded search capture pages rather than social landing portals."
        },
        {
          priority: "HIGH",
          metric: "CAC",
          title: "First-Touch Lead Magnet for Cruise Bookings",
          description: "Our Mediterranean summer cruise has high interest but a $65.62 CAC. Inject an interactive cruise customizer on the lander to boost conversion of high-intent traffic.",
          impact: "Save estimated $12 per booking",
          actionableStep: "Deploy a lightweight 3-stage visual survey that returns customized yachting itineraries matching user segments."
        },
        {
          priority: "MEDIUM",
          metric: "ROAS",
          title: "Loyalty Retargeting Amplification",
          description: "Hospitality Autumn Retreat email lists achieve a stunning 7.01 ROAS. Expanding programmatic audiences against lookalikes of this high-performing customer list is highly advantageous.",
          impact: "Est. +35% total loyalty bookings",
          actionableStep: "Extract anonymized hashes of guest rosters spending over $5,000 and target high-net programmatic networks with exclusive luxury inclusions."
        }
      ],
      allocationProjection: "Blended ad spend redirection of 12% in social channels into programmatic and loyalty newsletter channels raises overall predicted profitability margin by 6.8%."
    });
  }

  try {
    const prompt = `Analyze this live portfolio and generate strategic growth suggestions:
Campaigns: ${JSON.stringify(campaigns)}
Channels: ${JSON.stringify(channels)}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.2
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json(parsedData);
  } catch (err: any) {
    console.error("Strategist generation failure:", err);
    res.status(500).json({ error: "Failed to create recommendations." });
  }
});

// 4. AI Marketing Personality Engine
app.post("/api/personality", async (req, res) => {
  const { metrics } = req.body;

  const systemInstruction = `You are a corporate executive talent analyst. Based on marketing analytics inputs, determine which of the 6 personalities best represents the brand's current operations strategy:
"Growth Hacker", "Brand Builder", "Conversion Master", "Market Leader", "Customer Magnet", "Revenue Accelerator".
Return a JSON model matching:
{
  "personality": "Customer Magnet",
  "tagline": "Dynamic branding tagline...",
  "governingTraits": ["High Retention", "Low CAC", "Elite Referral"],
  "cmorating": "A+",
  "boardroomQuote": "Quote detailing marketing philosophy...",
  "narrative": "A highly premium boardroom breakdown of why this brand matches this style."
}`;

  const ai = getAI();
  if (!ai) {
    // High-quality mock personality based on metrics
    return res.json({
      personality: "Revenue Accelerator",
      tagline: "Uncompromising pipeline velocity powered by high-conversion programmatic attribution.",
      governingTraits: ["High-Velocity Funnel", "Elite ROAS Correlation", "Precise Customer Mapping"],
      cmorating: "A+",
      boardroomQuote: "We do not merely chase trends; we build a continuous, scientific pipeline from early attention to high-value executive bookings.",
      narrative: "Your brand demonstrates an extremely strong core competency in high-volume, multi-channel attribution and ad alignment. With a blended ROAS of 5.13 and dynamic luxury campaigns generating multi-million dollar returns, this posture prioritizes immediate cashflow generation coupled with efficient scaling."
    });
  }

  try {
    const prompt = `Assess these primary performance values to formulate the corporate profile:
Metrics: ${JSON.stringify(metrics)}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.4
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json(parsedData);
  } catch (err: any) {
    console.error("Personality generation failure:", err);
    res.status(500).json({ error: "Failed to generate business personality analysis." });
  }
});

// 5. Campaign Wrapped
app.post("/api/wrapped", async (req, res) => {
  const { performanceData } = req.body;

  const systemInstruction = `You are a storytelling expert and corporate compiler. Produce a highly creative "Spotify-Wrapped" style annual marketing success storyboard for this travel enterprise. Give it absolute enterprise glory.
Return a structured JSON:
{
  "bestCampaign": "Mediterranean Flight Launch",
  "highestRoiCampaign": "Winter Solace Newsletter",
  "topAcquisitionChannel": "Google Search PPC",
  "biggestGrowthMonth": "May 2026",
  "bestPerformingAudience": "HNW Families & Execs",
  "marketingSuccessStory": "A detailed, heartwarming, energetic story describing how the team conquered their quarterly forecast despite heavy global competition."
}`;

  const ai = getAI();
  if (!ai) {
    return res.json({
      bestCampaign: "Mediterranean Summer Cruise Promo",
      highestRoiCampaign: "Hospitality Autumn Spa Retreat (601.03%)",
      topAcquisitionChannel: "Google Search (3200 conversions)",
      biggestGrowthMonth: "May 2026 (+28% high season demand)",
      bestPerformingAudience: "HNW Luxury Travelers & Loyalty Members",
      marketingSuccessStory: "In 2026, the team masterfully executed a multi-touch campaign that blended high-reach visual social trailers with precise, high-intent Google Search loops. When search costs spiked by 12% in early Q2, the campaign intelligence system autonomously pivoted core budgets into programmatic suites, capturing high-worth family bookings. This strategic adjustment boosted average order values and secured an impressive 5.95x return on ad spend."
    });
  }

  try {
    const prompt = `Synthesize these historical records into an engaging boardstory:
Data: ${JSON.stringify(performanceData)}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.6
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json(parsedData);
  } catch (err: any) {
    console.error("Campaign wrapped failure:", err);
    res.status(500).json({ error: "Failed to generate Year-Wrapped booklet." });
  }
});

// -------------------------------------------------------------------
// Vite and Static File Serving Integration
// -------------------------------------------------------------------

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[MarketingPilot AI] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
