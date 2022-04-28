import { SessionData } from '../../types/types'

export async function getEvents(year : number): Promise<SessionData[]>{
  const res = await fetch(
    `http://localhost:8080/events?from=${new Date(year, 1, 1).toISOString()}&to=${new Date(year, 11, 31).toISOString()}`)
  return res.json()
}

