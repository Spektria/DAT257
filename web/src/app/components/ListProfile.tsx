import { FC } from 'react'
import { IoMdPerson } from 'react-icons/io'
import { BsX } from 'react-icons/bs'
import { useNavigate } from 'react-router'


/**
* @field onChange - Change handler on edit
* @field name - Initial value of input
* @field email - Email of person
* @field removeFunction - Remove handler
*/
type Props =
  { name: string
  , email?: string
  , id?   : string
  , removeFunction? : (id: String) => void
  }

/** Component for displaying a profile list item. Used by MultiInput */
const ListProfile: FC<Props> = ({ name, email, id, removeFunction }) => {
  const navigate = useNavigate();
  return (
    <li className='flex justify-between mb-1 listitem'>
      <label className='listitem-text'>{name}</label>
      <div className='flex justify-between space-x-1'>
		{/* Remove button */ }
        { removeFunction && <BsX
		  className='cursor-pointer'
		  size='20px'
		  onClick={ _ => {
		    if (id) {
			  removeFunction(id);
			}
		  }}
		/>}
        { email && <IoMdPerson className='cursor-pointer' onClick={() => navigate(`${id}`)} size='20px' /> }
      </div>
    </li>
  )
}

export default ListProfile
