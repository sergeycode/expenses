import { Tr, Td, Button, HStack, useDisclosure } from '@chakra-ui/react';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  EditIcon,
  DeleteIcon,
} from '@chakra-ui/icons';
import TransactionForm from '@/components/Form/TransactionForm';
import { deleteDoc, doc } from 'firebase/firestore';
import { useFirestore } from 'reactfire';
import { toast } from 'react-hot-toast';
import { useUser } from 'reactfire';
import { useHandleTransaction } from '@/hooks/handleTransaction';
import { formatFormDate, formatDateToString } from '@/utils/helpers';
import { IValues } from '@/components/Form/TransactionForm';

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
  const firestore = useFirestore();
  const documentRef = doc(firestore, 'transactions', id);

  const { data: user } = useUser();

  const { handleTransaction } = useHandleTransaction();

  const handleSubmit = async (values: IValues) => {
    try {
      await handleTransaction({
        userId: user?.uid as string,
        title: values.title,
        amount: values.amount,
        date: formatFormDate(new Date(values.date)),
        type: type,
      });
      onClose();
      toast.success(`${type} added successfully!`);
    } catch (error) {
      onClose();
      toast.error(`Error adding ${type}: ${error}`);
    }
  };

  const deteleTransaction = async () => {
    try {
      await deleteDoc(documentRef);
      toast.success(`${title} ${type} deleted successfully.`);
    } catch (error) {
      toast.error(`Error deleting ${title} ${type}: ${error}`);
    }
  };
  return (
    <>
      <Tr>
        <Td fontWeight="semibold" textTransform="capitalize">
          {type === 'expense' ? (
            <ArrowDownIcon color="pink.400" />
          ) : (
            <ArrowUpIcon color="teal.400" />
          )}
          {type}
        </Td>
        <Td>{title}</Td>
        <Td>{formatDateToString(date)}</Td>
        <Td fontWeight="semibold" isNumeric>
          {type === 'expense' && '-'} ${amount}
        </Td>
        <Td>
          <HStack>
            <Button
              borderRadius="xl"
              colorScheme="teal"
              variant="outline"
              size="sm"
              leftIcon={<EditIcon />}
              onClick={onOpen}
            >
              Edit
            </Button>
            <Button
              borderRadius="xl"
              colorScheme="pink"
              variant="outline"
              size="sm"
              leftIcon={<DeleteIcon />}
              onClick={deteleTransaction}
            >
              Delete
            </Button>
          </HStack>
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
            onSubmit={handleSubmit}
          />
        </Td>
      </Tr>
    </>
  );
}
