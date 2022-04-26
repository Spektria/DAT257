import { FC, FormEventHandler, useReducer, useState } from 'react'
import { map, addIndex, none } from 'ramda'
import ListProfile from './ListProfile'
import { MdAddCircle } from 'react-icons/md'

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
    <form className='flex flex-col mt-2' onSubmit={onSubmit(input, setInput, dispatch)}>
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
        <label>
          <input className='hidden' type='submit' />
          <MdAddCircle className='cursor-pointer ml-1 mr-1 inline pb-{1}' size='26px' />
        </label>
        <input className='input text-lg' list={name + '-list'} name={name} placeholder={placeholder} value={input} onChange={e => setInput(e.target.value)} />
        <datalist id={name + '-list'}>
          {addIndex<string>(map)((x, i) => <option key={x + i}>{x}</option>, options)}
        </datalist>
      </div>
    </form>
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

/**
* Submit handler that dispatch the new input
* @param input - New Input
* @param setInput - set function of useState
* @param dispatch - dispatch function of useReducer
* @returns FormEventHandler
*/
function onSubmit(input: string, setInput: React.Dispatch<React.SetStateAction<string>>, dispatch: React.Dispatch<Input>): FormEventHandler {
  return (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (input !== '') {
      dispatch({ name: input, id: Math.random() })
      setInput("")
    }
  }
}

export default MultiInput
