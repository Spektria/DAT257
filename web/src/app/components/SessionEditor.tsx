import { useReducer, FC } from 'react';
import { Date_ } from 'react-awesome-calendar'
import { SessionData, Either } from '../../types/types'
import MultiInput from './MultiInput'
import { FaLongArrowAltRight } from 'react-icons/fa'

const SessionEditor: FC<Either<Date_, SessionData>> = ({ left, right }) => {
  if (right !== undefined)
    return (<Form {...right} />)

  const { year, month, day, hour } = left
  return (
    <Form
      id={0}  /* create a new id */
      title="Pass"
      location=""
      from={new Date(`${year}-${month}-${day}T${hour}:00:00+00:00`)}
      to={new Date(`${year}-${month}-${day}T${hour}:00:00+00:00`)}
      instructors={[]}
      participants={[]}
    />
  )
}

const Form: FC<SessionData> = initState => {
  const reducer = (prevState: SessionData, newFields: Partial<SessionData>) => ({ ...prevState, ...newFields })
  const [state, dispatch] = useReducer(reducer, initState)

  return (
    <div className='flex flex-col items-center bg-gray-500 h-screen'>
      <div className='bg-white mt-10 w-full md:w-fit rounded-t md:rounded pl-4 pr-4 pt-4 pb-4 flex flex-col h-full md:h-fit justify-between border'>
        <div className='flex flex-col'>
          <div className='flex-row justify-between mt-1 mb-1 '>
            <input className='input text-lg' name='title' type="text" placeholder="Titel" />
          </div>

          <div className='flex-row justify-between mt-1 mb-3 border-b-2 pb-4'>
            <input className='input text-lg' name='place' type="text" placeholder="Plats" />
          </div>

          <p className='text-lg'>Datum</p>
          <div className='flex mt-1 mb-3 border-b-2 pb-4 items-center justify-between' >
            <input className='border border-solid pl-1 pr-1' name='from' type="date" />
            <FaLongArrowAltRight className='inline ml-2 mr-2' />
            <input className='border border-solid pl-1 pr-1' name='to' type="date" />
          </div>

          <p className='text-lg'>Tid</p>
          <div className='flex mt-1 mb-3 border-b-2 pb-4 items-center justify-between' >
            <input className='border border-solid pl-1 pr-1' name='from' type="time" />
            <FaLongArrowAltRight className='inline ml-2 mr-2' />
            <input className='border border-solid pl-1 pr-1' name='from' type="time" />
          </div>


          <div className='mt-1 mb-3 border-b-2 pb-4'>
            <label className='text-lg' htmlFor="instructors">Instruktörer: </label>
            <MultiInput name="instructors" options={['Erik', 'Sofia', 'Karl', 'Björn']} placeholder='Lägg till en instruktör' />
          </div>
          <div className='mt-1 mb-1'>
            <label className='text-lg' htmlFor="students">Elever: </label>
            <MultiInput name="students" options={['Markus']} placeholder='Lägg till en elev' />
          </div>
        </div>

        <div className='flex flex-col space-y-1 bg-white mt-10'>
          <input className='cursor-pointer text-base font-semibold bg-red-400 text-white pt-1 pb-1 rounded border border-red-500 transition-all ease-out hover:shadow-inner active:shadow-inner active:bg-red-600 active:border-red-700' type='submit' value='Spara' />
          <button className='text-base font-semibold pt-1 pb-1 rounded border border-solid border-gray-200 transition-all ease-out active:bg-gray-200 hover:shadow-inne active:shadow-inner active:border-gray-400'>Avbryt</button>
        </div>
      </div>
    </div>
  )
}

export default SessionEditor
