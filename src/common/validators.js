import * as yup from "yup";
import {setLocale} from "yup";

setLocale({
  mixed: {
    required: 'Campo obrigatório',
  },
  string: {
    matches: 'Valor inválido',
    email: 'Informe um e-mail válido',
    min: "Mínimo de ${min} caracteres"
  },
  number: {
    positive: 'Deve ser maior que 0',
  },
});

export const entitySchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().matches(/^[0-9\-+()]*$/),
  document: yup.string().required(),
  institutionTypeId: yup.string().required(),
  password: yup.string().min(6).required(),
  confirm: yup.string().oneOf([yup.ref('password'), null], 'As senhas devem ser iguais'),
});

export const userSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().matches(/^[0-9\-+()]*$/),
  password: yup.string().min(6).required(),
  confirm: yup.string().oneOf([yup.ref('password'), null], 'As senhas devem ser iguais'),
});
