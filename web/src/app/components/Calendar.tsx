import { FC, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import AwesomeCalendar, { Event_ } from 'react-awesome-calendar';
import { useQuery, useQueryClient } from 'react-query'
import { getEvents } from '../apis/EventApi'
import { SessionData } from '../../types/types'
import { map } from 'ramda'

/** Calendar component */
const Calendar: FC = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [year, dispatch] = useReducer(
    (prevYear: number, newYear: number) => {
      if (prevYear !== newYear)
        queryClient.invalidateQueries('events')
      return newYear
    }
    , new Date().getFullYear())

  const { isLoading, error, data } =
    useQuery<SessionData[], Error>('events', () => getEvents(year), { staleTime:600000 })


  if (isLoading) return <p className='text-center p-10'>Loading...</p>
  if (error) return (
    <p className='text-center p-10'>
      An error has occurred: {error.message}
    </p>)

  return (
    <div className='pl-4 pr-4'>
      <AwesomeCalendar
        events={map(toEvent, data === undefined ? [] : data)}
        onChange={state => dispatch(state.year)}
        onClickEvent={id => navigate(`session/${id}`)}
        onClickTimeLine={date => navigate('/newsession', { state: { date } })}
      />
    </div>
  );
}


/** 
* Function for mapping SessionData to a calendar event
* @param session
* @returns a calendar event
*/
function toEvent(session: SessionData): Event_ {
  return (
    {
      id: session.id,
      color: '#fd3153',
      from: session.from,
      to: session.to,
      title: session.title,
    }
  )
}

export default Calendar
