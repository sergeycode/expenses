import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import Image from 'next/image';
import payOnline from '/public/images/pay-online.svg';
import savings from '/public/images/savings.svg';
import TransactionForm from '@/components/Form/TransactionForm';

export default function TransactionCard({
  type,
}: {
  type: 'expense' | 'income';
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
      borderRadius="3xl"
    >
      <Image
        width={150}
        height={150}
        src={type === 'expense' ? payOnline : savings}
        alt={type === 'expense' ? 'Pay online' : 'Savings'}
      />

      <Stack>
        <CardBody>
          <Heading size="md">The perfect latte</Heading>

          <Text py="2">
            Caffè latte is a coffee beverage of Italian origin made with
            espresso and steamed milk.
          </Text>
        </CardBody>

        <CardFooter>
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={onOpen}
            textTransform="capitalize"
          >
            Add {type}
          </Button>
        </CardFooter>
      </Stack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent px={4} py={6}>
          <ModalHeader textTransform="capitalize">Add {type}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TransactionForm type={type} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Card>
  );
}
