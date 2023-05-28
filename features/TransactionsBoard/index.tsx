import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  TableContainer,
  Heading,
  Box,
  Switch,
  Stack,
  HStack,
  Select,
  Button,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { collection, orderBy, where, query } from 'firebase/firestore';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { DocumentData } from '@firebase/firestore-types';
import TransactionRow from '@/components/UI/TransactionRow';
import { useState, useEffect } from 'react';

const summarizeByType = (type: string, transactions: DocumentData[]) => {
  const total = transactions?.reduce((acc: number, curr: any) => {
    if (curr.type === type) {
      return acc + curr.amount;
    }
    return acc;
  }, 0);
  return total;
};

const summarizeTotal = (transactions: DocumentData[]) => {
  const income = summarizeByType('income', transactions);
  const expense = summarizeByType('expense', transactions);
  return income - expense;
};

const months = [
  { value: 'all', label: 'All' },
  { value: '2023-01', label: 'January 2023' },
  { value: '2023-02', label: 'February 2023' },
  { value: '2023-03', label: 'March 2023' },
  { value: '2023-04', label: 'April 2023' },
  { value: '2023-05', label: 'May 2023' },
  { value: '2023-06', label: 'June 2023' },
  { value: '2023-07', label: 'July 2023' },
  { value: '2023-08', label: 'August 2023' },
  { value: '2023-09', label: 'September 2023' },
  { value: '2023-10', label: 'October 2023' },
  { value: '2023-11', label: 'November 2023' },
  { value: '2023-12', label: 'December 2023' },
];

export default function TransactionsBoard({ user }: { user: any }) {
  const firestore = useFirestore();
  const transactionsCollection = collection(firestore, 'transactions');
  const transactionsQuery = query(
    transactionsCollection,
    orderBy('date', 'desc'),
    where('userId', '==', user.uid)
  );
  const {
    error,
    status,
    data: transactions,
  } = useFirestoreCollectionData(transactionsQuery, {
    idField: 'id',
  });

  const [filter, setFilter] = useState<DocumentData[]>([]);
  const [activeSwitch, setActiveSwitch] = useState<string | null>(null);
  const [activeMonth, setActiveMonth] = useState<string>('all');

  const filterAllTransactionsBy = ({
    type,
    month,
  }: {
    type: string;
    month: string;
  }) => {
    let filteredTransactions = transactions;

    if (type !== 'all') {
      filteredTransactions = filteredTransactions.filter(
        (transaction) => transaction.type === type
      );
    }

    if (month !== 'all') {
      filteredTransactions = filteredTransactions.filter((transaction) =>
        transaction.date.startsWith(month)
      );
    }

    setFilter(filteredTransactions);
  };

  const handleSwitchChange = (type: string) => {
    if (type === activeSwitch) {
      setActiveSwitch(null);
      filterAllTransactionsBy({ type: 'all', month: activeMonth });
    } else {
      setActiveSwitch(type);
      filterAllTransactionsBy({ type, month: activeMonth });
    }
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const month = event.target.value;
    setActiveMonth(month);
    filterAllTransactionsBy({ type: activeSwitch || 'all', month });
  };

  const handleResetFilters = () => {
    setActiveSwitch(null);
    setActiveMonth('all');
    filterAllTransactionsBy({ type: 'all', month: 'all' });
  };

  useEffect(() => {
    setFilter(transactions);
    filterAllTransactionsBy({
      type: activeSwitch || 'all',
      month: activeMonth || 'all',
    });
  }, [transactions]);

  if (error) {
    return <Box>{error.message}</Box>;
  }

  if (status === 'loading') {
    return <Box>loading...</Box>;
  }

  return (
    <Box my={8}>
      {/* Filters */}
      <Box
        mb={4}
        border="1px solid"
        borderColor="chakra-border-color"
        borderRadius="xl"
        px={6}
        py={6}
      >
        <Box fontSize="md" fontWeight="semibold" mb={4}>
          Filter Transactions
        </Box>
        <Grid
          gap={4}
          templateColumns={{ lg: '2fr 5fr 2fr' }}
          alignItems="center"
        >
          <GridItem>
            <HStack>
              <Stack>
                <Box fontSize="xs" fontWeight="semibold">
                  By Income
                </Box>
                <Switch
                  colorScheme="teal"
                  size="lg"
                  onChange={() => handleSwitchChange('income')}
                  isChecked={activeSwitch === 'income'}
                />
              </Stack>
              <Stack>
                <Box fontSize="xs" fontWeight="semibold">
                  By Expense
                </Box>
                <Switch
                  colorScheme="pink"
                  size="lg"
                  onChange={() => handleSwitchChange('expense')}
                  isChecked={activeSwitch === 'expense'}
                />
              </Stack>
            </HStack>
          </GridItem>
          <GridItem>
            <Stack>
              <Box fontSize="xs" fontWeight="semibold">
                By Month
              </Box>
              <Select
                maxW="300px"
                value={activeMonth}
                onChange={handleMonthChange}
              >
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </Select>
            </Stack>
          </GridItem>
          <GridItem>
            <Button variant="gradient" onClick={handleResetFilters}>
              <Box zIndex={1} color="white">
                Reset Filters
              </Box>
            </Button>
          </GridItem>
        </Grid>
      </Box>

      {/* Transactions */}
      <Heading
        as="h2"
        fontSize="2xl"
        mb={4}
        bgGradient="linear(to-r, #4158D0, #C850C0, #FFCC70)"
        bgClip="text"
      >
        Transactions
      </Heading>
      {transactions.length > 0 && (
        <TableContainer border="1px solid" borderColor="gray.100">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Type</Th>
                <Th>Date</Th>
                <Th isNumeric>Amount</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filter?.length > 0 &&
                filter.map((transaction) => (
                  <TransactionRow
                    key={transaction.id}
                    id={transaction.id}
                    title={transaction.title}
                    type={transaction.type}
                    date={transaction.date}
                    amount={transaction.amount}
                  />
                ))}
            </Tbody>
            <Tfoot bgColor="gray.100">
              <Tr>
                <Th></Th>
                <Th></Th>
                <Th>Total Expenses</Th>
                <Th isNumeric fontSize="lg">
                  ${filter && summarizeByType('expense', filter).toFixed(2)}
                </Th>
                <Th></Th>
              </Tr>
              <Tr>
                <Th></Th>
                <Th></Th>
                <Th>Total Income</Th>
                <Th isNumeric fontSize="lg">
                  ${filter && summarizeByType('income', filter).toFixed(2)}
                </Th>
                <Th></Th>
              </Tr>
              <Tr>
                <Th></Th>
                <Th></Th>
                <Th>Total Balance</Th>
                <Th isNumeric fontSize="lg">
                  ${filter && summarizeTotal(filter).toFixed(2)}
                </Th>
                <Th></Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      )}
      {transactions.length === 0 && (
        <Box textAlign="center" fontSize="lg">
          No transactions yet. Please add one.
        </Box>
      )}
    </Box>
  );
}
