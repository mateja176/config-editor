import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import React from 'react';
import { MdPerson } from 'react-icons/md';
import { useMutation } from 'react-query';
import { apiTokenKey } from '../../config/config';
import { InlineResponse200, LoginPostRequest } from '../../generated/api';
import { useLocalStorageItem } from '../../hooks/useLocalStorage';
import { api } from '../../services/api';
import { loginSchema, loginValues } from './utils';

export interface LoginProps {}

const Login: React.FC<LoginProps> = (props) => {
  const toast = useToast();

  const tokenItem = useLocalStorageItem<string>(apiTokenKey);

  const loginMutation = useMutation<InlineResponse200, Error, LoginPostRequest>(
    api.loginPost.bind(api),
    {
      onSuccess: ({ token }) => {
        toast({
          title: 'Logged in',
          description: `Welcome!`,
          status: 'success',
          isClosable: true,
        });

        if (token) {
          tokenItem.setItem(token);
        }
      },
      onError: async (error) => {
        toast({
          title: 'Failed to log in',
          description: error.message,
          status: 'error',
          isClosable: true,
        });
      },
    },
  );

  const loginForm = useFormik({
    validateOnMount: true,
    initialValues: loginValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      return loginMutation.mutateAsync({ inlineObject1: values });
    },
  });

  const hasEmailError = React.useMemo(
    () => !!(loginForm.touched.email && loginForm.errors.email),
    [loginForm],
  );
  const hasPasswordError = React.useMemo(
    () => !!(loginForm.touched.password && loginForm.errors.password),
    [loginForm],
  );

  return (
    <form onSubmit={loginForm.handleSubmit}>
      <FormControl isRequired mt={8} isInvalid={hasEmailError}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          type="email"
          placeholder="john@smith.com"
          {...loginForm.getFieldProps('email')}
        />
        <FormErrorMessage>{loginForm.errors.email}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired mt={6} isInvalid={hasPasswordError}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          id="password"
          type="password"
          {...loginForm.getFieldProps('password')}
        />
        <FormErrorMessage>{loginForm.errors.password}</FormErrorMessage>
      </FormControl>

      <Button
        colorScheme="blue"
        mt={8}
        type="submit"
        disabled={!loginForm.isValid}
        isLoading={loginForm.isSubmitting}
        loadingText="Logging in"
        leftIcon={<MdPerson />}
      >
        Log in
      </Button>
    </form>
  );
};

export default Login;
