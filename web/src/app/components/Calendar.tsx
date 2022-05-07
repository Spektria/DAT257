import { useReducer, Component, LegacyRef, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import AwesomeCalendar, { CalendarEvent, AwesomeCalendarComponent, CalendarProps } from 'react-awesome-calendar';
import { useQuery, useQueryClient } from 'react-query'
import { getEvents } from '../apis/EventApi'
import { SessionData } from '../../types/types'
import { map } from 'ramda'
import { useSwipeable } from 'react-swipeable'

/** 
 *  Wrapper for AwesomeCalendar
 */
function Calendar() {
  const location = useLocation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()


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

  /**
   * Reducer for fetching new events on year onChange
   * 
   * @remarks 
   *
   * It keeps track of selected year and invalidates
   * the event query on year change
   * @see {@link https://react-query.tanstack.com/guides/query-invalidation}
   * @see {@link https://reactjs.org/docs/hooks-reference.html#usereducer}
   */
  const [year, dispatch] = useReducer(
    (prevYear: number, newYear: number) => {
      if (prevYear !== newYear)
        queryClient.invalidateQueries('events')
      return newYear
    }
    , new Date().getFullYear())


  /**
   * Queries events and display and returns early if loading or error
   *
   * @remarks staleTime is used extended (from 0) to avoid refetching.
   *  
   * @see {@link https://react-query.tanstack.com/reference/useQuery}
   * @see {@link https://react-query.tanstack.com/guides/initial-query-data#staletime-and-initialdataupdatedat}
   */
  const { isLoading, error, data } =
    useQuery<SessionData[], Error>('events', () => getEvents(year), { staleTime: 600000 })
  if (isLoading) return <p className='text-center p-10'>Loading...</p>
  if (error) return (
    <p className='text-center p-10'>
      An error has occurred: {error.message}
    </p>)


  return (
    <div
      className='pl-4 pr-4'
      {...swipeHandlers}
    >
      <AwesomeCalendar
        events={map(toEvent, data === undefined ? [] : data)}
        onChange={state => dispatch(state.year)}
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
