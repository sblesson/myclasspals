import React from 'react';
import { Formik } from 'formik';
import DisplayCreateEventForm from './DisplayCreateEventForm';
import { dateFormat, timeFormat } from '../common/FieldFormats/FieldFormats';
import moment from 'moment';

const initialValues = {
  eventTitle: '',
  //groupId: group.currentGroup.id,
  eventLocation: '',
  eventDescription: '',
  eventDate: moment(Date.now()),
  eventStartTime: moment(Date.now()),
  eventEndTime: moment(Date.now()),
  eventFrequency: 'Does not repeat',
  isEventAllDay: 'false',
  isEventRSVPRequired: 'false',
  eventFrequencySelectOptions: [
    'Does not repeat',
    'Daily',
    'Weekly',
    'Monthly',
  ],
};

const CreateEventForm = () => {
  const handleSubmit = (formProps) => {
    console.log(formProps);
    const { eventTitle, eventDate, eventStartTime, eventFrequency } = formProps;
    const selectedDate = moment(eventDate).format(dateFormat);
    const selectedTime = moment(eventStartTime).format(timeFormat);
    alert(
      `eventTitle: ${eventTitle} \nSelected Date: ${selectedDate} \nSelected Time: ${selectedTime}\nSelected Client: ${eventFrequency}`
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      render={DisplayCreateEventForm}
    />
  );
};

export default CreateEventForm;
