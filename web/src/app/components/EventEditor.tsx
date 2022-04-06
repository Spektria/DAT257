import { useState } from 'react';

type Data = { title?      : string
            , from?       : Date
            , to?         : Date
            , instructor? : string
            , students?   : string
            , color?      : string
            }

const EventEditor = (): JSX.Element => {
  const [state, setState] = useState<Data>()

      /* {state} */
  return (
    <div className="grid place-items-center h-screen">
      <form onSubmit={() => console.log("Check the data and save in database if ok")}>
        <label>
          Title:   
          <input type="text" value={state?.title} onChange={e => setState({title: e.target.value})}/>
        </label>
      </form>
    </div>
  )
}


export default EventEditor
