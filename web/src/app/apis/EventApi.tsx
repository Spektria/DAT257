import { SessionData } from '../../types/types'
import { ServerURL } from './URIs'

/**
* Api for fetching all events for a specified year.
* @param year 
* @returns a promise of the body containing an array of SessionData
* @remarks the url is currently set to localhost which means
*          it will only work on the host. 
*/
export async function getEvents(year : number): Promise<SessionData[]>{
  const res = await fetch(
    `${ServerURL}/events?from=${new Date(year, 1, 1).toISOString()}&to=${new Date(year, 11, 31).toISOString()}`)
  return res.json()
}

