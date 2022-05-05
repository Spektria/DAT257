import { FC, useState } from 'react';
import Session from './components/Session';
import SessionEditor from './components/SessionEditor';
import NotFound from './components/NotFound';
import { StudentEducationalMomentsData } from '../types/types';
import StudentProfile from './components/StudentProfile';
import studentProfileData from './sData';
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

const App: FC = () => {
  const [events, setEvents] = useState<Event_[]>(() => map(toEvent, sessions))

  return (
    <div className='pl-10 pr-10'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Calendar events={events} />} />
          <Route path="/newsession" element={<NewSession />} />
          <Route path="/session/:id" element={<ViewSession />} />
          <Route path="/session/:id/edit" element={<EditSession />} />
          <Route path="/session/studentprofile" element={<StudentProfile student='Alice Albertsson' email='AliceA@outlook.com' educationalMoments={["Starta", "Köra på vågor", "Parkera", "uppkörning"]} completed={[true, false, true, false]} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


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

function toEvent(session: SessionData): Event_ {
  return (
    {
      id: session.id,
      color: '#fd3153',
      from: session.from,
      to: session.to,
      title: session.title,
    }
  )
}

export default App;
