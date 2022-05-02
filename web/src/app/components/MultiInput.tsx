import { FC, FormEventHandler, useReducer, useState } from 'react'
import { map, addIndex, none, zipWith } from 'ramda'
import ListProfile from './ListProfile'
import { MdAddCircle } from 'react-icons/md'
import TextSelector from './TextSelector'

/**
* @field name - Name attribute of JSX element
* @field options - Options for input
* @field placeholder - Placeholder for input
*/
type Props = { name: string, options: string[], placeholder?: string }

/**
*  @field name - Name of person/item
*  @field id - Id of person/item
*/
type Input = { name: string, id: number }

/** Mutli input component with searchable options. */
const MultiInput: FC<Props> = ({ name, options, placeholder }) => {
  const [inputs, dispatch] = useReducer(reducer, [])
  const [input, setInput] = useState("")

  return (
    <div className='flex flex-col mt-2'>
      <ul>
        {map(({ name, id }) =>
          <ListProfile
            key={id}
            onChange={e => dispatch({ name: e.target.value, id })}
            name={name}
            id={id}
          />
          , inputs)}
      </ul>
      <div className='flex flex-row items-center'>
        <MdAddCircle
          className='cursor-pointer ml-1 mr-1 inline pb-{1}'
          size='26px'
          onClick={_ => dispatch({ name: input, id: Math.random() })}
        />
        <TextSelector
          onChange={i => { setInput(i); dispatch({ name: i, id: Math.random() }) }}
          placeholder={placeholder}
          selectables={options}
        />
      </div>
    </div>
  )
}

/** 
* Reducer for appending or changing a input.
* @param prevState - Previous inputs
* @param newInput - New input
* @returns Updated inputs
*/
function reducer(prevState: Input[], newInput: Input): Input[] {
  const pred = (x: Input) => x.id === newInput.id
  return none(pred, prevState) ? [...prevState, newInput] : map(input => pred(input) ? newInput : input, prevState)
}

export default MultiInput
