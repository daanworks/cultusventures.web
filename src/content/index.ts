import { faLinkedin, faMedium, faTelegram, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

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
        title: 'portfolio',
        link: '/portfolio'
      }
    ],
    right: [
      {
        title: 'faq',
        link: '/faq'
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
  ]
}

export default content