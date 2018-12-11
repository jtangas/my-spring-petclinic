import React from 'react';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = Calendar.momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

class ApptCalendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      events: [],
    }
  }

  fetchEvents = date => {
    const startDate = new Date(moment(date).format('YYYY-MM-01'));

    fetch(`/api/appointments?startDate=${startDate}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.setState(state => ({
            ...state,
            events: data.data.map(event => ({
              start: event.datetime,
              end: new Date(moment(event.datetime.toString()).add(1, "hour")),
              title: `${event.vet[0].firstName} ${event.vet[0].lastName}`,
            }))
          }))
        }
      })
  }

  onEventResize = (type, {event, start, end, allDay }) => {
    console.log({
      type,
    });
  }

  onEventDrop = ({ event, start, end, allDay }) => {
    console.log(start);
  };

  componentWillMount() {
    this.fetchEvents(new Date())
  }

  render() {
    const { events } = this.state;
    return (
      <div>
        <DnDCalendar
          defaultDate={new Date()}
          defaultView="month"
          events={events}
          onEventDrop={this.onEventDrop}
          onEventResize={this.onEventResize}
          onNavigate={this.fetchEvents}
          resizeable
          style={{ display: 'flex', flex: 1 }}
          localizer={localizer}
        />
      </div>
    )
  }
}

export default ApptCalendar;