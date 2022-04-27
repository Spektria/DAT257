import { SessionData } from '../../types/types'

export async function getEvents(): Promise<SessionData[]>{
  const res = await fetch("http://localhost:8080/events")
  return res.json()
}

