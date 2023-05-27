import {
  Table,
  Thead,
  Tbody,
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
import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire';
import { useEffect, useState } from 'react';

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
    <TableContainer my={8}>
      <Heading as="h2" fontSize="2xl" mb={4}>
        Transactions
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Type</Th>
            <Th isNumeric>Amount</Th>
            <Th>Date</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactions.map((transaction: any) => (
            <Tr
              bgColor={transaction.type === 'expense' ? 'red.100' : 'green.100'}
              key={transaction.id}
            >
              <Td>
                <Box textTransform="capitalize">{transaction.type}</Box>
              </Td>
              <Td>{transaction.title}</Td>
              <Td isNumeric>${transaction.amount}</Td>
              <Td>{transaction.date}</Td>
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
      </Table>
    </TableContainer>
  );
}
