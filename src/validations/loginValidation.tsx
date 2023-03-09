import * as Yup from 'yup';
import {emailRegEx, nameRegex, phoneRegex} from './regex';

export const loginValidation = Yup.object().shape({
  mobileNo: Yup.string()
    .required('Please enter Mobile Number')
    .matches(phoneRegex, 'Mobile number is not valid')
    .min(10, 'Mobile number is too short')
    .max(10, 'Mobile number is too long'),
  userName: Yup.string()
    .required('Please enter Username')
    .matches(nameRegex, 'Username is not valid')
    .min(3, 'Username is too short')
    .max(20, 'Username is too long'),
  email: Yup.string()
    .nullable()
    .notRequired()
    .test('Is valid email', 'Incorrect email provided', value => {
      if (!value) {
        return true;
      }
      return emailRegEx.test(value);
    }),
});
