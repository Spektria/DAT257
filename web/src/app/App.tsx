import { FC } from 'react';
import Session from './components/Session';
import SessionEditor from './components/SessionEditor';
import NotFound from './components/NotFound';
import Calendar from './components/Calendar';
import { Event_, Date_ } from 'react-awesome-calendar'
import { SessionData } from '../types/types';
import { find, map } from 'ramda'
import sessions from './Data'
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  useLocation,
  Params,
} from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { getEvents } from './apis/EventApi'

const App: FC = () => {
  const events = map(toEvent, sessions)

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="/newsession" element={<NewSession />} />
          <Route path="/session/:id" element={<ViewSession />} />
          <Route path="/session/:id/edit" element={<EditSession />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

const queryClient = new QueryClient()

const NewSession = () => <SessionEditor {...{left: (useLocation().state as {date : Date_}).date}}/>

const ViewSession = () => WithParam<Number>(checkIdParam, id => {
  const session = find(e => e.id === id, sessions)
  return session === undefined ? undefined : <Session {...session}/>
})

const EditSession = () => WithParam<Number>(checkIdParam, id => {
  const session = find(e => e.id === id, sessions)
  return session === undefined ? undefined : <SessionEditor {...{right: session}}/>
})

function checkIdParam(ps: Readonly<Params<string>>): Number | undefined {
  const id = ps.id
  return (id === undefined || isNaN(+id)) ? undefined : parseInt(id)
}

function WithParam<T>(f: (ps: Readonly<Params<string>>) => T | undefined, g: (t : T) => JSX.Element | undefined): JSX.Element {
  const x = f(useParams())
  if (x === undefined)
    return <NotFound />
  const comp = g(x)
  if (comp === undefined)
    return <NotFound />
  return comp
} 


export default App;
