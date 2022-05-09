import { useReducer, FC, useState, useEffect } from 'react';
import { CalendarDate } from 'react-awesome-calendar'
import { SessionData, Either, StudentData, InstructorData } from '../../types/types'
import { MultiInput, Input } from './MultiInput'
import { FaLongArrowAltRight } from 'react-icons/fa'
import { getStudents } from '../apis/StudentApi';
import { getInstructors } from '../apis/InstructorApi';
import { orElse } from '../helpers/Helpers';
import { useNavigate } from 'react-router-dom'
import { identical, map } from 'ramda';
import { useQuery } from 'react-query'

/**
 * Component for creating and editing sessions
 * 
 * @param props
 * @param props.left - Initial date of the new event
 * @param props.right - Data of an existing session
 */
function SessionEditor({ left, right }: Either<CalendarDate, SessionData>) {
  if (right !== undefined)
    return (<Form {...right} />)
  
  /* Create Date fom CalendarDate */
  const { year, month, day, hour } = left
  const min = hour % 1 * 60
  return (
    <Form
      id={0}  /* TODO generate session id */
      title=""
      location=""
      from={new Date(year, month, day, hour, min)}
      to={new Date(year, month, day, hour + 2, min)}
      instructors={[]}
      participants={[]}
    />
  )
}

/**
 * Component for input of session information
 * 
 * @param initState
 */
function Form(initState : SessionData) {
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(
    (prevState: SessionData, newFields: Partial<SessionData>) => ({ ...prevState, ...newFields })
    , initState)
  const [fromDate, setFromDate] = useState(dateStr(state.from))
  const [toDate, setToDate] = useState(fromDate)

  const [students, setStudents] = useState<StudentData[]>();
  const [instructors, setInstructors] = useState<InstructorData[]>();
  const { isLoading, error, data } = useQuery<[StudentData[], InstructorData[]], Error>(
    'student-instructor-names'
    , async () => [await getStudents(), await getInstructors()]
    , { staleTime: 600000 })

  // Fetch title and location
  const [title, setTitle] = useState(state.title);
  const [location, setLocation] = useState(state.location);

  if (isLoading) return <p className='fixed text-center p-10 top-20 z-20'>Loading...</p>;
  if (error) return <p className='fixed text-center p-10 top-20 z-20'>An error has occurred: {error.message}</p>;

  if (students === undefined)
    setStudents(orElse(() => data?.[0], []));

  if (instructors === undefined)
    setInstructors(orElse(() => data?.[1], []));

  // Generalize extraction of names
  interface HasName { name: string }
  const getNames = (list: HasName[] | undefined) => orElse(() => list?.map(s => s.name), [])(null);

  return (
    <div className='fixed inset-0 z-10 scroll overflow-y-hidden'>
      <div
        className='bg-gray-500 bg-opacity-75 h-screen'
        onClick={() => navigate(-1)}
      />
      <div className='absolute inset-0 mx-auto z-20 w-full md:w-fit mt-10'>
        <div className='card-modal-add'>
          <div className='flex flex-col'>
            <div className="border-b-2 border-light-secondary border-opacity-20 pb-5">
              <h1 className="title-page">Lägg till uppkörningstillfälle</h1>
            </div>
            <div className='flex-row justify-between mt-5 mb-1 '>
              <input className='input' name='title' type="text" placeholder="Titel" value={title} onChange={e => setTitle(e.target.value)} />
            </div>

            <div className='flex-row justify-between mt-1 mb-3 border-b-2 border-light-secondary border-opacity-20 pb-4'>
              <input className='input' name='place' type="text" placeholder="Plats" value={location} onChange={e => setLocation(e.target.value)} />
            </div>
            <div className="border-b-2 border-light-secondary border-opacity-20 pb-5">
              <h1 className="title-page">Lägg till uppkörningstillfälle</h1>
            </div>
            <div className='flex-row justify-between mt-5 mb-1 '>
              <input className='input' name='title' type="text" placeholder="Titel" />
            </div>

            <div className='flex-row justify-between mt-1 mb-3 border-b-2 border-light-secondary border-opacity-20 pb-4'>
              <input className='input' name='place' type="text" placeholder="Plats" />
            </div>

            <p className='title-content'>Datum</p>
            <div className='flex mt-1 mb-3 border-b-2 border-light-secondary border-opacity-20 pb-4 items-center justify-between' >
              <input
                  className='input'
                  name='from'
                  type="date"
                  value={fromDate}
                  onChange={e => setFromDate(e.target.value)}
              />
              <FaLongArrowAltRight className='inline fill-light-secondary ml-2 mr-2' />
              <input
                  className='input'
                  name='to'
                  type="date"
                  min={fromDate}
                  value={toDate}
                  onChange={e => setToDate(e.target.value)}
              />
            </div>

            <p className='title-content'>Tid</p>
            <div className='flex mt-1 mb-3 border-b-2 border-light-secondary border-opacity-20 pb-4 items-center justify-between' >
              <input
                className='input'
                name='from'
                type="time"
                defaultValue={timeStr(state.from)}
              />
              <FaLongArrowAltRight className='inline fill-light-secondary ml-2 mr-2' />
              <input
                  className='input'
                  name='to'
                  type='time'
                  defaultValue={(() => {
                    const d = state.from
                    return timeStr((d.getHours() >= 22 || d.getHours() === 0) ?
                        new Date(d.getFullYear(), d.getMonth(), d.getDay(), 24, 0) :
                        new Date(d.getTime() + 2 * 3600000))
                  })()}
              />
            </div>

            <div className='mt-1 mb-3 border-b-2 border-light-secondary border-opacity-20 pb-4'>
              <label
                  className='title-content'
                  htmlFor="instructors">
                Instruktörer:
              </label>
              <MultiInput
                options={getNames(instructors)}
                placeholder='Lägg till en instruktör'
				        defaultValue={map(i => { return {name: i.name, id: 0}}, instructors!)}
              />
            </div>
            <div className='mt-1 mb-1'>
              <label className='title-content' htmlFor="students">Elever: </label>
              <MultiInput
                options={getNames(students)}
                placeholder='Lägg till en elev'
				        defaultValue={map(i => { return {name: i.name, id: 0}}, students!)}
              />
            </div>
          </div>

          <div className='flex flex-col space-y-1 mt-10'>
            <button
                className='button-solid'
                type='submit'
                onClick={() => navigate(-1)}
            > Spara
            </button>
            <button
                className='button-outline'
                onClick={() => navigate(-1)}
            > Avbryt
            </button>
          </div>
        </div>
      </div>
    </div>

  )
}

/** 
 * Map date to time in format 'hh:mm'
 * 
 * @param date   
 */
function timeStr(date: Date): string {
  return date.toTimeString().substring(0, 5)
}

/** 
 * Map date to date in format 'yyyy-mm-dd'
 * 
 * @param date   
 */
function dateStr(date: Date): string {
  return date.toISOString().substring(0, 10)
}

export default SessionEditor
