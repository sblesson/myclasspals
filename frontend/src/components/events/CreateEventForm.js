import React from 'react';
import { Formik } from 'formik';

import DisplayCreateEventForm from './DisplayCreateEventForm';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addEvent, getEvents } from '../../actions/event';

const CreateEventForm = ({
  group,
  auth,
  hideModal,
  addEvent,
  isGenericEvent,
}) => {
  const getUserGroups = () => {
    const currentGroups = group.userGroup.map((values) => {
      return values.groupName;
    });
    console.log(currentGroups);
    return currentGroups;
  };

  const getGroupIdFromGroupName = (selectedGroupName) => {
    const currentGroupId = group.userGroup.filter(
      (values) => selectedGroupName === values.groupName
    );
    if (currentGroupId && currentGroupId.length > 0) {
      return currentGroupId[0].id;
    } else return null;
  };
  const initialValues = {
    eventTitle: '',
    //groupId: group.currentGroup.id,
    eventLocation: '',
    eventDescription: '',
    eventStartDate: moment(Date.now()),
    eventEndDate: moment(Date.now()),
    eventStartTime: moment(Date.now()),
    eventEndTime: moment(Date.now()),
    eventFrequency: 'Does not repeat',
    userGroups: getUserGroups(),
    isGenericEvent: isGenericEvent,
    /*   isEventAllDay: 'false',
    isEventRSVPRequired: 'false', */
    eventFrequencySelectOptions: [
      'Does not repeat',
      'Daily',
      'Weekly',
      'Monthly',
    ],
    eventGroup: '-Select-',
    //userGroup: group.userGroup,
  };

  const formatFormDate = (date, time) => {
    //sample date format 11/19/2020
    const dateArr = moment(date).format('L').split('/');
    const month = parseInt(dateArr[0]) - 1;
    const day = parseInt(dateArr[1]);
    const year = parseInt(dateArr[2]);
    //time in format hour,minute eg: 11,41
    const timeArr = time.format('HH,mm').split(',');
    let hour, minute;
    if (timeArr && timeArr.length > 0) {
      hour = parseInt(timeArr[0]);
      minute = parseInt(timeArr[1]);
    }

    return new Date(year, month, day, hour, minute);
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
      eventGroup,
      userGroups,
      usersSelect,
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
      formObj.start = formatFormDate(start, startTime);
    }
    if (end) {
      formObj.end = formatFormDate(end, endTime);
    }
    debugger;
    if (isGenericEvent) {
      //creating event from events page we need to pass groupId or eventInvitees, if both are undefined, add current user email into eventInvitees array (host )
      if (eventGroup !== '-Select-') {
        formObj.groupId = getGroupIdFromGroupName(eventGroup);
      } else if (usersSelect && usersSelect.length > 0) {
        formObj.eventInvities = usersSelect;
      } else {
        formObj.eventInvities = [auth.user.email];
      }
    } else {
      //event created from groups page
      formObj.groupId = group.currentGroup.id;
    }

    addEvent(JSON.stringify(formObj), () => {
      hideModal();
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
  auth: state.auth,
  group: state.group,
});

export default connect(mapStateToProps, {
  addEvent,
})(withRouter(CreateEventForm));
