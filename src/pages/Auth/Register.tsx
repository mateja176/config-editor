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
import { MdPersonAdd } from 'react-icons/md';
import { useMutation } from 'react-query';
import { RegisterPostRequest } from '../../generated/api';
import { api } from '../../services/api';
import { registerSchema, registerValues } from './utils';

export interface RegisterProps {
  onSuccess: () => void;
}

const Register: React.FC<RegisterProps> = (props) => {
  const toast = useToast();

  const registerMutation = useMutation<void, Error, RegisterPostRequest>(
    api.registerPost.bind(api),
    {
      onSuccess: () => {
        toast({
          title: 'Registered',
          description: `Please log in with your new credentials.`,
          status: 'success',
          isClosable: true,
        });

        props.onSuccess();
      },
      onError: async (error) => {
        toast({
          title: 'Failed to register',
          description: error.message,
          status: 'error',
          isClosable: true,
        });
      },
    },
  );

  const registerForm = useFormik({
    validateOnMount: true,
    initialValues: registerValues,
    validationSchema: registerSchema,
    onSubmit: (values) => {
      return registerMutation.mutateAsync({ inlineObject: values });
    },
  });

  const hasEmailError = React.useMemo(() => {
    return !!(registerForm.touched.email && registerForm.errors.email);
  }, [registerForm]);
  const hasPasswordError = React.useMemo(() => {
    return !!(registerForm.touched.password && registerForm.errors.password);
  }, [registerForm]);
  const hasPassword2Error = React.useMemo(() => {
    return !!(registerForm.touched.password2 && registerForm.errors.password2);
  }, [registerForm]);

  return (
    <form onSubmit={registerForm.handleSubmit}>
      <FormControl mt={6} isRequired isInvalid={hasEmailError}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          type="email"
          placeholder="john@smith.com"
          {...registerForm.getFieldProps('email')}
        />
        <FormErrorMessage>{registerForm.errors.email}</FormErrorMessage>
      </FormControl>

      <FormControl mt={6} isRequired isInvalid={hasPasswordError}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          id="password"
          type="password"
          {...registerForm.getFieldProps('password')}
        />
        <FormErrorMessage>{registerForm.errors.password}</FormErrorMessage>
      </FormControl>

      <FormControl mt={6} isRequired isInvalid={hasPassword2Error}>
        <FormLabel htmlFor="password2">Repeat Password</FormLabel>
        <Input
          id="password2"
          type="password"
          {...registerForm.getFieldProps('password2')}
        />
        <FormErrorMessage>{registerForm.errors.password2}</FormErrorMessage>
      </FormControl>

      <Button
        colorScheme="blue"
        mt={8}
        type="submit"
        disabled={!registerForm.isValid}
        isLoading={registerForm.isSubmitting}
        loadingText="Registering"
        leftIcon={<MdPersonAdd />}
      >
        Register
      </Button>
    </form>
  );
};

export default Register;
