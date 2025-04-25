import { Config } from '@/types'

const config: Config = {
  content: {
    title: 'Empowering innovators to think independently and lead their own path in Bitcoin strategy',
    input: {
      placeholder: 'Enter your email',
    },
    joinButton: {
      tooltipContent: 'Join the Community',
    },
    apiButton: {
      tooltipContent: 'Get API Access (soon...)',
    },
    paragraphs: [
      'Our data-driven solutions empowers individuals with advanced market analytics, focusing on timeless frameworks, pattern recognition, and big-picture thinking.',
      "We also collaborate with businesses that are exploring how Bitcoin fits into their broader strategy. Whether it's treasury considerations, internal education, or a desire to better understand the evolving landscape, we offer personalized discussions designed to support thoughtful, forward-looking decision making.",
    ],
    disclaimer:
      'Our content is for informational purposes only and does not constitute financial advice. All signals are automated and should be seen as one perspective among many. Please do your own research—Bitcoin involves risk, and past trends do not guarantee future outcomes.',
  },
}

export default config
