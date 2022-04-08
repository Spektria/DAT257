import { useState } from 'react';

type Data = {
  place?: string
  , from?: Date
  , to?: Date
  , instructor?: string
  , students?: string
  , color?: string
}

const EventEditor = (): JSX.Element => {
  const [state, setState] = useState<Data>()

  return (
    <div className="grid place-items-center h-screen">
      <form onSubmit={() => console.log("Check the data and save in database if ok")}>
        <label>Skapa uppkörningstillfälle</label>
        <br></br>
        <br></br>
        <label>
          Plats: &nbsp;
          <input type="text" onChange={e => setState({ place: e.target.value })} />
        </label>
        <br></br>
        <br></br>
        <h4>Från: &nbsp;
          <input type="datetime-local" onChange={e => setState({ from: new Date(e.target.value)})}/>
        </h4>
        <br></br>
        <h4>Till: &nbsp;
          <input type="datetime-local" onChange={e => setState({ to: new Date(e.target.value)})}/>
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
          <input type="text" value={state?.students} onChange={e => setState({ students: e.target.value })} />
        </label>
        <p>{state?.place}</p>
        <br></br>
        <button
          type="button">Skapa
        </button>
        &nbsp;
        <button
          type="button">Avbryt
        </button>
      </form>

    </div>
  )
}




export default EventEditor
