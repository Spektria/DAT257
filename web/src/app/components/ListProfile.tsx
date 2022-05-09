import { FC } from 'react'
import { IoMdPerson } from 'react-icons/io'
import { BsCheck2, BsX } from 'react-icons/bs'

/**
* @field onChange - Change handler on edit
* @field name - Initial value of input
* @field id - Id of person
*/
type Props =
  { onChange: React.ChangeEventHandler<HTMLInputElement>
  , name: string
  , id: number
  }

/** Component for displaying a profile list item. Used by MultiInput */
const ListProfile: FC<Props> = ({ onChange, name, id }) => {
  return (
    <li className='flex justify-between mb-1 listitem'>
      <input className='listitem-text' value={name} onChange={onChange} />
      <div className='flex justify-between space-x-1'>
        <BsX className='cursor-pointer' size='20px' />
        <IoMdPerson className='cursor-pointer' size='20px' />
      </div>
    </li>
  )
}

export default ListProfile
