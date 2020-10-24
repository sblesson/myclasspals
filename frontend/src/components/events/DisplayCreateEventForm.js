import React from 'react';
import { Form, Field } from 'formik';
import {
  AntDatePicker,
  AntInput,
  AntSelect,
  AntTimePicker,
} from '../common/CreateAntFields/CreateAntFields';
import { dateFormat, timeFormat } from '../common/FieldFormats/FieldFormats';
import {
  validateDate,
  isRequired,
} from '../common/ValidateFields/ValidateFields';

export default ({ handleSubmit, values, submitCount }) => (
  <Form className='form-container' onSubmit={handleSubmit}>
    <Field
      component={AntInput}
      name='eventTitle'
      type='text'
      label='Title'
      defaultValue={values.eventTitle}
      validate={isRequired}
      submitCount={submitCount}
      hasFeedback
    />
    <Field
      component={AntDatePicker}
      name='eventDate'
      label='Event Date'
      defaultValue={values.eventDate}
      format={dateFormat}
      validate={validateDate}
      submitCount={submitCount}
      hasFeedback
    />
    <Field
      component={AntTimePicker}
      name='eventStartTime'
      label='Start Time'
      defaultValue={values.eventStartTime}
      format={timeFormat}
      hourStep={1}
      minuteStep={5}
      validate={isRequired}
      submitCount={submitCount}
      hasFeedback
      use12Hours
    />
    <Field
      component={AntTimePicker}
      name='eventEndTime'
      label='End Time'
      defaultValue={values.eventEndTime}
      format={timeFormat}
      hourStep={1}
      minuteStep={5}
      validate={isRequired}
      submitCount={submitCount}
      hasFeedback
      use12Hours
    />
    <Field
      component={AntSelect}
      name='eventFrequency'
      label='Repeats'
      defaultValue={values.eventFrequency}
      selectOptions={values.eventFrequencySelectOptions}
      validate={isRequired}
      submitCount={submitCount}
      tokenSeparators={[',']}
      style={{ width: 200 }}
      hasFeedback
    />
    <div className='submit-container'>
      <button className='ant-btn ant-btn-primary' type='submit'>
        Submit
      </button>
    </div>
  </Form>
);
