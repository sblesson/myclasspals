import React, { PureComponent } from 'react';
import { Formik } from 'formik';
import DisplayBookingForm from './DisplayBookingForm';
import { dateFormat, timeFormat } from '../../common/FieldFormats/FieldFormats';
import moment from 'moment';

const initialValues = {
  bookingClient: '',
  bookingDate: moment(Date.now()),
  bookingTime: moment(Date.now()),
  selectOptions: ['Mark', 'Bob', 'Anthony'],
};

const BookingForm = () => {
  const handleSubmit = (formProps) => {
    const { bookingClient, bookingDate, bookingTime, email } = formProps;
    const selectedDate = moment(bookingDate).format(dateFormat);
    const selectedTime = moment(bookingTime).format(timeFormat);
    alert(
      `Email: ${email} \nSelected Date: ${selectedDate} \nSelected Time: ${selectedTime}\nSelected Client: ${bookingClient}`
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      render={DisplayBookingForm}
    />
  );
};

export default BookingForm;
