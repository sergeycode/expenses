import { Grid, GridItem } from '@chakra-ui/react';
import TransactionCard from '@/components/UI/TransactionCard';

export default function AddTransactions() {
  return (
    <Grid my={8} gap={8} templateColumns={{ lg: 'repeat(2, 1fr)' }}>
      <GridItem>
        <TransactionCard type="expense" />
      </GridItem>
      <GridItem>
        <TransactionCard type="income" />
      </GridItem>
    </Grid>
  );
}
