import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import AwesomeCalendar, { Event_ } from 'react-awesome-calendar';
import { useQuery } from 'react-query'
import { getEvents } from '../apis/EventApi'
import { SessionData } from '../../types/types'
import { map } from 'ramda'

const Calendar: FC = () => {
  const navigate = useNavigate()
  const query = useQuery('events', getEvents)
  const events = map(
    toEvent 
    , query.data === undefined ? [] : query.data)

  return (
   <div className='pl-4 pr-4'>
    <AwesomeCalendar 
      events={events}
      onClickEvent={id => navigate(`session/${id}`)}
      onClickTimeLine={ date => navigate('/newsession', { state: { date } })}
    />
   </div>
  );
}


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
