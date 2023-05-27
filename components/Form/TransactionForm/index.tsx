import { FormControl, FormLabel, Input, Stack, Button } from '@chakra-ui/react';
import { InputErrorMessage } from '@/components/Form/InputErrorMessage';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useUser, useFirestore } from 'reactfire';
import { collection, addDoc } from 'firebase/firestore';
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
}: {
  type: 'expense' | 'income';
  onClose: () => void;
}) {
  const { data: user } = useUser();
  const firestore = useFirestore();

  const handleAddExpense = async ({
    userId,
    title,
    amount,
    date,
    type,
  }: {
    userId: string;
    title: string;
    amount: number;
    date: string;
    type: string;
  }) => {
    try {
      const transactionsRef = collection(firestore, 'transactions');
      await addDoc(transactionsRef, {
        userId,
        title,
        amount,
        date,
        type,
      });
      onClose();
      toast.success(`${type} added successfully!`);
    } catch (error) {
      onClose();
      toast.error(`Error adding ${type}: ${error}`);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          title: '',
          amount: 0,
          date: '',
          type: '',
        }}
        validationSchema={FormSchema}
        onSubmit={(values) =>
          handleAddExpense({
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
                  isLoading={isSubmitting}
                  isDisabled={isSubmitting}
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={() => handleSubmit()}
                >
                  Submit
                </Button>
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
    </>
  );
}
