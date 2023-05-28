import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
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
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useUser } from 'reactfire';
import { useState, useEffect } from 'react';

const FormSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
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

  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const errorMessages: { [key: string]: string } = {
        'auth/invalid-email': 'Invalid email address format',
        'auth/user-disabled': 'This account has been disabled',
        'auth/user-not-found': 'No user found with this email address',
        'auth/wrong-password': 'Incorrect password',
      };
      // show error message to user
      setSubmitError(errorMessages[errorCode] || errorMessage);
    }
  };

  return (
    <>
      <Meta title="Login" description="Login to start using Expenses" />
      <Flex minH={'100vh'} align={'center'} justify={'center'} bg="gray.50">
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading
              bgGradient="linear(to-r, #4158D0, #C850C0, #FFCC70)"
              bgClip="text"
              fontSize={'4xl'}
            >
              Sign in to your account
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to start using Expenses
            </Text>
          </Stack>
          <Box rounded={'lg'} bg="white" boxShadow={'lg'} p={8}>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={FormSchema}
              onSubmit={(values) =>
                handleLogin({
                  email: values.email,
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
                <Form>
                  <Stack spacing={4}>
                    <FormControl isInvalid={'email' in errors && touched.email}>
                      <FormLabel>Email</FormLabel>
                      <Input
                        type="email"
                        onChange={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                      />
                      <InputErrorMessage error={errors.email} />
                    </FormControl>
                    <FormControl
                      isInvalid={'password' in errors && touched.password}
                    >
                      <FormLabel>Password</FormLabel>
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
                      <Stack
                        direction={{ base: 'column', sm: 'row' }}
                        align={'start'}
                        justify={'space-between'}
                      >
                        <Link
                          as={NextLink}
                          href="/forgot-password"
                          color={'blue.400'}
                        >
                          Forgot password?
                        </Link>
                      </Stack>
                      <Button
                        minH="45px"
                        fontSize="lg"
                        variant="gradient"
                        isLoading={isSubmitting}
                        isDisabled={isSubmitting}
                        onClick={() => handleSubmit()}
                      >
                        <Box zIndex="1" color={'white'}>
                          Login
                        </Box>
                      </Button>
                    </Stack>
                    {submitError && (
                      <Box fontSize="xs" mt="1" color="red">
                        {submitError}
                      </Box>
                    )}
                    <Stack pt={6}>
                      <Text align={'center'}>
                        Don't have an account?{' '}
                        <Link as={NextLink} href={'/signup'} color={'blue.400'}>
                          Sign Up
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
