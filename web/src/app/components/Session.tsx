import { FC } from 'react';
import { SessionData } from '../../types/types';
import { zipWith } from 'ramda'

// Converts an array of strings to an HTML list of those strings
function listPeople(arr: string[]) {
	return(
    <div className='text-sm text-gray-500'>
      <ul>
        { zipWith((x, k) => <li key={k}>{x}</li>, arr, Array.from(Array(arr.length).keys())) }
      </ul>
    </div>
  );
}

//Element for showing water scooter driving session with CSS styling
const Session : FC<SessionData> = data => {
	return (
		<div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
		<div className="flex items-end justify-center font-sans h-screen sm:min-h-screen pt-10 sm:px-4 sm:pb-20 text-center sm:block sm:p-0">

			<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

			<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

			<div className="relative inline-block h-full sm:h-auto align-bottom mb-0 bg-white rounded-t sm:rounded-lg text-left overflow-hidden sm:shadow-xl transform transition-all sm:align-middle sm:max-w-lg w-full">
				<div className="relative bg-white px-8 pt-8 sm:p-6 sm:pb-10">
					<div className="flex items-start">
						<div className="mt-3 sm:mt-0 sm:ml-4 text-left w-full">
							<div className="border-b-2 pb-5">
								<h1 className="text-2xl leading-8 font-medium text-gray-700" id="modal-title">Uppkörningstillfälle</h1>
							</div>
							<div className="mt-5">
								<span className="font-medium text-theme-pink">Plats:</span>
								<p className="text-sm text-gray-500">{data.location}</p>
							</div>
							<div className="mt-5 pb-5 border-b-2">
								<span className="font-medium text-theme-pink">Tid:</span>
								<p className="text-sm text-gray-500">{data.from.toString()}</p>
							</div>
							<div className="mt-5">
								<span className="font-medium text-theme-pink">Instruktörer:</span>
								{listPeople(data.instructors)}
							</div>
							<div className="mt-5 ">
								<span className="font-medium text-theme-pink">Deltagare:</span>
								{listPeople(data.participants)}
							</div>
						</div>
					</div>
				</div>
				<div className="absolute bottom-0 w-full sm:relative bg-gray-50 px-4 py-6 sm:px-6 sm:flex sm:flex-row-reverse">
					<a href={"/session/" + data.id + "/edit"}>
						<button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-theme-pink text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-pink sm:ml-3 sm:w-auto sm:text-sm">Redigera</button>
					</a>
					<button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Avbryt</button>
				</div>
			</div>
		</div>
	</div>


);
}

export default Session;


