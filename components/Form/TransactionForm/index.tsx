import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Stack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { InputErrorMessage } from '@/components/Form/InputErrorMessage';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useUser, useFirestore } from 'reactfire';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const FormSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  // amount more then 0
  amount: Yup.number()
    .positive('Amount must be more than 0')
    .required('Amount is required'),
  date: Yup.date()
    .max(new Date(), 'Date must not be later than today')
    .required('Date is required'),
});

export default function TransactionForm({
  type,
  onClose,
  isOpen,
  data,
}: {
  type: 'expense' | 'income';
  onClose: () => void;
  isOpen: boolean;
  data?: {
    id: string;
    title: string;
    amount: number;
    date: string;
    type: string;
  };
}) {
  const { data: user } = useUser();
  const firestore = useFirestore();

  const handleAddExpense = async ({
    id,
    userId,
    title,
    amount,
    date,
    type,
  }: {
    id?: string;
    userId: string;
    title: string;
    amount: number;
    date: string;
    type: string;
  }) => {
    try {
      const transactionsRef = collection(firestore, 'transactions');
      let transactionUpdateRef;

      if (id) {
        transactionUpdateRef = doc(firestore, 'transactions', id as string);
        await updateDoc(transactionUpdateRef, {
          userId,
          title,
          amount,
          date,
          type,
        });
      } else {
        await addDoc(transactionsRef, {
          userId,
          title,
          amount,
          date,
          type,
        });
      }

      onClose();
      toast.success(`${type} added successfully!`);
    } catch (error) {
      onClose();
      toast.error(`Error adding ${type}: ${error}`);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent px={4} py={6}>
        <ModalHeader textTransform="capitalize">
          {data?.id ? 'Edit' : 'Add'} {type}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              title: data?.title || '',
              amount: data?.amount || 0,
              date: data?.date || '',
              type: data?.type || '',
            }}
            validationSchema={FormSchema}
            onSubmit={(values) =>
              handleAddExpense({
                id: data?.id,
                userId: user?.uid as string,
                title: values.title,
                amount: values.amount,
                date: values.date,
                type: type,
              })
            }
          >
            {({
              errors,
              touched,
              isSubmitting,
              handleSubmit,
              handleChange,
              handleBlur,
              values,
            }) => (
              <Form>
                <Stack spacing={4}>
                  <FormControl isInvalid={'title' in errors && touched.title}>
                    <FormLabel>Title</FormLabel>
                    <Input
                      type="text"
                      onChange={handleChange('title')}
                      onBlur={handleBlur('title')}
                      value={values.title}
                    />
                    <InputErrorMessage error={errors.title} />
                  </FormControl>
                  <FormControl isInvalid={'amount' in errors && touched.amount}>
                    <FormLabel>Amount</FormLabel>
                    <Input
                      type="number"
                      onChange={handleChange('amount')}
                      onBlur={handleBlur('amount')}
                      value={values.amount}
                    />
                    <InputErrorMessage error={errors.amount} />
                  </FormControl>
                  <FormControl isInvalid={'date' in errors && touched.date}>
                    <FormLabel>Date</FormLabel>
                    <Input
                      type="date"
                      onChange={handleChange('date')}
                      onBlur={handleBlur('date')}
                      value={values.date}
                    />
                    <InputErrorMessage error={errors.date} />
                  </FormControl>
                  <Stack spacing={10} pt={2}>
                    <Button
                      variant="gradient"
                      isLoading={isSubmitting}
                      isDisabled={isSubmitting}
                      minH="45px"
                      fontSize="lg"
                      onClick={() => handleSubmit()}
                    >
                      <Box zIndex="1" color={'white'}>
                        Submit
                      </Box>
                    </Button>
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
