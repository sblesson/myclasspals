import React from 'react';
import { Field } from 'formik';
import { FormikDebug } from 'formik-antd';
import { Form } from 'formik-antd';
import {
  dateFormat,
  timeFormat,
  AntDatePicker,
  AntInput,
  AntTextArea,
  AntSelect,
  AntTimePicker,
} from '../common/createformfields/CreateFormFields';

import {
  validateDate,
  isRequired,
} from '../common/validatefields/ValidateFields';

export default ({ handleSubmit, values, submitCount }) => {
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  return (
    <Form
      className='form-container'
      /*  className='form-wrapper' */
      {...formItemLayout}
      layout='vertical'
      initialValues={{
        size: 'small',
      }}
      onSubmit={handleSubmit}
    >
      <Field
        component={AntInput}
        name='title'
        type='text'
        label='Event Name'
        placeholder='Name of the event'
        defaultValue={values.eventTitle}
        validate={isRequired}
        submitCount={submitCount}
        hasFeedback
      />
      <Field
        component={AntTextArea}
        name='location'
        type='text'
        label='Location'
        placeholder='Where is the event held, type address or share virtual link'
        defaultValue={values.eventLocation}
        validate={isRequired}
        submitCount={submitCount}
        hasFeedback
      />
      <Field
        component={AntDatePicker}
        name='start'
        label='Start Date'
        defaultValue={values.eventStartDate}
        format={dateFormat}
        validate={validateDate}
        submitCount={submitCount}
        hasFeedback
      />

      <Field
        component={AntTimePicker}
        name='startTime'
        label='Start Time'
        defaultValue={values.eventStartTime}
        format={timeFormat}
        hourStep={1}
        minuteStep={5}
        //validate={isRequired}
        submitCount={submitCount}
        hasFeedback
        use12Hours
      />
      <Field
        component={AntDatePicker}
        name='end'
        label='End Date'
        defaultValue={values.eventEndDate}
        format={dateFormat}
        validate={validateDate}
        submitCount={submitCount}
        hasFeedback
      />
      <Field
        component={AntTimePicker}
        name='endTime'
        label='End Time'
        defaultValue={values.eventEndTime}
        format={timeFormat}
        hourStep={1}
        minuteStep={5}
        //validate={isRequired}
        submitCount={submitCount}
        hasFeedback
        use12Hours
      />
      {/*       <Field
        component={AntSelect}
        name='frequency'
        label='Repeats'
        defaultValue={values.eventFrequency}
        selectOptions={values.eventFrequencySelectOptions}
        validate={isRequired}
        submitCount={submitCount}
        tokenSeparators={[',']}
        style={{ width: 200 }}
        hasFeedback
      /> */}
      <Field
        component={AntTextArea}
        name='desc'
        type='text'
        label='Description'
        placeholder='Short description about the event'
        defaultValue={values.eventDescription}
        //validate={isRequired}
        submitCount={submitCount}
        hasFeedback
      />

      <div className='submit-container'>
        <button className='ant-btn ant-btn-primary btn-primary' type='submit'>
          Submit
        </button>
      </div>
      <pre style={{ flex: 1 }}>
        <FormikDebug />
      </pre>
    </Form>
  );
};
