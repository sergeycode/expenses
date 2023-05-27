import { Skeleton, Box, Stack, Container } from '@chakra-ui/react';
import Meta from '@/components/Meta';
import Layout from '@/components/Layout';
import Hero from '@/components/UI/Hero';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUser } from 'reactfire';
import AddTransactions from '@/features/AddTransactions';
import TransactionsBoard from '@/features/TransactionsBoard';

export default function Home() {
  const { error, status, data: user } = useUser();
  const router = useRouter();

  // redirect to login if user is not logged in
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);

  if (error) {
    return <Box>{error.message}</Box>;
  }

  if (user === null || status === 'loading') {
    return (
      <Container>
        <Stack>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      </Container>
    );
  }

  return (
    <>
      <Meta
        title="Expenses Dashboard"
        description="Expenses Dashboard. Manage your Expenses here"
      />
      <Layout>
        <Hero title="Dashboard" name={user?.displayName} email={user?.email} />
        <AddTransactions />
        <TransactionsBoard user={user} />
      </Layout>
    </>
  );
}
