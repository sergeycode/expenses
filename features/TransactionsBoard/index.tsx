import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Button,
  HStack,
  Box,
} from '@chakra-ui/react';
import {
  DeleteIcon,
  EditIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@chakra-ui/icons';
import { collection, orderBy, where, query } from 'firebase/firestore';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { DocumentData } from '@firebase/firestore-types';

const formatDate = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const summarizeByType = (type: string, transactions: DocumentData[]) => {
  const total = transactions.reduce((acc: number, curr: any) => {
    if (curr.type === type) {
      return acc + curr.amount;
    }
    return acc;
  }, 0);
  return total;
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
            {transactions.map((transaction: any) => (
              <Tr key={transaction.id}>
                <Td fontWeight="semibold" textTransform="capitalize">
                  {transaction.type === 'expense' ? (
                    <ArrowDownIcon color="red.500" />
                  ) : (
                    <ArrowUpIcon color="green.500" />
                  )}
                  {transaction.type}
                </Td>
                <Td>{transaction.title}</Td>
                <Td>{formatDate(transaction.date)}</Td>
                <Td fontWeight="semibold" isNumeric>
                  {transaction.type === 'expense' && '-'} ${transaction.amount}
                </Td>
                <Td>
                  <HStack>
                    <Button
                      colorScheme="green"
                      variant="outline"
                      size="sm"
                      leftIcon={<EditIcon />}
                    >
                      Edit
                    </Button>
                    <Button
                      colorScheme="red"
                      variant="outline"
                      size="sm"
                      leftIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot bgColor="gray.100">
            <Tr>
              <Th></Th>
              <Th></Th>
              <Th>Total Expenses</Th>
              <Th isNumeric fontSize="lg">
                ${summarizeByType('expense', transactions)}
              </Th>
              <Th></Th>
            </Tr>
            <Tr>
              <Th></Th>
              <Th></Th>
              <Th>Total Income</Th>
              <Th isNumeric fontSize="lg">
                ${summarizeByType('income', transactions)}
              </Th>
              <Th></Th>
            </Tr>
            <Tr>
              <Th></Th>
              <Th></Th>
              <Th>Total Balance</Th>
              <Th isNumeric fontSize="lg">
                $
                {summarizeByType('income', transactions) -
                  summarizeByType('expense', transactions)}
              </Th>
              <Th></Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
}
