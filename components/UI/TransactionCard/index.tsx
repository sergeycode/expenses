import {
  Card,
  CardBody,
  Box,
  Stack,
  Heading,
  Text,
  Button,
  Grid,
  GridItem,
  useDisclosure,
} from '@chakra-ui/react';
import TransactionForm from '@/components/Form/TransactionForm';
import { useUser } from 'reactfire';
import { useHandleTransaction } from '@/hooks/handleTransaction';
import toast from 'react-hot-toast';
import { formatFormDate } from '@/utils/helpers';
import { IValues } from '@/components/Form/TransactionForm';

export default function TransactionCard({
  type,
}: {
  type: 'expense' | 'income';
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
      borderRadius="3xl"
    >
      <Stack>
        <CardBody as={Grid} gap={2} templateColumns={{ md: '10fr 2fr' }}>
          <GridItem>
            <Heading
              bgGradient="linear(to-r, #4158D0, #C850C0, #FFCC70)"
              bgClip="text"
              fontSize="xl"
              textTransform="capitalize"
            >
              Add {type}
            </Heading>

            <Text fontSize="md" py="2" color="gray.600">
              {type === 'expense' &&
                'Enter your expense details to track and analyze your spending habits effectively.'}
              {type === 'income' &&
                'Record your income sources for accurate financial analysis and budgeting.'}
            </Text>
          </GridItem>
          <GridItem>
            <Button
              borderRadius="xl"
              maxW="150px"
              variant="outline"
              colorScheme={type === 'expense' ? 'pink' : 'teal'}
              onClick={onOpen}
              textTransform="capitalize"
            >
              Add {type}
            </Button>
          </GridItem>
        </CardBody>
      </Stack>
      <TransactionForm
        type={type}
        onClose={onClose}
        isOpen={isOpen}
        onSubmit={handleSubmit}
      />
    </Card>
  );
}
