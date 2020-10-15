import React, { useEffect, useState } from 'react';
import events from './events';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { connect } from 'react-redux';

moment.locale('en');
const localizer = momentLocalizer(moment);

//const allViews = Object.keys(Calendar.Views).map((k) => Calendar.Views[k]);

const ListEvents = () => {
  const [currentEvents, setCurrentEvents] = useState({
    view: 'day',
    date: new Date(2015, 3, 12),
    width: 500,
  });
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
    <div style={{ height: 700 }}>
      {/*       <button onClick={() => setCurrentEvents({ view: 'day' })}>Day</button>
      <button onClick={() => setCurrentEvents({ view: 'month' })}>Month</button>
      <Calendar
        style={{ height: 500, width: currentEvents.width }}
        toolbar={false}
        localizer={localizer}
        events={events}
        step={60}
        views={allViews}
        view={currentEvents.view}
        onView={() => {}}
        date={currentEvents.date}
        onNavigate={(date) => setCurrentEvents({ date })}
      />
 */}
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView='month'
        events={events}
        style={{ height: '80vh', width: '80vw', margin: '2rem' }}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
  group: state.group,
});

export default connect(mapStateToProps, {})(ListEvents);
