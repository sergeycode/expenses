import { Grid, GridItem } from '@chakra-ui/react';
import Meta from '@/components/Meta';
import Layout from '@/components/Layout';
import Hero from '@/components/UI/Hero';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUser } from 'reactfire';
import TransactionCard from '@/components/UI/TransactionCard';

export default function Home() {
  const { data: user } = useUser();
  const router = useRouter();

  // redirect to login if user is not logged in
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);

  return (
    <>
      <Meta
        title="Expenses Dashboard"
        description="Expenses Dashboard. Manage your Expenses here"
      />
      <Layout>
        <Hero title="Dashboard" name={user?.displayName} email={user?.email} />
        <Grid gap={8} templateColumns={{ lg: 'repeat(2, 1fr)' }}>
          <GridItem>
            <TransactionCard type="expense" />
          </GridItem>
          <GridItem>
            <TransactionCard type="income" />
          </GridItem>
        </Grid>
      </Layout>
    </>
  );
}
