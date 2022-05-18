import { FC } from 'react'
import { IoMdPerson } from 'react-icons/io'
import { BsX } from 'react-icons/bs'

/**
* @field onChange - Change handler on edit
* @field name - Initial value of input
* @field email - Email of person
*/
type Props =
  { name: string
  , email?: string
  , id?   : string
  }

/** Component for displaying a profile list item. Used by MultiInput */
const ListProfile: FC<Props> = ({ name, email, id }) => {
  return (
    <li className='flex justify-between mb-1 listitem'>
      <label className='listitem-text'>{name}</label>
      <div className='flex justify-between space-x-1'>
		{ /* Remove button */ }
        <BsX
		  className='cursor-pointer'
		  size='20px'
		  onClick={ _ => {} }
		/>
        { id && <IoMdPerson className='cursor-pointer' size='20px' /> }
      </div>
    </li>
  )
}

export default ListProfile
