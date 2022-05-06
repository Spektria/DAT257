import { useReducer, FC, useState, useEffect } from 'react';
import { CalendarDate } from 'react-awesome-calendar'
import { SessionData, Either, StudentData, InstructorData } from '../../types/types'
import MultiInput from './MultiInput'
import { FaLongArrowAltRight } from 'react-icons/fa'
import { getStudents } from '../apis/StudentApi';
import { getInstructors } from '../apis/InstructorApi';
import { orElse } from '../helpers/Helpers';
import { useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from 'react-query'

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

  const [students, setStudents] = useState<StudentData[]>();
  const [instructors, setInstructors] = useState<InstructorData[]>();
  const { isLoading, error, data } = useQuery<[StudentData[], InstructorData[]], Error>(
        'student-instructor-names'
        , async () => [await getStudents(), await getInstructors()]
        , { staleTime: 600000 })

  if(isLoading) return <p className='fixed text-center p-10 top-20 z-20'>Loading...</p>;
  if(error) return <p className='fixed text-center p-10 top-20 z-20'>An error has occurred: {error.message}</p>;
  
  if(students === undefined)
    setStudents(orElse(() => data?.[0], []));

  if(instructors === undefined)
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
      <div className='fixed inset-0 mx-auto z-10 w-full mt-10 md:w-fit md:mt-2'>
        <div className='card-modal'>
          <div className='relative px-8 pt-8 sm:p-6 sm:pb-10'>
            <div className="border-b-2 border-light-secondary border-opacity-20 pb-5">
              <h1 className="title-page">Lägg till uppkörningstillfälle</h1>
            </div>
            <div className='flex-row justify-between mt-5 mb-1'>
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
                defaultValue={timeStr(initState.from)}
              />
              <FaLongArrowAltRight className='inline fill-light-primary ml-2 mr-2' />
              <input
                className='input'
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

            <div className='mt-1 mb-3 border-b-2 border-light-secondary border-opacity-20 pb-4'>
              <label
                className='title-content'
                htmlFor="instructors">
                Instruktörer:
              </label>
              <MultiInput
                options={getNames(instructors)}
                placeholder='Lägg till en instruktör'
              />
            </div>
            <div className='mt-1 mb-1'>
              <label className='title-content' htmlFor="students">Elever: </label>
              <MultiInput
                options={getNames(students)}
                placeholder='Lägg till en elev'
              />
            </div>
          </div>

          <div className='absolute bottom-0 w-full md:relative px-4 py-6 md:px-6 md:flex md:flex-row-reverse'>
            <button
              className='button-solid'
              type='submit'
              onClick={() => navigate(-1)}
            > Lägg till
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

function timeStr(date: Date): string {
  return date.toTimeString().substring(0, 5)
}

function dateStr(date: Date): string {
  return date.toISOString().substring(0, 10)
}

export default SessionEditor
