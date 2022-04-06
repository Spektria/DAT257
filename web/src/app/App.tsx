import React from 'react';
import SessionView from './components/sessionview';
import SessionViewData from './components/sessionviewdata';

const App = () => {

	let data = new SessionViewData(
		"Vid vattnet",
		new Date(),
		["Bengt Bengtsson", "Erik Eriksson"],
		["Alice Albertsson", "Carl Carlsson", "Daniel Danielsson"]
	);

	return (
		<div>
			<p className="text-2xl text-center font-bold text-blue-900"> Hello world! </p>
			{SessionView(data)}
		</div>
	);
}

export default App;
