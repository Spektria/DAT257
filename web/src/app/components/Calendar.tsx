import { Component, LegacyRef, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import AwesomeCalendar, { CalendarEvent, AwesomeCalendarComponent, CalendarProps, CalendarState } from 'react-awesome-calendar';
import { SessionData } from '../../types/types'
import { map } from 'ramda'
import { useSwipeable } from 'react-swipeable'


type Props = 
  { onChange : (s: CalendarState) => void 
    sessions : SessionData[]
  }

/** 
 *  Wrapper for AwesomeCalendar
 * 
 * @param props
 * @param props.onChange - Change handler for CalendarState
 * @param props.sessions 
 */
function Calendar({ onChange, sessions } : Props) {
  const location = useLocation()
  const navigate = useNavigate()


  /**
   * Reference for AwesomeCalendar
   * 
   * @remarks 
   *  
   * Through the reference it is possible access all the methods defined in
   * the AwesomeCalendarComponent interface, see file 'awesome-calendar.d.ts'.
   * Currently only onClickPrev and onClickNext are used.
   * 
   * @see {@link https://reactjs.org/docs/hooks-reference.html#useref}
   * @see {@link https://github.com/fredins/react-awesome-calendar}
   */ 
  const ref = useRef<AwesomeCalendarComponent>(null)

  /**
   * Swipe Handlers for changing year, month, or day
   * 
   * @see {@link https://github.com/FormidableLabs/react-swipeable}
   */
  const swipeHandlers = useSwipeable({
    onSwipedRight: _ => ref.current?.onClickPrev(),
    onSwipedLeft: _ => ref.current?.onClickNext()
  })


  return (
    <div
      className='pl-4 pr-4'
      {...swipeHandlers}
    >
      <AwesomeCalendar
        events={map(toEvent, sessions)}
        onChange={onChange}
        onClickEvent={id => navigate(`session/${id}`, { state: { background: location } })}
        onClickTimeLine={date => navigate('/newsession', { state: { background: location, date: date } })}
        ref={ref as unknown as LegacyRef<Component<CalendarProps, any, any>> | undefined}
      />
    </div>
  );
}


/** 
* Function for mapping SessionData to CalendarEvent 
* @param session
* @returns a calendar event
*/
function toEvent(session: SessionData): CalendarEvent {
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
