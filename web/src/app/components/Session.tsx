import { FC } from 'react';
import { SessionData } from '../../types/types';
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
const Session : FC<SessionData> = data => {
	return (
		<div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
			<div className="flex justify-center min-h-screen pt-20 px-0 text-center sm:block sm:p-0">

				<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>


				<span className="hidden sm:inline-block sm:align-bottom sm:h-screen" aria-hidden="true">&#8203;</span>


				<div className="relative inline-block align-bottom bg-white rounded-t text-left overflow-hidden shadow-xl transform transition-all sm:mt-8 sm:align-middle sm:max-w-lg sm:w-full">
					<div className="relative w-full text-left">
						<h1 className="mt-10 mb-5 px-8 w-full inline-flex justify-left text-3xl leading-6 font-bold text-black py-3" id="modal-title">Uppkörningstillfälle</h1>
					</div>
					<div className="px-8 sm:flex sm:items-start">
						<div className="text-left sm:mt-0 sm:text-left">
							<div className="mt-5">
								<span className="font-medium text-theme-pink">Plats:</span>
								<p className="text-sm text-gray-500">{data.location}</p>
							</div>
							<div className="mt-3">
								<span className="font-medium text-theme-pink">Tid:</span>
								<p className="text-sm text-gray-500">{data.from.toString()}</p>
							</div>
							<div className="mt-3">
								<span className="font-medium text-theme-pink">Instruktörer:</span>
								<p className="text-sm text-gray-500">{listPeople(data.instructors)}</p>
							</div>
							<div className="mt-3">
								<span className="font-medium text-theme-pink">Deltagare:</span>
								<p className="text-sm text-gray-500">{listPeople(data.participants)}</p>
							</div>
						</div>
					</div>
					<div className="absolute bottom-0 bg-gray-50 px-8 py-3 sm:flex sm:flex-row-reverse w-full">
						<button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-theme-pink text-base font-medium text-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-auto sm:ml-auto sm:w-auto sm:text-sm">Redigera</button>
						<button type="button" className="mt-3 mb-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-auto sm:ml-auto sm:w-auto sm:text-sm">Avbryt</button>
					</div>
				</div>
			</div>
		</div>

	);
}

export default Session;


