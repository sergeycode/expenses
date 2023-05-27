import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
} from '@chakra-ui/react';
import Meta from '@/components/Meta';
import { InputErrorMessage } from '@/components/Form/InputErrorMessage';
import NextLink from 'next/link';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useUser } from 'reactfire';
import { useState, useEffect } from 'react';

const FormSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

export default function Login() {
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [submitError, setSubmitError] = useState<string>('');

  const { data: user } = useUser();
  const router = useRouter();

  // redirect to dashboard if user is logged in
  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user]);

  const handleSendResetEmail = async ({ email }: { email: string }) => {
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage(
        'Password reset email sent. Please check your email for further instructions.'
      );
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const errorMessages: { [key: string]: string } = {
        'auth/invalid-email': 'Invalid email',
        'auth/user-not-found': 'User not found',
      };
      setSubmitError(errorMessages[errorCode] || errorMessage);
    }
  };

  return (
    <>
      <Meta title="Reset Password" description="Reset Password" />
      <Flex minH={'100vh'} align={'center'} justify={'center'} bg="gray.50">
        <Stack spacing={8} mx={'auto'} w="400px" maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Reset Password</Heading>
          </Stack>
          <Box rounded={'lg'} bg="white" boxShadow={'lg'} p={8}>
            <Formik
              initialValues={{
                email: '',
              }}
              validationSchema={FormSchema}
              onSubmit={(values) =>
                handleSendResetEmail({
                  email: values.email,
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
                    <FormControl isInvalid={'email' in errors && touched.email}>
                      <FormLabel>Email</FormLabel>
                      <Input
                        type="email"
                        disabled={successMessage !== ''}
                        onChange={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                      />
                      <InputErrorMessage error={errors.email} />
                    </FormControl>
                    <Stack spacing={10}>
                      <Button
                        isLoading={isSubmitting}
                        isDisabled={isSubmitting || successMessage !== ''}
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                          bg: 'blue.500',
                        }}
                        onClick={() => handleSubmit()}
                      >
                        Reset Password
                      </Button>
                    </Stack>
                    {submitError && (
                      <Box fontSize="xs" mt="1" color="red">
                        {submitError}
                      </Box>
                    )}
                    <Stack pt={6}>
                      {successMessage && (
                        <Box fontSize="sm" mt="1">
                          {successMessage}
                        </Box>
                      )}
                      <Text align={'center'}>
                        <Link as={NextLink} href={'/login'} color={'blue.400'}>
                          Back to Login
                        </Link>
                      </Text>
                    </Stack>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
