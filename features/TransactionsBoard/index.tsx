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
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { collection, orderBy, where, query } from 'firebase/firestore';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';

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

  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const summarizeAllTransactions = () => {
    const total = transactions.reduce((acc: number, curr: any) => {
      return acc + curr.amount;
    }, 0);
    return total;
  };

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
      <TableContainer boxShadow="md">
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
              <Tr
                bgColor={
                  transaction.type === 'expense' ? 'red.100' : 'green.100'
                }
                key={transaction.id}
              >
                <Td fontWeight="semibold" textTransform="capitalize">
                  {transaction.type}
                </Td>
                <Td>{transaction.title}</Td>
                <Td>{formatDate(transaction.date)}</Td>
                <Td fontWeight="semibold" isNumeric>
                  ${transaction.amount}
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
              <Th>Total</Th>
              <Th isNumeric fontSize="lg">
                ${summarizeAllTransactions()}
              </Th>
              <Th></Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
}
