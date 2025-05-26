import { Config } from '@/types'

const config: Config = {
  content: {
    title: 'Markets move on people. People move on sentiment. Sentiment lives in data.',
    input: {
      placeholder: 'Enter your email',
    },
    telegramButton: {
      tooltipContent: 'Join the Community',
    },
    apiButton: {
      tooltipContent: 'Get API Access (soon...)',
    },
    disclaimer:
      'This content and the data provided are for informational purposes only and should not be considered financial advice. Always conduct your own research—investing in Bitcoin involves risk, and past performance is not indicative of future results.',
  },
  webSearch: {
    instructions: `You are an on‑chain research assistant. Using the web_search tool, gather the most relevant public‑web information that reflects TODAY’S (${new Date().toISOString().slice(0, 10)}) sentiment around Bitcoin (last 24h window).`,
    input: `
   - Fetch up to **5 influential crypto‑news or mainstream headlines**.
   - Fetch up to **5 high‑engagement tweets** about Bitcoin from reputable crypto accounts (include the tweet text in quotes).
   - Fetch up to **3 currently hot Reddit threads** from r/Bitcoin or r/CryptoCurrency (use thread titles).
   - Look up Google Trends for the term "Bitcoin" in the last 24h and summarise whether interest is UP, DOWN or FLAT.`,
  },
  analysisPrompt: (
    webSearch: string,
  ) => `You are a professional Bitcoin market‑sentiment analyst. You receive social & news data and must produce a "sentiment score", a float between ‑5 (panic) and 5 (euphoria)
    Here is today's web data:\n${webSearch}
    Requirement: Only return the score and a short explanation of the score in the following JSON format: "{ score, explanation }".
    `,
}

export default config
