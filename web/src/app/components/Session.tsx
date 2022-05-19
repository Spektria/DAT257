/**
 * File contains Session component that shows the details of the event in the calendar.
 *
 * @author Matilda Falkenby
 * @author Martin
 */

import { FC } from 'react';
import { SessionData } from '../../types/types';
import { map, zipWith } from 'ramda'
import { useNavigate } from 'react-router-dom'
import ListProfile from './ListProfile';

/**
 * Converts an array of strings to an HTML list of those strings.
 * @author Martin
 */
function listPeople(arr: string[]) {
  return (
    <div className='subtitle-content'>
      <ul>
        {zipWith((x, k) => <li key={k}>{x}</li>, arr, Array.from(Array(arr.length).keys()))}
      </ul>
    </div>
  );
}

/**
 * Creates a Session view to show the event details provided from SessionData. The view includes:
 * - Cancel button
 * - The place and time of the event
 * - List of instructors that will be supervising
 * - List of students that is to be supervised
 *
 * @author Matilda Falkenby, Martin Fredin
 * @param data
 * @returns
 */
const Session : FC<SessionData> = data => {
  const navigate = useNavigate()
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center font-sans h-screen md:min-h-screen pt-10 md:px-4 md:pb-20 text-center md:block md:p-0">

        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={() => navigate(-1)}
        />

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className='absolute inset-0 mx-auto z-20 w-full md:w-fit mt-10'>
          <div className="card-modal-add md:min-w-[32rem]">
            <div className="relative px-8 pt-8 md:p-6 md:pb-10">
              <div className="flex items-start">
                <div className="mt-3 sm:mt-0 text-left w-full">
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
                    {listPeople(map(({ name: n }) => n, data.instructors))}
                  </div>
                  <div className="mt-5 ">
                    <span className="title-content">Deltagare:</span>
                    {data.participants.map((s)=> <ListProfile key={s.id} name={s.name} email={s.email} id={s.id}/>)}
                  </div>
                </div>
              </div>
            </div>
            <div className=" text-left py-6 sm:px-6 sm:relative relative sm:flex-row-reverse">
              <button
                type="button"
                className="button-solid mr-3"
                onClick={() => navigate(-1)}
              >Redigera
              </button>
              <button
                type="button"
                className="button-outline"
                onClick={() => navigate('/')}
              >Tillbaka
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>


  );
}

export default Session;


