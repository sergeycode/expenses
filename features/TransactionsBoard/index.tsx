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
} from '@chakra-ui/react';
import { collection, orderBy, where, query } from 'firebase/firestore';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { DocumentData } from '@firebase/firestore-types';
import TransactionRow from '@/components/UI/TransactionRow';

const summarizeByType = (type: string, transactions: DocumentData[]) => {
  const total = transactions.reduce((acc: number, curr: any) => {
    if (curr.type === type) {
      return acc + curr.amount;
    }
    return acc;
  }, 0);
  return total;
};
//.toFixed(2)
// income - expense
const summarizeTotal = (transactions: DocumentData[]) => {
  const income = summarizeByType('income', transactions);
  const expense = summarizeByType('expense', transactions);
  return income - expense;
};

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

  if (error) {
    return <Box>{error.message}</Box>;
  }

  if (status === 'loading') {
    return <Box>loading...</Box>;
  }

  return (
    <Box my={8}>
      <Heading as="h2" fontSize="2xl" mb={4}>
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
              {transactions.map((transaction) => (
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
                  ${summarizeByType('expense', transactions).toFixed(2)}
                </Th>
                <Th></Th>
              </Tr>
              <Tr>
                <Th></Th>
                <Th></Th>
                <Th>Total Income</Th>
                <Th isNumeric fontSize="lg">
                  ${summarizeByType('income', transactions).toFixed(2)}
                </Th>
                <Th></Th>
              </Tr>
              <Tr>
                <Th></Th>
                <Th></Th>
                <Th>Total Balance</Th>
                <Th isNumeric fontSize="lg">
                  ${summarizeTotal(transactions).toFixed(2)}
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
