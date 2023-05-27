import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  Link,
} from '@chakra-ui/react';
import Meta from '@/components/Meta';
import { InputErrorMessage } from '@/components/Form/InputErrorMessage';
import { useState, useEffect } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { useUser } from 'reactfire';

const FormSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .matches(
      /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      'Password must have a special character'
    )
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

export default function Signup() {
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

  const handleSignup = async ({
    firstName,
    lastName,
    email,
    password,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    const auth = getAuth();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const errorMessages: { [key: string]: string } = {
        'auth/email-already-in-use': 'Email already in use',
        'auth/invalid-email': 'Invalid email',
        'auth/weak-password': 'Weak password',
      };
      // show error message to user
      setSubmitError(errorMessages[errorCode] || errorMessage);
    } finally {
      // update profile with first and last name
      const currentUser = auth.currentUser;

      if (currentUser) {
        await updateProfile(currentUser, {
          displayName: `${firstName} ${lastName}`,
        });
      }

      // redirect to dashboard
      router.push('/dashboard');
    }
  };

  return (
    <>
      <Meta title="Sign up" description="Sign up to start using Expenses" />
      <Flex minH={'100vh'} align={'center'} justify={'center'} bg="gray.50">
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to start using Expenses
            </Text>
          </Stack>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
            }}
            validationSchema={FormSchema}
            onSubmit={(values) =>
              handleSignup({
                firstName: values.firstName,
                lastName: values.lastName,
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
                <Box rounded={'lg'} bg="white" boxShadow={'lg'} p={8}>
                  <Stack spacing={4}>
                    <HStack>
                      <Box>
                        <FormControl
                          isInvalid={'firstName' in errors && touched.firstName}
                        >
                          <FormLabel>First Name</FormLabel>
                          <Input
                            type="text"
                            onChange={handleChange('firstName')}
                            onBlur={handleBlur('firstName')}
                            value={values.firstName}
                          />
                          <InputErrorMessage error={errors.firstName} />
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl
                          isInvalid={'lastName' in errors && touched.lastName}
                        >
                          <FormLabel>Last Name</FormLabel>
                          <Input
                            type="text"
                            onChange={handleChange('lastName')}
                            onBlur={handleBlur('lastName')}
                            value={values.lastName}
                          />
                          <InputErrorMessage error={errors.lastName} />
                        </FormControl>
                      </Box>
                    </HStack>
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
                        Sign up
                      </Button>
                    </Stack>
                    {submitError && (
                      <Box fontSize="xs" mt="1" color="red">
                        {submitError}
                      </Box>
                    )}
                    <Stack pt={6}>
                      <Text align={'center'}>
                        Already a user?{' '}
                        <Link as={NextLink} href={'/login'} color={'blue.400'}>
                          Login
                        </Link>
                      </Text>
                    </Stack>
                  </Stack>
                </Box>
              </Form>
            )}
          </Formik>
        </Stack>
      </Flex>
    </>
  );
}
