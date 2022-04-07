declare module 'react-awesome-calendar' {
  import { ComponentClass, Component } from 'react'

  export type event = {
    id: number
    color: string
    from: Date
    to: Date 
    title: string
  }
  
  export type date = {
    year: number 
    month: number
    day: number
    hour: number   
  }

  export type calendarState = {
    mode: string
    year: number
    month: number
    day: number
  }

  export type CalendarProps = {
    events?: event[]
    header?: Component
    onChange?: (newState : calendarState) => void
    onClickEvent?: (id: number) => void
    onClickTimeLine?: (date: date) => void
  }

  const Calendar: ComponentClass<CalendarProps>
  export default Calendar
}

