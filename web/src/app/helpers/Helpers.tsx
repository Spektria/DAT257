import { CalendarMode } from 'react-awesome-calendar';
import { Either } from '../../types/types'
import { map } from 'ramda' 

/**
 * Converts a non-well defined function, which may return undefined, to a well defined function, which may only return defined values.
 * 
 * @param f - The function
 * @param _else - The fallback value
 * 
 * @returns The new well defined function
 */
export function orElse<X, Y>(f: (_: X | void) => Y | undefined, _else: Y): (_: X) => Y {
  return (x: X) => {
    const y = f(x);
    if (y === undefined)
      return _else;
    else
      return y;
  }
}

/**
 * Produce singleton list.
 * 
 * @param x
 * 
 * @returns [x]
 */
export function singleton<T>(x: T){ return [x]}

/**
 * Identity function
 * 
 * @param x
 * 
 * @returns x
 */
export function id<T>(x : T){ return x }

/**
 * Check if left
 *  
 * @param either
 * 
 * @returns True if left
 */
export function isLeft<T, U>({ left }: Either<T, U>) {
  return left ? true : false
}

/**
 * Check if left
 *  
 * @param either
 * 
 * @returns True if left
 */
export function isRight<T, U>({ right }: Either<T, U>) {
  return right ? true : false 
}

/**
 * 
 * @param f - function to be applied on left
 * @param g - function to be applied on right
 * 
 * @returns The return value of f or g
 */
export function either<T, U, V>(f: (_: T) => V, g: (_: U) => V, x: Either<T, U>): V {
  return isLeft(x) ? f(x.left!) : g(x.right!)
}

/**
 * Extracts all the left elements
 * 
 * @param xs - list of Either
 * 
 * @returns All the left elements
 */
export function lefts<T, U>(xs: Either<T, U>[]): T[]{
  return map(x => either(singleton, _ => [], x), xs).flat()
}

/**
 * Extracts all the right elements
 * 
 * @param xs - list of Either
 * 
 * @returns All the right elements
 */
export function rights<T, U>(xs: Either<T, U>[]): U[]{
  return map(x => either(_ => [], singleton, x), xs).flat()
}

/**
 * Produces a CalendarState from arguments 
 * 
 * @param date
 * @param mode
 * 
 * @returns CalendarState
 */
export function toCalendarState(date: Date, mode: CalendarMode){
  return {
    mode: mode,
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate()
  }
}
