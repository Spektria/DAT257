import { Navigate } from 'react-router-dom'
import { LocationState } from '../../types/types'

type Props = { state: Partial<LocationState> } 

/**
 * Not found component that automatically redirects to home
 * 
 * @param props
 * @param props.state - Location state
 *
 * @see {@link https://github.com/remix-run/history/blob/main/docs/api-reference.md#location}
 */ 
function NotFound({ state } : Props ){
  return (<Navigate
    to="/"
    state={{ ...state, background: undefined }} 
   />)
}

export default NotFound
