import moment from 'moment';
import { dateFormat } from '../createformfields/CreateFormFields';

export const validateDate = (value) => {
  let errors;

  if (!value) {
    //errors = 'Required!';
  } else if (
    moment(value).format(dateFormat) < moment(Date.now()).format(dateFormat)
  ) {
    errors = 'Invalid date!';
  }

  return errors;
};

export const validateEmail = (value) => {
  let errors;

  if (!value) {
    errors = 'Required!';
  } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
    errors = 'Invalid email address!';
  }

  return errors;
};

export const validatePassword = (value) => {
  var errors;
  if (!value) {
    errors = 'Required';
  } else if (value.length < 8) {
    errors = 'Your password must be at least 8 characters';
  } else if (value.search(/[a-z]/i) < 0) {
    errors = 'Your password must contain at least one letter.';
  } /*  else if (value.search(/[0-9]/) < 0) {
    errors = 'Your password must contain at least one digit.';
  } */
  if (errors) {
    return errors;
  }
};

export const isRequired = (value) => (!value ? 'Required!' : '');
