import React, { useEffect, useRef, useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import { connect } from 'react-redux';
import { getEvents, deleteEvent } from '../../actions/event';
import EventModal from './EventModal';
import { Modal, Button } from 'antd';
/* import AddToCalendar from 'react-add-to-calendar-hoc'; */
import AddToCalendar from 'react-add-to-calendar';

moment.locale('en');

const localizer = momentLocalizer(moment);

const EventsList = ({ getEvents, deleteEvent, event }) => {
  const [isModalVisible, setModalVisibility] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({});
  const [hocEvent, setHOCEvent] = useState({});
  const [currentView, setCurrentView] = useState('');
  let icon = { 'calendar-plus-o': 'left' };

  const [visible, setVisible] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState(false);

  const handleDelete = () => {
    setDeleteLoading(true);
    deleteEvent(currentEvent.eventId, () => {
      setVisible(false);
      setDeleteLoading(false);
      window.location.pathname = '/events';
    });
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  const isCurrent = useRef(true);

  useEffect(() => {
    if (isCurrent.current) {
      getEvents((cancelTokenSrc) => {
        cancelTokenSrc.cancel();
      });
    }
    return () => {
      //cleanup
    };
  }, []);

  useEffect(() => {
    return () => {
      //called when component is going to unmount
      isCurrent.current = false;
    };
  }, []);

  const formatStartDate = (event) => {
    return new Date(event.start);
  };
  const formatEndDate = (event) => {
    return new Date(event.end);
  };
  const onSelectEvent = (event) => {
    setModalVisibility(true);
    console.log(event);
    let calendarEvent = {
      description: event.desc,
      //duration,
      endTime: event.end,
      location: event.location,
      startTime: event.start,
      //timezone: 'Europe/London',
      title: event.title,
    };
    console.log(calendarEvent);

    setCurrentEvent(event);
    setHOCEvent(calendarEvent);
    setVisible(true);
  };
  const onViewChange = (view) => {
    console.log(view);
  };
  return (
    <div style={{ height: '80vh', width: '95vw', margin: '2rem auto' }}>
      <EventModal />

      <Calendar
        startAccessor={formatStartDate}
        endAccessor={formatEndDate}
        localizer={localizer}
        defaultate={new Date(Date.now())}
        defaultView={currentView ? currentView : Views.MONTH}
        defaultDate={new Date()}
        events={event.events}
        drilldownView='agenda'
        views={['month', 'week', 'agenda']}
        popup={true}
        onView={onViewChange}
        onSelectEvent={(event) => onSelectEvent(event)}
      />

      <Modal
        centered
        title={currentEvent.title}
        visible={visible}
        closable={false}
        okText='Delete'
        onOk={handleCancel}
        onCancel={handleDelete} //pass close logic here
        destroyOnClose={true}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ loading: deleteLoading }}
        destroyOnClose={true}
        footer={[
          <Button
            key='delete'
            danger
            style={{ background: '#fff', color: '#cc0000' }}
            onClick={handleDelete}
          >
            Delete
          </Button>,
          <Button key='cancel' onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        <AddToCalendar event={hocEvent} />

        {moment(currentEvent.start).format('LLL')}
        {currentEvent.end && currentEvent.end !== currentEvent.start
          ? ' - ' + moment(currentEvent.end).format('LLL')
          : ''}
        <br />
        {currentEvent.groupName && 'Group Name: ' + currentEvent.groupName}
        <br />
        {currentEvent.desc && 'Description: ' + currentEvent.desc}
        <br />
        {currentEvent.location && 'Location: ' + currentEvent.location}
      </Modal>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
  group: state.group,
  event: state.event,
});

export default connect(mapStateToProps, { getEvents, deleteEvent })(EventsList);
