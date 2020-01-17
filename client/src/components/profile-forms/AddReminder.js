import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addReminder } from '../../actions/profile';

const AddReminder = ({ addReminder, history }) => {
  const [formData, setFormData] = useState({
    reminderName: '',
    reminderDate: '',
    description: ''
  });

  const { reminderName, reminderDate, description } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 className='large text-primary'>Add Reminder</h1>
      <small>* = required field</small>
      <form
        className='form'
        onSubmit={e => {
          e.preventDefault();
          addReminder(formData, history);
        }}
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Remind me...'
            name='reminderName'
            value={reminderName}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <h4>When</h4>
          <input
            type='date'
            name='reminderDate'
            value={reminderDate}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='About Reminder'
            value={description}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddReminder.propTypes = {
  addReminder: PropTypes.func.isRequired
};

export default connect(null, { addReminder })(withRouter(AddReminder));
