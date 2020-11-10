import React, { useEffect, useState, useRef } from 'react';
import events from './events';

import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import { connect } from 'react-redux';
import { getEvents } from '../../actions/event';

moment.locale('en');
const localizer = momentLocalizer(moment);

const EventsList = ({ getEvents }) => {
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

  const handleSelect = (title) => {
    console.log(title);
  };

  return (
    <div style={{ height: '80vh', width: '95vw', margin: '2rem auto' }}>
      <div
        style={{
          display: 'flex',
          flex: '1',
          justifyContent: 'flex-end',
          margin: '1rem 0',
          cursor: 'pointer',
        }}
      >
        <button
          className='ant-btn ant-btn-primary btn-primary float-right'
          type='submit'
        >
          <span>
            <i className='far fa-calendar-alt'></i>
            &nbsp; Add Event
          </span>{' '}
        </button>
      </div>
      <Calendar
        localizer={localizer}
        defaultView={Views.WEEK}
        defaultDate={new Date()}
        defaultView='month'
        events={events}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
  group: state.group,
  event: state.event,
});

export default connect(mapStateToProps, { getEvents })(EventsList);
