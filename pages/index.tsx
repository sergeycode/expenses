import Meta from '@/components/Meta';
import Layout from '@/components/Layout';
import MarketingHero from '@/features/MarketingHero';
import { CheckIcon, StarIcon, CalendarIcon } from '@chakra-ui/icons';

const marketingHero = {
  heading: 'Introducing Expenses Tracker',
  text: 'Enter your expense details to track and analyze your spending habits effectively. Record your income sources for accurate financial analysis and budgeting.',
  icons: [
    {
      icon: <StarIcon color="white" />,
      text: 'Track your expenses',
      iconBg: 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)',
    },
    {
      icon: <CalendarIcon color="white" />,
      text: 'Manage your income',
      iconBg: 'linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)',
    },
    {
      icon: <CheckIcon color="white" />,
      text: 'Filter monthly transactions',
      iconBg: 'linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)',
    },
  ],
  image: '/images/microsoft-365.jpg',
};

export default function Home() {
  return (
    <>
      <Meta title="Expenses" description="Expenses" />
      <Layout>
        <MarketingHero {...marketingHero} />
      </Layout>
    </>
  );
}
