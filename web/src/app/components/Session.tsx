import { FC } from 'react';
import { SessionData } from '../../types/types';
import { zipWith } from 'ramda'
import StudentProfile from './StudentProfile';
import StudentData from '../sData';

// Converts an array of strings to an HTML list of those strings
function listPeople(arr: string[]) {
	return(
    <div>
      <ul>
        { zipWith((x, k) => <li key={k}><a href="studentprofile">{x}</a></li>, arr, Array.from(Array(arr.length).keys())) }
      </ul>
    </div>
  );
}

// Element for showing a driving lesson session
const Session : FC<SessionData> = data => {
	return (
		<div>
			<h2>Uppkörningstillfälle</h2>
			<b>Plats:</b> {data.location}<br/>
			<b>Tid:</b> {data.from.toString()}<br/>
			<b>Instruktörer:</b><br/>
			{listPeople(data.instructors)}
			<b>Deltagare:</b><br/>
			{listPeople(data.participants)}
		</div>
	);
}

export default Session;
