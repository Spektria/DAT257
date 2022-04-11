declare module 'react-awesome-calendar' {
  import { ComponentClass, Component } from 'react'

  export type Event_ = {
    id: number
    color: string
    from: Date
    to: Date 
    title: string
  }
  
  export type Date_ = {
    year: number 
    month: number
    day: number
    hour: number   
  }

  export type CalendarState = {
    mode: string
    year: number
    month: number
    day: number
  }

  export type CalendarProps = {
    events?: Event_[]
    header?: Component
    onChange?: (newState : CalendarState) => void
    onClickEvent?: (id: number) => void 
    onClickTimeLine?: (date: Date_) => void
  }

  const Calendar: ComponentClass<CalendarProps>
  export default Calendar
}

