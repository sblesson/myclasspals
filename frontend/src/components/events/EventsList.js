import React, { useEffect, useState } from 'react';
import events from './events';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { connect } from 'react-redux';

moment.locale('en');
const localizer = momentLocalizer(moment);

const EventsList = () => {
  useEffect(() => {
    window.addEventListener('resize', () => {
      /*this.setState({
        width: window.innerWidth,
        height: window.innerHeight
      });*/
    });
    return () => {
      //cleanup
    };
  }, []);

  return (
    <div style={{ height: '80vh', width: '80vw', margin: '2rem auto' }}>
      <Calendar
        localizer={localizer}
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
});

export default connect(mapStateToProps, {})(EventsList);
