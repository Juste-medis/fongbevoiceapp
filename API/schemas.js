import * as yup from 'yup';
import Globals from '../Ressources/Globals';
import Global from '../Ressources/Globals';

export const Schemasignin = yup.object().shape({
  email: yup
    .string()
    .email(Global.STRINGS.invalid_mail)
    .min(8, Global.STRINGS.small_phone),
  password: yup.string().min(5, Global.STRINGS.small_code),
  language: yup.string(),
});

export const Schemasignup = yup.object().shape({
  email: yup.string().min(8, Global.STRINGS.small_phone),
  password: yup
    .string()
    .required(Globals.STRINGS.required_field)
    .min(5, Global.STRINGS.small_code),
  fullname: yup.string().required(Globals.STRINGS.required_field),
  confirmcode: yup
    .string()
    .oneOf([yup.ref('password'), null], Globals.STRINGS.passNotMatch)
    .required(Globals.STRINGS.required_field),
  language: yup.string(),
});
