import MediaQuery from 'react-responsive'
import LoadingIndicator from './LoadingIndicator'
import ErrorIndicator from './ErrorIndicator'
import { filter, map } from 'ramda'
import { useQuery } from 'react-query'


type Indicator = {
  status?: string,
  loadingMsg: string
  errMsg: string
}

type Status = "idle" | "error" | "loading" | "success"

/**
 * Observes and displays query indicators
 */
function IndicatorManager() {
  const conf = { enabled: false }
  /* Observeres */ 
  const { status: events_status } = useQuery('events', conf)
  const { status: instructor_status } = useQuery('student-instructor-names', conf)
  const { status: student_status } = useQuery('student', conf)
  const { status: moments_status } = useQuery('moments', conf)

  /**
   * Constructor for record
   */
  function newIndicator(status: Status, loadingMsg: string, errMsg: string) {
    return ({
      status: status,
      loadingMsg: loadingMsg,
      errMsg: errMsg,
    })
  }

  const indicators = [
    newIndicator(events_status, 'Hämtar händelser...', 'Gick inte att hämta händelser!'),
    newIndicator(instructor_status, 'Hämtar instruktörer...', 'Gick inte att hämta instruktörer!'),
    newIndicator(student_status, 'Hämtar elever...', 'Gick inte att hämta elever!'),
    newIndicator(moments_status, 'Hämtar kunskapsmoment...', 'Gick inte att hämta kunskapsmoment!'),
  ]

  return (
    <>
      {(errors(indicators).n + loadings(indicators).n) !== 0 &&
        <MediaQuery minWidth={768} >
          {(matches: boolean) => matches
            ? <Desktop indicators={indicators} />
            : <Mobile indicators={indicators} />}
        </MediaQuery>
      }
    </>
  )
}

type Props = { indicators: Indicator[] }

/**
 * Displays indicators on Desktop
 * 
 * @param props 
 * @param props.indicators
 */
function Desktop({ indicators }: Props) {
  const { msgs: msgsLoad } = loadings(indicators)
  const { msgs: msgsErr } = errors(indicators)
  return (
    <ul
      className='absolute z-30 left-2 flex flex-col justify-between
                 space-y-1 p-2'>
      {map(msg => (<li key={msg.toString()}><LoadingIndicator text={msg} /></li>), msgsLoad)}
      {map(msg => (<li key={msg.toString()}><ErrorIndicator text={msg} /></li>), msgsErr)}
    </ul>
  )
}

/**
 * Displays indicators on Desktop
 * 
 * @param props 
 * @param props.indicators
 */
function Mobile({ indicators }: Props) {
  const { n: nLoad } = loadings(indicators)
  const { n: nErr } = errors(indicators)
  return (
    <div className='absolute z-30 flex top-2 left-4 justify-between space-x-2'>
      {nLoad > 0 &&
        <div className='text-light-primary flex justify-between space-x-1.5'>
          <LoadingIndicator text='' />
          {nLoad > 1 && <p className='leading-none pt-[0.75px]'>{nLoad}</p>}
        </div>
      }
      {nErr > 0 &&
        <div className='text-red-500 flex justify-between space-x-1.5'>
          <ErrorIndicator text='' />
          {nErr > 1 && <p className='leading-none pt-[0.75px]'>{nErr}</p>}
        </div>
      }
    </div>
  )
}

type Tuple = {
  n: number
  msgs: string[]
}

/**
 * Extracts the indicators that have status error
 *
 * @param indicators
 *
 * @returns a Tuple an indicator count and the messages
 */
function errors(indicators: Indicator[]): Tuple {
  const xs = map(
    (x: Indicator) => x.errMsg,
    filter(x => x.status === 'error', indicators)
  )
  return { n: xs.length, msgs: xs }
}

/**
 * Extracts the indicators that have status loading
 *
 * @param indicators
 *
 * @returns a Tuple an indicator count and the messages
 */
function loadings(indicators: Indicator[]): Tuple {
  const xs = map(
    (x: Indicator) => x.loadingMsg,
    filter(x => x.status === 'loading', indicators)
  )
  return { n: xs.length, msgs: xs }
}

export default IndicatorManager
