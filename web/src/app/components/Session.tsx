import { FC } from 'react';
import { SessionData } from '../../types/types';
import { zipWith } from 'ramda'
import { useNavigate } from 'react-router-dom'

// Converts an array of strings to an HTML list of those strings
function listPeople(arr: string[]) {
  return (
    <div className='subtitle-content'>
      <ul>
        {zipWith((x, k) => <li key={k}>{x}</li>, arr, Array.from(Array(arr.length).keys()))}
      </ul>
    </div>
  );
}

//Element for showing water scooter driving session with CSS styling
const Session: FC<SessionData> = data => {
  const navigate = useNavigate()
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center font-sans h-screen md:min-h-screen pt-10 md:px-4 md:pb-20 text-center md:block md:p-0">

        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={() => navigate(-1)}
        />

        <span className="hidden md:inline-block md:align-middle md:h-screen" aria-hidden="true">&#8203;</span>

        <div className='absolute inset-0 mx-auto z-20 w-full md:w-fit mt-10'>
          <div className="card-modal-add md:min-w-[32rem]">
            <div className="relative px-8 pt-8 md:p-6 md:pb-10">
              <div className="flex items-start">
                <div className="mt-3 md:mt-0 md:ml-4 text-left w-full">
                  <div className="border-b-2 border-light-secondary border-opacity-20 pb-5">
                    <h1 className="title-page">Uppkörningstillfälle</h1>
                  </div>
                  <div className="mt-5">
                    <span className="title-content">Plats:</span>
                    <p className="subtitle-content">{data.location}</p>
                  </div>
                  <div className="mt-5 pb-5 border-b-2 border-light-secondary border-opacity-20">
                    <span className="title-content">Tid:</span>
                    <p className="subtitle-content">{data.from.toString()}</p>
                  </div>
                  <div className="mt-5">
                    <span className="title-content">Instruktörer:</span>
                    {listPeople(data.instructors)}
                  </div>
                  <div className="mt-5 ">
                    <span className="title-content">Deltagare:</span>
                    {listPeople(data.participants)}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-4 py-6 md:px-6 md:flex md:flex-row-reverse">
              <button
                type="button"
                className="button-solid"
                onClick={() => navigate(-1)}
              >Redigera
              </button>
              <button
                type="button"
                className="button-outline"
                onClick={() => navigate(-1)}
              >Avbryt
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>


  );
}

export default Session;


