import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import AwesomeCalendar, { Event_ } from 'react-awesome-calendar';

const Calendar: FC<{events : Event_[]}> = ({ events }) => {
  const navigate = useNavigate()
  
  return (
    <AwesomeCalendar
      events={events}
      onClickEvent={id => navigate(`session/${id}`)}
      onClickTimeLine={ date => navigate('/newsession', { state: { date } })}
    />
  );
}

export default Calendar
