import { useState } from 'react';

/*
Simple startkomponent for inputs. 

useState : är en react hook https://reactjs.org/docs/hooks-state.html
title?   : frågetecknet betyder att fielden inte är nödvändig (att den kan vara undefined) 
=> : är symbolen för en lamdafunktion
className : är var man stoppar in tailwind-funktioner/klasser https://tailwindcss.com/docs/utility-first
*/


type Data = { title?      : string
            , from?       : Date
            , to?         : Date
            , instructor? : string
            , students?   : string
            , color?      : string
            }

const EventEditor = (): JSX.Element => {
  const [state, setState] = useState<Data>()

  return (
    <div className="grid place-items-center h-screen">
      <form onSubmit={() => console.log("Check the data and save in database if ok")}>
        <label>
          Title: &nbsp;
          <input type="text" value={state?.title} onChange={e => setState({title: e.target.value})}/>
        </label>
        <br></br>
        <br></br>
        <h4>From: &nbsp;
          <input type="datetime-local" id="Test_DatetimeLocal"/>
        </h4>
        <br></br>
        <h4>To: &nbsp;
          <input type="datetime-local" id="Test_DatetimeLocal"/>
        </h4>
        <br></br>
        <label>
          Instructor: &nbsp;  
          <input type="text" value={state?.instructor} onChange={e => setState({instructor: e.target.value})}/>
        </label>
        <br></br>
        <br></br>
        <label>
          Students: &nbsp;
          <input type="text" value={state?.students} onChange={e => setState({students: e.target.value})}/>
        </label>
        <p>{state?.title}</p>
      </form>
    </div>
  )
}


export default EventEditor
