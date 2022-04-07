import React from 'react';
import { SessionViewData } from './sessionviewdata';

// Converts an array of strings to an HTML list of those strings
function listPeople(arr: string[]) {
	return(
    <div>
      <ul>
        {arr.map(x => <li>{x}</li>)}
      </ul>
    </div>
  );
}

// Element for showing a driving lesson session
const SessionView : React.FC<SessionViewData> = data => {

	return (
		<div>
			<h2>Uppkörningstillfälle</h2>
			<b>Plats:</b> {data.location}<br/>
			<b>Tid:</b> {data.date.toString()}<br/>
			<b>Instruktörer:</b><br/>
			{listPeople(data.instructors)}
			<b>Deltagare:</b><br/>
			{listPeople(data.participants)}
		</div>
	);
}

export default SessionView;
