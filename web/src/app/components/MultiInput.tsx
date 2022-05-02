import { FC, useReducer, useState } from 'react'
import { map, none } from 'ramda'
import ListProfile from './ListProfile'
import { MdAddCircle } from 'react-icons/md'
import TextSelector from './TextSelector'

/**
* @field options - Options for input
* @field placeholder - Placeholder for input
* @field onChange - Callback for when the list updates
*/
type Props = {
  options: string[]
  placeholder?: string
  onChange?: (arr: Input[]) => void
}

/**
*  @field name - Name of person/item
*  @field id - Id of person/item
*/
type Input = {
  name: string
  id: number
}

/** Mutli input component with searchable options. */
const MultiInput: FC<Props> = ({ options, placeholder, onChange }) => {
  const [list, dispatch] = useReducer(reducer, [])
  const [input, setInput] = useState("")

  return (
    <div className='flex flex-col mt-2'>
      <ul>
        {map(({ name, id }) =>
          <ListProfile
            key={id}
            onChange={e => updateList(e.target.value)}
            name={name}
            id={id}
          />
          , list)}
      </ul>
      <div className='flex flex-row items-center'>
        <MdAddCircle
          className='cursor-pointer ml-1 mr-1 inline pb-{1}'
          size='26px'
          onClick={_ => updateList(input)}
        />
        <TextSelector
          onChange={i => { setInput(i); updateList(i) }}
          placeholder={placeholder}
          selectables={options}
        />
      </div>
    </div>
  )

  function updateList(input: string) {
    if(input !== '')
      dispatch({ name: input, id: Math.random() })
  }


  /** 
  * Reducer for appending or changing a input. Also triggers the 
  * onChange callback if there is a new state.
  * @param prevState - Previous list of items
  * @param newInput - New input
  * @returns Updated list of inputs
  */
  function reducer(prevState: Input[], newInput: Input): Input[] {
    const sameId = (x: Input) => x.id === newInput.id
    const nextState = none(sameId, prevState) ? [...prevState, newInput] : map(input => sameId(input) ? newInput : input, prevState)
    if (onChange && prevState !== nextState)
      onChange(nextState)
    return nextState
  }
}

export default MultiInput
