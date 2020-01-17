import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import { deleteReminder } from '../../actions/profile';

const Reminder = ({ reminder, deleteReminder }) => {
  const reminders = reminder.map(rem => (
    <tr key={rem._id}>
      <td>{rem.reminderName}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{moment.utc(rem.reminderDate)}</Moment>
      </td>
      <td>{rem.description}</td>

      <td>
        <button
          onClick={() => deleteReminder(rem._id)}
          className='btn btn-danger'
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>Reminders</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Event</th>
            <th className='hide-sm'>Date</th>
            <th>Description</th>

            <th />
          </tr>
        </thead>
        <tbody>{reminders}</tbody>
      </table>
    </Fragment>
  );
};

Reminder.propTypes = {
  reminder: PropTypes.array.isRequired,
  deleteReminder: PropTypes.func.isRequired
};

export default connect(null, { deleteReminder })(Reminder);
