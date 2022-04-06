import react from 'React';
import SessionViewData from './sessionviewdata';

const SessionView = (data: SessionViewData) : JSX.Element => {

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
