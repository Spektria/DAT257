import { FC } from 'react';
import { SessionViewData } from '../../types/types';
import { zipWith } from 'ramda'

// Converts an array of strings to an HTML list of those strings
function listPeople(arr: string[]) {
	return(
    <div>
      <ul>
        { zipWith((x, k) => <li key={k}>{x}</li>, arr, Array.from(Array(arr.length).keys())) }
      </ul>
    </div>
  );
}

// Element for showing a driving lesson session
const SessionView : FC<SessionViewData> = data => {

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
