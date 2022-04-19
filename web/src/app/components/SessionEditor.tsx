import { useReducer, FC } from 'react';
import { Date_ } from 'react-awesome-calendar'
import { SessionData, Either } from '../../types/types'

const SessionEditor: FC<Either<Date_, SessionData>> = ({left, right}) => { 
    if (right !== undefined)
      return (<Form {...right}/>)

    const {year, month, day, hour} = left
    return (
    <Form
      id={0}  /* create a new id */
      title="Pass" 
      location=""
      from={new Date(`${year}-${month}-${day}T${hour}:00:00+00:00`)}
      to={new Date(`${year}-${month}-${day}T${hour}:00:00+00:00`)}
      instructors={[]}
      participants={[]}
    />
    )
}

const Form : FC<SessionData> = initState => {
  const reducer = (prevState : SessionData, newFields : Partial<SessionData>) => ({...prevState, ...newFields})
  const [state, dispatch] = useReducer(reducer, initState)

  return (
    <div className="grid place-items-center h-screen">
      <form onSubmit={() => console.log("Check the data and save in database if ok")}>
        <label>Skapa uppkörningstillfälle</label>
        <br></br>
        <br></br>
        <label>
          Plats: &nbsp;
          <input type="text" onChange={e => dispatch({ location: e.target.value })} />
        </label>
        <br></br>
        <br></br>
        <h4>Från: &nbsp;
          <input type="datetime-local" onChange={e => dispatch({ from: new Date(e.target.value) })} />
        </h4>
        <br></br>
        <h4>Till: &nbsp;
          <input type="datetime-local" onChange={e => dispatch({ to: new Date(e.target.value) })} />
        </h4>
        <br></br>
        <label>Instruktör:</label>

        <select>
          <option> Erik</option>
          <option> Erika</option>
          <option> Klas</option>
          <option> Hans</option>
        </select>
        <br></br>
        <br></br>
        <label>
          Elever: &nbsp;
          <input type="text" value={state?.participants} onChange={e => dispatch({ participants: [e.target.value] })} />
        </label>
        <p>{state?.participants}</p>
        <br></br>
        <button
          type="button"
        >Skapa</button>
        &nbsp;
        <button
          type="button">Avbryt
        </button>
      </form>

    </div>
  )
}

export default SessionEditor
