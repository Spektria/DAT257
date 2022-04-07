import react from 'React';
import SessionViewData from './sessionviewdata';

// Converts an array of strings to an HTML list of those strings
function listPeople(arr: string[]) {

	let peopleList: JSX.Element[] = [];

	for (var i in arr) {
		peopleList[i] = (
			<li>
				{arr[i]}
			</li>
		)
	}

	let out = (
		<div>
			<ul>
				{peopleList}
			</ul>
		</div>
	);

	return out;
}

// Element for showing a driving lesson session
const SessionView = (data: SessionViewData) : JSX.Element => {

	return (
		<div>
			<h2>Uppkörningstillfälle</h2>
			<b>Plats:</b> {data.getLocation()}<br/>
			<b>Tid:</b> {data.getDate().toString()}<br/>
			<b>Instruktörer:</b><br/>
			{listPeople(data.getInstructors())}
			<b>Deltagare:</b><br/>
			{listPeople(data.getParticipants())}
		</div>
	);
}

export default SessionView;
