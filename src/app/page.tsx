"use client"

import Image from "next/image";
import Link from "next/link";
import { Pie } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { ArcElement, Tooltip, Legend, Title, Chart as ChartJS } from 'chart.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function Home() {

  const data = {
    labels: ['BTC', 'BTC ETF', 'USDT'],
    datasets: [
      {
        data: [43, 21, 36],
        backgroundColor: ['#4C5CD3', '#4A63A8', '#6A86D9'],
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto">
      <div className='flex gap-3 items-center pt-12 pb-24'>
        <div className='lg:w-[68px] lg:h-[68px] md:w-[58px] md:h-[58px] w-[50px] h-[50px] relative'>
          <Image src='/logo.png' alt='logo' fill />
        </div>
      </div>
      <div className='text-3xl pb-12'>
        Empowering smarter financial decisions for a more secure future
      </div>
      <div className='flex gap-2'>
        <div className='font-sans text-sm py-3 px-6 border max-w-max bg-blue text-white rounded-full cursor-pointer'>Browse Publications</div>
        <div className='py-3 px-6 border max-w-max rounded-full cursor-pointer flex items-center'>
          <div className='font-sans text-sm mr-1'>Follow Us on</div>
          <div className='w-[16px] h-[16px]'>
            <FontAwesomeIcon icon={faXTwitter} size='xs' />
          </div>
        </div>
      </div>
      <div className='font-sans text-xl underline pb-2 pt-12'>What We Do</div>
      <div>We create engaging articles to educate and inspire our readers. <Link href='https://medium.com/' rel="noopener noreferrer" target="_blank">Our publications</Link> focus on trading and financial psychology, helping people cultivate a deeper understanding of investments.</div>
      <div className='font-sans text-xl underline pb-2 pt-12'>Public Portfolio</div>
      <div className='pb-12'>Our transparent portfolio highlights the investments we monitor and evaluate. By sharing this, we hope to simplify the complexity of investing and provide useful ideas.</div>
      <div className='flex justify-center pb-12'>
        <div className='md:w-1/2 w-full'>
          <Pie data={data as ChartData<'pie'>} options={options} />
        </div>
      </div>
      <div className='pb-24'>Our portfolio is heavily weighted in Bitcoin, reflecting our strong conviction in its long-term value and the role it can play in securing financial freedom. While we actively monitor and analyze a range of assets, Bitcoin remains the cornerstone of our investment strategy.</div>
      <div className='font-sans text-xs pb-12'>© 2024, Cultus Ventures</div>
    </div>
  );
}
