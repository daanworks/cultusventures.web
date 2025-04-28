import { Config } from '@/types'

const config: Config = {
  content: {
    title: 'Empowering individuals and teams to think independently and shape their own path in Bitcoin strategy',
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
      'We guide individuals and businesses through the Bitcoin landscape with clarity and strategic insight. We believe Bitcoin offers a rare opportunity to build meaningful wealth—but only through patience, timing, and independent thinking.',
      'Through our regular market insights—available via Telegram and direct API access—and consulting sessions, we empower our clients to shape their Bitcoin strategy with confidence and control, free from the noise of hype or speculation.',
    ],
    disclaimer:
      'Our content is for informational purposes only and does not constitute financial advice. All signals are automated and should be seen as one perspective among many. Please do your own research—Bitcoin involves risk, and past trends do not guarantee future outcomes.',
  },
}

export default config
