import react from 'React';
import SessionViewData from './sessionviewdata';

const SessionView = () : JSX.Element => {

	let data = new SessionViewData(
		"Vid vattnet",
		"12:00 2022-04-06",
		"Bengt Bengtsson",
		"Alice Albertsson, Carl Carlsson"
	);

	return (
		<div>
			<h2>Uppkörningstillfälle</h2>
			<b>Plats:</b> {data.getLocation()}<br/>
			<b>Tid:</b> {data.getTimeAndDate()}<br/>
			<b>Instruktörer:</b> {data.getInstructors()}<br/>
			<b>Deltagare:</b> {data.getParticipants()}<br/>
		</div>
	);
}

export default SessionView;
