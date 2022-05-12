import { FC, useReducer, useRef } from 'react'
import { map, none, find } from 'ramda'
import ListProfile from './ListProfile'
import { MdAddCircle } from 'react-icons/md'
import TextSelector from './TextSelector'
import { StudentData } from '../../types/types'
import { orElse } from '../helpers/Helpers'

/**
* @field options - Options for input
* @field placeholder - Placeholder for input
* @field onChange - Callback for when the list updates
*/
type Props = {
  options: StudentData[]
  placeholder?: string
  onChange?: (arr: StudentData[]) => void
  defaultValue?: StudentData[]
}

/** Mutli input component with searchable options. */
const MultiInput: FC<Props> = ({ options, placeholder, onChange, defaultValue }) => {
  const [list, dispatch] = useReducer(reducer, defaultValue ? defaultValue : [])

  // Generalize extraction of names
  interface HasName { name: string }
  const getNames = (list: HasName[] | undefined) => orElse(() => list?.map(s => s.name), [])(null);

  /**
   * Reference for TextSelector
   * 
   * @remarks Used for connect icon onClick action.
   */
  const ref = useRef<HTMLInputElement>(null)

  function submit(){
    ref.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
    ref.current?.focus()
  }
  

  return (
    <div className='flex flex-col mt-2'>
      <ul>
        {map(({ name, email }) =>
          <ListProfile
            key={name} /* Prevents items with same name */
            name={name}
            email={email}
          />
          , list)}
      </ul>
      <div className='flex flex-row items-center '>
        <MdAddCircle
          className='cursor-pointer fill-light-primary ml-1 mr-1 inline pb-{1}'
          size='26px'
          onClick={submit}
        />
        <TextSelector
          placeholder={placeholder}
          selectables={getNames(options)}
          onSubmit={handleSubmit}
          ref={ref} 
        />
      </div>
    </div>
  )
  

  /**
   * Handles TextSelector's submit action 
   *
   * @param input
   */ 
  function handleSubmit(input : String) {
    const person = find(x => x.name === input, options)! 
    dispatch(person) 
    if(onChange) onChange(list)
  }

  /** 
  * Reducer for appending or changing a input.
  *
  * @param prevState - Previous list of items
  * @param newInput - New input
  * @returns Updated list of inputs
  */
  function reducer(prevState: StudentData[], newInput: StudentData): StudentData[] {
    const sameEmail = (x: StudentData) => x.email === newInput.email
    const nextState = none(sameEmail, prevState) ? [...prevState, newInput] : map(input => sameEmail(input) ? newInput : input, prevState)
    return nextState
  }
}

export default MultiInput
