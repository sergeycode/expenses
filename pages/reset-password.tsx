import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import Meta from '@/components/Meta';
import { InputErrorMessage } from '@/components/Form/InputErrorMessage';
import NextLink from 'next/link';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { getAuth, confirmPasswordReset } from 'firebase/auth';
import { useUser } from 'reactfire';
import { useState, useEffect } from 'react';

const FormSchema = Yup.object().shape({
  password: Yup.string().required('Password is required'),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');

  const { data: user } = useUser();
  const router = useRouter();

  // redirect to dashboard if user is logged in
  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user]);

  const ooBCode = router.query.oobCode;

  const handleConfirmPasswordReset = async ({
    password,
  }: {
    password: string;
  }) => {
    const auth = getAuth();
    try {
      if (ooBCode) {
        await confirmPasswordReset(auth, ooBCode as string, password);
        router.push('/login');
      } else {
        setSubmitError('Something went wrong. Please try again.');
      }
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const errorMessages: { [key: string]: string } = {
        'auth/expired-action-code': 'The action code has expired.',
        'auth/invalid-action-code': 'The action code is invalid.',
        'auth/user-disabled':
          'The user corresponding to the given action code has been disabled.',
        'auth/user-not-found':
          'The user corresponding to the given action code was not found.',
        'auth/weak-password': 'The password must be 6 characters long or more.',
      };
      setSubmitError(errorMessages[errorCode] || errorMessage);
    }
  };

  return (
    <>
      <Meta title="Login" description="Login to start using Expenses" />
      <Flex minH={'100vh'} align={'center'} justify={'center'} bg="gray.50">
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Reset Your Password</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              Enter your new password below.
            </Text>
          </Stack>
          <Box rounded={'lg'} bg="white" boxShadow={'lg'} p={8}>
            <Formik
              initialValues={{
                password: '',
              }}
              validationSchema={FormSchema}
              onSubmit={(values) =>
                handleConfirmPasswordReset({
                  password: values.password,
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
                <Stack spacing={4}>
                  <FormControl
                    isInvalid={'password' in errors && touched.password}
                  >
                    <FormLabel>New Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        onChange={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                      />
                      <InputRightElement h={'full'}>
                        <Button
                          variant={'ghost'}
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }
                        >
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <InputErrorMessage error={errors.password} />
                  </FormControl>
                  <Stack spacing={10}>
                    <Button
                      isLoading={isSubmitting}
                      isDisabled={isSubmitting}
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
                  {submitError && (
                    <Box fontSize="xs" mt="1" color="red">
                      {submitError}
                    </Box>
                  )}
                  <Stack pt={6}>
                    <Text align={'center'}>
                      <Link as={NextLink} href={'/login'} color={'blue.400'}>
                        Back to Login
                      </Link>
                    </Text>
                  </Stack>
                </Stack>
              )}
            </Formik>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}