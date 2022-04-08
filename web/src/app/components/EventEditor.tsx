import { useState } from 'react';

/*
Simple startkomponent for inputs. 

useState : är en react hook https://reactjs.org/docs/hooks-state.html
title?   : frågetecknet betyder att fielden inte är nödvändig (att den kan vara undefined) 
=> : är symbolen för en lamdafunktion
className : är var man stoppar in tailwind-funktioner/klasser https://tailwindcss.com/docs/utility-first
*/


type Data = {
  place?: string
  , from?: Date
  , to?: Date
  , instructor?: string
  , students?: string
  , color?: string
}

//{"year": year, "month": month, "day": day, "hour": hour}

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
          <input type="text" value={state?.place} onChange={e => setState({ place: e.target.value })} />
        </label>
        <br></br>
        <br></br>
        <h4>Från: &nbsp;
          <input type="datetime-local" id="Test_DatetimeLocal" onChange={e => setState({ from: new Date(e.target.value)})}/>
        </h4>
        <br></br>
        <h4>Till: &nbsp;
          <input type="datetime-local" id="Test_DatetimeLocal" />
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
