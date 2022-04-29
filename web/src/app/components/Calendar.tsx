import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import AwesomeCalendar, { Event_ } from 'react-awesome-calendar';

const Calendar: FC<{events : Event_[]}> = ({ events }) => {
  const navigate = useNavigate()
  
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

export default Calendar
