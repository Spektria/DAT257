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

function IndicatorManager() {
  const { status: events_status } = useQuery('events', { enabled: false })
  const { status: users_status } = useQuery('student-instructor-names', { enabled: false })

  function newIndicator(status: Status, loadingMsg: string, errMsg: string) {
    return ({
      status: status,
      loadingMsg: loadingMsg,
      errMsg: errMsg,
    })
  }

  const indicators = [
    newIndicator(events_status, 'Hämtar händelser...', 'Gick inte att hämta händelser!'),
    newIndicator(users_status, 'Hämtar användare...', 'Gick inte att hämta användare!'),
  ]

  console.log(errors(indicators).n + loadings(indicators).n)

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

function Mobile({ indicators }: Props) {
  const { n: nLoad } = loadings(indicators)
  const { n: nErr } = errors(indicators)
  return (
    <div className='absolute z-30 flex top-2 left-4 justify-between space-x-2'>
      {nLoad > 0 &&
        <div className='text-light-primary flex items-center justify-between space-x-1.5'>
          {nLoad > 1 && <p>{nLoad}</p>}
          <LoadingIndicator text='' />
        </div>
      }
      {nErr > 0 &&
        <div className='text-red-500 flex items-center justify-between space-x-1.5'>
          {nErr > 1 && <p>{nErr}</p>}
          <ErrorIndicator text='' />
        </div>
      }
    </div>
  )
}

type Tuple = {
  n: number
  msgs: string[]
}

function errors(indicators: Indicator[]): Tuple {
  const xs = map(
    (x: Indicator) => x.errMsg,
    filter(x => x.status === 'error', indicators)
  )
  return { n: xs.length, msgs: xs }
}

function loadings(indicators: Indicator[]): Tuple {
  const xs = map(
    (x: Indicator) => x.loadingMsg,
    filter(x => x.status === 'loading', indicators)
  )
  return { n: xs.length, msgs: xs }
}

export default IndicatorManager
