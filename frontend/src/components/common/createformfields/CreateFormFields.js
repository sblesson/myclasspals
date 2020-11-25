import React from 'react';
/* import { DatePicker, Form, Input, TimePicker, Select } from 'antd'; */

import {
  DatePicker,
  Input,
  Form,
  FormItem,
  TimePicker,
  Select,
} from 'formik-antd';

//const FormItem = Form.Item;
const { Option } = Select;
const CreateFormFields = (AntComponent) => ({
  field,
  form,
  hasFeedback,
  label,
  selectOptions,
  submitCount,
  type,
  ...props
}) => {
  const touched = form.touched[field.name];
  const submitted = submitCount > 0;
  const hasError = form.errors[field.name];
  const submittedError = hasError && submitted;
  const touchedError = hasError && touched;
  const onInputChange = ({ target: { value } }) =>
    form.setFieldValue(field.name, value);
  const onChange = (value) => form.setFieldValue(field.name, value);
  const onBlur = () => form.setFieldTouched(field.name, true);
  return (
    <div className='field-container'>
      <FormItem
        label={label}
        hasFeedback={
          (hasFeedback && submitted) || (hasFeedback && touched) ? true : false
        }
        help={submittedError || touchedError ? hasError : false}
        validateStatus={submittedError || touchedError ? 'error' : 'success'}
      >
        <AntComponent
          {...field}
          {...props}
          onBlur={onBlur}
          onChange={type ? onInputChange : onChange}
        >
          {selectOptions &&
            selectOptions.map((name) => <Option key={name}>{name}</Option>)}
        </AntComponent>
      </FormItem>
    </div>
  );
};
const { TextArea } = Input;

export const dateFormat = 'MM/DD/YYYY';
export const timeFormat = 'h:mm A';
export const AntSelect = CreateFormFields(Select);
export const AntDatePicker = CreateFormFields(DatePicker);
export const AntInput = CreateFormFields(Input);
export const AntTextArea = CreateFormFields(TextArea);
export const AntTimePicker = CreateFormFields(TimePicker);
