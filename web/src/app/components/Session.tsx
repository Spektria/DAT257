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
			<div className="flex items-top justify-center min-h-screen pt-20 px-0 pb-0 text-center sm:block sm:p-0">

				<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>


				<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>


				<div className="relative inline-block align-bottom bg-white rounded-t text-left overflow-hidden shadow-xl transform transition-all sm:mt-8 sm:align-middle sm:max-w-lg sm:w-full">
					<div className="bg-white px-8 pt-5 pb-10 sm:p-6 sm:pb-4">
						<div className="sm:flex sm:items-start">
							<div className="mt-3 text-left sm:mt-0 sm:ml-4 sm:text-left">
								<h2 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Uppkörningstillfälle</h2>
								<div className="mt-3">
									<div className="mt-3">
										<strong>Plats:</strong>
										<p className="text-sm text-gray-500">{data.location}</p>
									</div>
									<div className="mt-3">
										<strong>Tid:</strong>
										<p className="text-sm text-gray-500">{data.from.toString()}</p>
									</div>
									<div className="mt-3">
										<strong>Instruktörer:</strong>
										<p className="text-sm text-gray-500">{listPeople(data.instructors)}</p>
									</div>
									<div className="mt-3">
										<strong>Deltagare:</strong>
										<p className="text-sm text-gray-500">{listPeople(data.participants)}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="bg-gray-50 px-8 py-3 sm:px-6 sm:flex sm:flex-row-reverse ">
						<button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Redigera</button>
						<button type="button" className="mt-3 mb-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Avbryt</button>
					</div>
				</div>
			</div>
		</div>

	);
}

export default Session;

//<b>Plats:</b> {data.location}<br/>
//<b>Tid:</b> {data.from.toString()}<br/>
//<b>Instruktörer:</b><br/>
//{listPeople(data.instructors)} <b>Deltagare:</b><br/>
//{listPeople(data.participants)}
