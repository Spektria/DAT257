import { useReducer, useRef } from 'react'
import { map, find } from 'ramda'
import ListProfile from './ListProfile'
import { MdAddCircle } from 'react-icons/md'
import TextSelector from './TextSelector'
import { Student, Instructor, Either } from '../../types/types'
import { either } from '../helpers/Helpers'

type Props = {
  options: Either<Student, Instructor>[]
  placeholder?: string
  onChange?: (arr: Either<Student, Instructor>[]) => void
  defaultValue?: Either<Student, Instructor>[]
}



/**  
 * Mutli input component with searchable options.
 *
 * @param props
 * @param props.options     - Options for input
 * @param props.placeholder - Placeholder for input
 * @param props.onChange    - Callback for when the list updates
 */
function MultiInput({ options, placeholder, onChange, defaultValue }: Props) {
  const [list, dispatch] = useReducer(
    (list: Either<Student, Instructor>[]
      , newInput: Either<Student, Instructor>) => [...list, newInput],
    defaultValue ? defaultValue : [])


  /**
   * Reference for TextSelector
   * 
   * @remarks Used for connect icon onClick action.
   */
  const ref = useRef<HTMLInputElement>(null)


  /**
   * Triggers the submit event on TextSelector
   */
  function submit() {
    ref.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
    /* focus input on submit. Convenient on pc but a little annoying on mobile */
    ref.current?.focus()
  }


  return (
    <div className='flex flex-col mt-2'>
      <ul>{ listProfiles(list) }</ul>
      <div className='flex flex-row items-center '>
        <MdAddCircle
          className='cursor-pointer fill-light-primary ml-1 mr-1 inline pb-{1}'
          size='26px'
          onClick={submit}
        />
        <TextSelector
          placeholder={placeholder}
          selectables={map(getName, options)}
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
  function handleSubmit(input: String) {
    const person = find(opt => getName(opt) === input, options)!
    dispatch(person)
    if (onChange) onChange(list)
  }
}

/** 
 * Maps Either<Student, Instructor> to <ListProfile />
 * 
 * @remarks Passes in different props if Student or Instructor.
 *
 * @param arr
 *
 * @returns list of <ListProfile />
 */
function listProfiles(arr: Either<Student, Instructor>[]) : JSX.Element[] {
  return map(xs => either(
    s => <ListProfile key={s.name} name={s.name} email={s.email} />,
    i => <ListProfile key={i.name} name={i.name} />,
    xs), arr)
}

/**
 * Extracts name field  
 * 
 * @param e - Either with left: Student and right: Instructor
 * 
 * @returns the name 
 */
function getName(e: Either<Student, Instructor>): string {
  return either(s => s.name, i => i.name, e)
}

export default MultiInput
