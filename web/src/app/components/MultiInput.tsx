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
      <ul>{ listProfiles(list, removePerson) }</ul>
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

  /**
   * Handles ListProfile remove button
   * 
   * @param arr List to remove person from.
   * @param id	ID of the person to remove.
   */
  function removePerson(arr: Either<Student, Instructor>[], id: String) {
    // For each element in the list, check if the ID of the current student or
    // instructor matches the ID to remove. If it matches, remove the current
    // element from the list.
    for (var i = 0; i < arr.length; i++) {
      var thisId: String; // The ID of the current element
      if (arr[i].left != undefined) {
        // Get ID of student
        const student = arr[i].left!;
        thisId = student.id;
      } else if (arr[i].right != undefined) {
        // Get ID of instructor
        const instructor = arr[i].right!;
        thisId = instructor.id;
      } else {
        // Not a student or instructor. Shouldn't be possible, but skip anyway.
        continue;
      }

      if (thisId == id) {
        // Remove element from list.
        arr.splice(i, 1);
        i--;
        continue;
      }
    }

    // Update list
    if (onChange)
      onChange(arr);
  }
}

/** 
 * Maps Either<Student, Instructor> to <ListProfile />
 * 
 * @remarks Passes in different props if Student or Instructor.
 *
 * @param arr
 * @param removeFunc Function that removes a person from a list.
 *
 * @returns list of <ListProfile />
 */
function listProfiles(arr: Either<Student, Instructor>[], removeFunc: (arr: Either<Student, Instructor>[], id: String) => void) : JSX.Element[] {
  return map(xs => either(
    s => <ListProfile key={s.name} name={s.name} email={s.email} id={s.id} removeFunction={removePerson}/>,
    i => <ListProfile key={i.name} name={i.name} id={i.id} removeFunction={removePerson}/>,
    xs), arr)
  
    /**
     * Handles removing a single person
     * 
     * @param id ID of person to remove.
     */
    function removePerson(id: String) {
      // Pass the id and list to the *real* remover.
      removeFunc(arr, id);
    }
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
