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

export interface IValues {
  title: string;
  amount: number;
  date: string;
  type: string;
}

export default function TransactionForm({
  type,
  onClose,
  isOpen,
  data,
  onSubmit,
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
  onSubmit: (values: IValues) => void;
}) {
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
            onSubmit={(values) => onSubmit(values)}
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
