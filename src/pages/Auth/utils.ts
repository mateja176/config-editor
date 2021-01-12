import * as yup from 'yup';
import { LoginPostRequest, RegisterPostRequest } from '../../generated/api';
import { emailSchema, passwordSchema } from '../../utils/schemas';

export const loginValues: LoginPostRequest['inlineObject1'] = {
  email: '',
  password: '',
};

export const loginSchema = yup.object().required().shape({
  email: emailSchema,
  password: passwordSchema,
});

export const registerValues: RegisterPostRequest['inlineObject'] = {
  email: '',
  password: '',
  password2: '',
};

const password2Schema = yup
  .mixed()
  .oneOf([yup.ref('password')], 'Passwords must match.');

const registerShape = {
  email: emailSchema,
  password: passwordSchema,
  repeatPassword: password2Schema,
};

export const registerSchema = yup.object().required().shape(registerShape);
