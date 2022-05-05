import { FC } from 'react';
import Session from './components/Session';
import SessionEditor from './components/SessionEditor';
import NotFound from './components/NotFound';
import { StudentEducationalMomentsData } from '../types/types';
import StudentProfile from './components/StudentProfile';
import studentProfileData from './sData';
import Calendar from './components/Calendar';
import { LocationState } from '../types/types';
import { find } from 'ramda'
import sessions from './Data'
import {
  Routes,
  Route,
  useParams,
  useLocation,
  Params,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const App: FC = () => {
  const location = useLocation()
  const state = location.state as Partial<LocationState>
  const RouteCalendarModal = (path: string) => (
    <Route path={path}
      element={state?.background ?
        <Calendar /> :
        <Navigate
          to={location.pathname}
          state={{ ...state, background: location }} />}
    />)


  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="*" element={<NotFound />} />
        { RouteCalendarModal("/newsession") } 
        { RouteCalendarModal("session/:id") }
        { RouteCalendarModal("session/:id/edit") }
      </Routes>

      {state?.background && (
        <Routes>
          <Route path="/newsession" element={<NewSession />} />
          <Route path="/session/:id" element={<ViewSession />} />
          <Route path="/session/:id/edit" element={<EditSession />} />
          <Route path="/session/studentprofile" element={<StudentProfile student='Alice Albertsson' email='AliceA@outlook.com' educationalMoments={["Starta", "Köra på vågor", "Parkera", "uppkörning"]} completed={[true, false, true, false]} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

const queryClient = new QueryClient()

const NewSession = () => <SessionEditor {...{ left: (useLocation().state as LocationState).date }} />

const ViewSession = () => WithParam<Number>(checkIdParam, id => {
  const session = find(e => e.id === id, sessions)
  return session === undefined ? undefined : <Session {...session} />
})

const EditSession = () => WithParam<Number>(checkIdParam, id => {
  const session = find(e => e.id === id, sessions)
  return session === undefined ? undefined : <SessionEditor {...{ right: session }} />
})

function checkIdParam(ps: Readonly<Params<string>>): Number | undefined {
  const id = ps.id
  return (id === undefined || isNaN(+id)) ? undefined : parseInt(id)
}

function WithParam<T>(f: (ps: Readonly<Params<string>>) => T | undefined, g: (t: T) => JSX.Element | undefined): JSX.Element {
  const x = f(useParams())
  if (x === undefined)
    return <NotFound />
  const comp = g(x)
  if (comp === undefined)
    return <NotFound />
  return comp
}

export default App;
