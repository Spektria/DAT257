import React from 'react';
import Calendar,{date, event} from 'react-awesome-calendar';
import SessionView from './components/sessionview';
import SessionViewData from './components/sessionviewdata';

const App = () : JSX.Element => {
	
	let data = new SessionViewData(
		"Vid vattnet",
		new Date(),
		["Bengt Bengtsson", "Erik Eriksson"],
		["Alice Albertsson", "Carl Carlsson", "Daniel Danielsson"]
	);

  return (
    <div className='pl-10 pr-10'>
      <Calendar
        events = {events}
        onClickEvent={(id : number) => alert('event id: ' + id) }
        onClickTimeLine={(date : date) => alert('create an event at date: ' + JSON.stringify(date))}
      />
	  {SessionView(data)}
    </div>
  );
}

const events : event[] = [{
  id: 1,
  color: '#fd3153',
  from: new Date('2022-04-04T17:00:00+00:00'),
  to: new Date('2022-04-04T18:00:00+00:00'),
  title: 'This is an event'
}];

export default App;
