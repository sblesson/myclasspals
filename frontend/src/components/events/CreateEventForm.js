import React from 'react';
import { Formik } from 'formik';

import DisplayCreateEventForm from './DisplayCreateEventForm';
import {
  dateFormat,
  timeFormat,
} from '../common/createformfields/CreateFormFields';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addEvent } from '../../actions/event';

const CreateEventForm = ({ group, setModal, addEvent }) => {
  const initialValues = {
    eventTitle: '',
    groupId: group.currentGroup.id,
    eventLocation: '',
    eventDescription: '',
    eventStartDate: moment(Date.now()),
    eventEndDate: moment(Date.now()),
    eventStartTime: moment(Date.now()),
    eventEndTime: moment(Date.now()),
    eventFrequency: 'Does not repeat',
    /*   isEventAllDay: 'false',
    isEventRSVPRequired: 'false', */
    eventFrequencySelectOptions: [
      'Does not repeat',
      'Daily',
      'Weekly',
      'Monthly',
    ],
  };
  const handleSubmit = (formProps) => {
    console.log(formProps);
    let {
      title,
      desc,
      location,
      start,
      end,
      startTime,
      endTime,
      //frequency,
      groupId,
      //use default values if no selection by user
      eventStartDate,
      eventEndDate,
      eventStartTime,
      eventEndTime,
    } = formProps;
    start = start ? start : eventStartDate;
    end = end ? end : eventEndDate;
    startTime = startTime ? startTime : eventStartTime;
    endTime = endTime ? endTime : eventEndTime;

    let formObj = {
      title: title,
      desc: desc,
      location: location,
      //eventFrequency: eventFrequency,
    };
    if (start) {
      const selectedStartDate = moment(start).format(dateFormat);
      const selectedStartTime = startTime
        ? moment(startTime, ['h:mm A']).format('HH, mm')
        : '';
      formObj.start = selectedStartDate + ', ' + selectedStartTime;
    }
    if (end) {
      //if end date is provided, use it otherwise it is same as start date
      const selectedEndDate = end
        ? moment(end).format(dateFormat)
        : moment(start).format(dateFormat);

      //if end time is provided, use it otherwise it is same as start time
      const selectedEndTime = endTime
        ? moment(endTime, ['h:mm A']).format('HH, mm')
        : moment(startTime, ['h:mm A']).format('HH, mm');
      formObj.end = selectedEndDate + ', ' + selectedEndTime;
    }

    if (groupId) {
      formObj.groupId = groupId;
    }

    addEvent(JSON.stringify(formObj), (response) => {
      setModal(false);
      console.log(response);
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      render={DisplayCreateEventForm}
    />
  );
};

const mapStateToProps = (state) => ({
  event: state.event,
});

export default connect(mapStateToProps, {
  addEvent,
})(withRouter(CreateEventForm));
