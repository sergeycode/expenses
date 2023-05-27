import { Tr, Td, Button, HStack, useDisclosure } from '@chakra-ui/react';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  EditIcon,
  DeleteIcon,
} from '@chakra-ui/icons';
import TransactionForm from '@/components/Form/TransactionForm';

const formatDate = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function TransactionRow({
  id,
  type,
  title,
  amount,
  date,
}: {
  id: string;
  type: 'expense' | 'income';
  title: string;
  amount: number;
  date: string;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Tr>
        <Td fontWeight="semibold" textTransform="capitalize">
          {type === 'expense' ? (
            <ArrowDownIcon color="red.500" />
          ) : (
            <ArrowUpIcon color="green.500" />
          )}
          {type}
        </Td>
        <Td>{title}</Td>
        <Td>{formatDate(date)}</Td>
        <Td fontWeight="semibold" isNumeric>
          {type === 'expense' && '-'} ${amount}
        </Td>
        <Td>
          <HStack>
            <Button
              colorScheme="green"
              variant="outline"
              size="sm"
              leftIcon={<EditIcon />}
              onClick={onOpen}
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
      <TransactionForm
        data={{
          id: id,
          title: title,
          amount: amount,
          date: date,
          type: type,
        }}
        onClose={onClose}
        isOpen={isOpen}
        type={type}
      />
    </>
  );
}
