import React from 'react';
import SessionView from './components/sessionview';
import SessionViewData from './components/sessionviewdata';

const App = () => {

	let data = new SessionViewData(
		"Vid vattnet",
		"12:00 2022-04-06",
		"Bengt Bengtsson",
		"Alice Albertsson, Carl Carlsson"
	);

	return (
		<div>
			<p className="text-2xl text-center font-bold text-blue-900"> Hello world! </p>
			{SessionView(data)}
		</div>
	);
}

export default App;
