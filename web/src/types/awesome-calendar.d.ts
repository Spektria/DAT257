declare module 'react-awesome-calendar' {
  import { ComponentClass } from 'react'

  export type CalendarEvent = {
    id: number
    color: string
    from: Date
    to: Date 
    title: string
  }
  
  export type CalendarDate = {
    year: number 
    month: number
    day: number
    hour: number   
  }
  
  export type CalendarMode = 'dailyMode' | 'monthlyMode' | 'yearlyMode'

  export type CalendarState = {
    mode: CalendarMode
    year: number
    month: number
    day: number
  }

  export type CalendarHeader = {
    current: Exclude<CalendarMode, CalendarState>
    mode: CalendarMOde
    prev: Exclude<CalendarMode, CalendarState>
    next: Exclude<CalendarMode, CalendarState>
    onClickPrev: () => void
    onClickNext: () => void
  }

  export type CalendarProps = {
    events?: CalendarEvent[]
    header?: CalendarHeader
    onChange?: (newState : CalendarState) => void
    onClickEvent?: (id: number) => void 
    onClickTimeLine?: (date: CalendarDate) => void
  }

  export interface AwesomeCalendarComponent extends ComponentClass<CalendarProps>{
    getDetails(): () => CalendarDate
    returnDailyEvents: () => CalendarEvent[]
    onClickTimeLine: (hour: number) => void
    onClickDay: (date: Date) => void
    onClickMonth: (month: number) => void
    onClickPrev: () => void
    onClickNext: () => void
    onClickMode: (mode: CalendarMode) => void
  }

  const Calendar: AwesomeCalendarComponent
  export default Calendar
}

