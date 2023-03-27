import * as yup from 'yup';
const SCHEMAS = {
  schemaSignUp: yup.object().shape({
    username: yup
      .string()
      .min(3, 'Vous devez saisir au moins trois lettres!')
      .max(50, 'Vous devez saisir au plus 50 lettres!')
      .required('champ recquis'),
    email: yup.string().email('Addresse e-mail Invalid'),
    password: yup
      .string()
      .min(6, 'Le mot de passe saisit est trop court (6 lettres minimum)')
      .required('Vous devez entrer un mot de passe.'),
    password_conf: yup
      .string()
      .required('Vous devez confirmer le mot de passe.')
      .when('password', {
        is: val => (val && val.length > 0 ? true : false),
        then: yup
          .string()
          .oneOf(
            [yup.ref('password')],
            'les mots de passe ne se conviennent pas',
          ),
      }),
  }),
  schemaSignIn: yup.object().shape({
    username: yup
      .string()
      .min(3, 'Vous devez saisir au moins trois lettres!')
      .required('champ recquis'),
    password: yup
      .string()
      .min(3)
      .required('Vous devez entrer un mot de passe.'),
  }),
  schemaChangePass: yup.object().shape({
    pass_resset: yup
      .string()
      .min(6, 'Le mot de passe saisit est trop court (6 lettres minimum)')
      .required('Vous devez entrer un mot de passe.'),
  }),
};

export const AppLanguages = [
  {label: 'Masculin', value: 'M'},
  {label: 'Feminin', value: 'F'},
];

export default SCHEMAS;
