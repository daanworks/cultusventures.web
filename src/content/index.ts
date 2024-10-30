import { faLinkedin, faMedium, faTelegram, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;
import bitcoindollar from '../../public/bitcoindollar.jpg'
import dollarinhand from '../../public/dollarinhand.jpg'

const content = {
  lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  main: 'Empowering people to invest safely,<br /> build wealth, and confidently beat inflation for a more secure future',
  header: {
    left: [
      {
        title: 'about',
        link: '/about'
      },
      {
        title: 'positions',
        link: '/positions'
      }
    ],
    right: [
      {
        title: 'market reports',
        link: '/market-reports'
      },
      {
        title: 'contact',
        link: '/contact'
      }
    ],
  },
  socials: [
    {
      icon: faLinkedin,
      name: 'LinkedIn',
      link: 'https://www.lorem.com/'
    },
    {
      icon: faTelegram,
      name: 'Telegram',
      link: 'https://www.lorem.com/'
    },
    {
      icon: faMedium,
      name: 'Medium',
      link: 'https://www.lorem.com/'
    },
    {
      icon: faXTwitter,
      name: 'X',
      link: 'https://www.lorem.com/'
    },
  ],
  about: {
    publicPortfolio: {
      title: 'Public<br />Portfolio',
      text: 'Our Public Portfolio is a transparent showcase of diverse investment strategies, designed to help you navigate both traditional and emerging financial landscapes. We blend TradFi (traditional finance) approaches with crypto opportunities, offering an insightful look at how diversified strategies can work together to outpace inflation and grow wealth. By openly sharing our strategies and results, we aim to empower you with the confidence and knowledge needed to make informed investment decisions.',
      image: bitcoindollar.src
    },
    marketReports: {
      title: 'Market<br />Reports',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      image: dollarinhand.src
    }
  },
  positions: {
    title: 'Positions',
    description: 'Our Public Positions section provides an open view of Cultus Ventures’ current investment allocations across various asset classes. By showcasing our holdings, we aim to offer a clear, real-time example of how diversified investments can be structured to address market changes, inflation, and growth opportunities.<br /><br />Each position is shared with the purpose of education—giving you a reference point to understand asset choices, timing, and market responses. This transparency is designed to help you see the principles in action, empowering you to make informed decisions as you shape your own investment journey.'
  }
}

export default content