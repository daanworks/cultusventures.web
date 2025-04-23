import { Config } from '@/types'

const config: Config = {
  content: {
    title: 'Providing data-driven analysis on Bitcoin market trends for individuals and businesses',
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
      'We leverage cutting-edge data analytics to provide real-time insights into Bitcoin market trends.',
      'Our data-driven solutions empowers individuals and businesses with advanced market analytics, enabling them to navigate the volatile crypto landscape with precision and confidence.',
    ],
    disclaimer:
      'This service does not provide financial or investment advice. All signals are generated automatically and should not be relied upon for making trading decisions. Users should conduct their own research before investing. By using this service, you acknowledge that trading cryptocurrencies carries risk and that past performance is not indicative of future results.',
  },
}

export default config
