import * as yup from "yup";
import {setLocale} from "yup";

setLocale({
  mixed: {
    required: 'Campo obrigatório',
  },
  string: {
    matches: 'Valor inválido',
    email: 'Informe um e-mail válido',
    // eslint-disable-next-line no-template-curly-in-string
    min: "Mínimo de ${min} caracteres"
  },
  number: {
    positive: 'Deve ser maior que 0',
  },
});

export const buildEntitySchema = (isEdit) => yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().matches(/^[0-9\-+()]*$/),
  document: yup.string().required(),
  institutionTypeId: yup.string().required(),
  password: isEdit ? yup.string() : yup.string().required().min(6),
});

export const buildUserSchema = (isEdit) => yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().matches(/^[0-9\-+()]*$/),
  password: isEdit ? yup.string() : yup.string().min(6).required(),
});

export const buildLoginSchema = () => yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const buildVisitSchema = () => yup.object().shape({
  date: yup.string().required(),
  period: yup.string().required(),
});
