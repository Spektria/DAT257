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

const SessionEditor: FC<Either<CalendarDate, SessionData>> = ({ left, right }) => {
  if (right !== undefined)
    return (<Form {...right} />)
  const { year, month, day, hour } = left
  const min = hour % 1 * 60
  return (
    <Form
      id={0}  /* create a new id */
      title=""
      location=""
      from={new Date(year, month, day, hour, min)}
      to={new Date(year, month, day, hour + 2, min)}
      instructors={[]}
      participants={[]}
    />
  )
}

const Form: FC<SessionData> = (initState) => {
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(
    (prevState: SessionData, newFields: Partial<SessionData>) => ({ ...prevState, ...newFields })
    , initState)
  const [fromDate, setFromDate] = useState(dateStr(initState.from))
  const [toDate, setToDate] = useState(fromDate)

  // Fetch names...
  const [students, setStudents] = useState<StudentData[]>(map(s => { return {name: s, email: ""} }, initState.participants));
  useEffect(() => {
    getStudents().then(s => setStudents(s));
  }, []);

  const [instructors, setInstructors] = useState<InstructorData[]>(map(i => { return {name: i, email: ""} }, initState.instructors));
  useEffect(() => {
    getStudents().then(s => setStudents(s));
  }, []);

  // Generalize extraction of names
  interface HasName { name: string }
  const getNames = (list: HasName[] | undefined) => orElse(() => list?.map(s => s.name), [])(null);

  // Fetch title and location
  const [title, setTitle] = useState(initState.title);
  const [location, setLocation] = useState(initState.location);

  return (
    <div className='fixed inset-0 z-10 scroll overflow-y-hidden'>
      <div 
        className='bg-gray-500 bg-opacity-75 h-screen' 
        onClick={() => navigate(-1)} 
      />
      <div className='absolute inset-0 mx-auto z-20 w-full md:w-fit mt-10'>
        <div className='bg-white w-full md:w-fit rounded-t md:rounded pl-4 pr-4 pt-4 pb-4 flex flex-col h-full md:h-fit justify-between border'>
          <div className='flex flex-col'>
		    <div className='flex-row justify-between mt-1 mb-1 '>
              <input className='input text-lg' name='title' type="text" placeholder="Titel" value={title} onChange={e => setTitle(e.target.value)}/>
            </div>
  
            <div className='flex-row justify-between mt-1 mb-3 border-b-2 pb-4'>
              <input className='input text-lg' name='place' type="text" placeholder="Plats" value={location} onChange={e => setLocation(e.target.value)}/>
            </div>

            <p className='text-lg'>Datum</p>
            <div className='flex mt-1 mb-3 border-b-2 pb-4 items-center justify-between' >
              <input
                className='border border-solid pl-1 pr-1'
                name='from'
                type="date"
                value={fromDate}
                onChange={e => setFromDate(e.target.value)}
              />
              <FaLongArrowAltRight className='inline ml-2 mr-2' />
              <input
                className='border border-solid pl-1 pr-1'
                name='to'
                type="date"
                min={fromDate}
                value={toDate}
                onChange={e => setToDate(e.target.value)}
              />
            </div>

            <p className='text-lg'>Tid</p>
            <div className='flex mt-1 mb-3 border-b-2 pb-4 items-center justify-between' >
              <input
                className='border border-solid pl-1 pr-1'
                name='from'
                type="time"
                defaultValue={timeStr(initState.from)}
              />
              <FaLongArrowAltRight className='inline ml-2 mr-2' />
              <input
                className='border border-solid pl-1 pr-1'
                name='to'
                type='time'
                defaultValue={(() => {
                  const d = initState.from
                  return timeStr((d.getHours() >= 22 || d.getHours() === 0) ?
                    new Date(d.getFullYear(), d.getMonth(), d.getDay(), 24, 0) :
                    new Date(d.getTime() + 2 * 3600000))
                })()}
              />
            </div>

            <div className='mt-1 mb-3 border-b-2 pb-4'>
              <label
                className='text-lg'
                htmlFor="instructors">
                Instruktörer:
              </label>
              <MultiInput
                options={getNames(instructors)}
                placeholder='Lägg till en instruktör'
				defaultValue={map(i => { return {name: i.name, id: 0}}, instructors)}
              />
            </div>
            <div className='mt-1 mb-1'>
              <label className='text-lg' htmlFor="students">Elever: </label>
              <MultiInput
                options={getNames(students)}
                placeholder='Lägg till en elev'
				defaultValue={map(i => { return {name: i.name, id: 0}}, students)}
              />
            </div>
          </div>

          <div className='flex flex-col space-y-1 bg-white mt-10'>
            <button
              className='cursor-pointer text-base font-semibold bg-red-400 
                       text-white pt-1 pb-1 rounded border border-red-500 
                       transition-all ease-out hover:shadow-inner 
                       active:shadow-inner active:bg-red-600
                       active:border-red-700'
              type='submit'
              onClick={() => navigate(-1)}
            > Spara
            </button>
            <button
              className='text-base font-semibold pt-1 pb-1 rounded border 
                       border-solid border-gray-200 transition-all 
                       ease-out active:bg-gray-200 hover:shadow-inne 
                       active:shadow-inner active:border-gray-400'
          
              onClick={() => navigate(-1)}
            > Avbryt
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function timeStr(date: Date): string {
  return date.toTimeString().substring(0, 5)
}

function dateStr(date: Date): string {
  return date.toISOString().substring(0, 10)
}

export default SessionEditor
