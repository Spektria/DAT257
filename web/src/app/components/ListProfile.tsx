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
    <li className='flex justify-between mb-1 bg-red-100 border border-solid border-red-200 rounded'>
      <input className='bg-red-100 text-sm border border-transparent rounded outline-none  focus:border-solid focus:border-sky-300  focus:outline-sky-200 focus:outline-offset-0 transition-all pl-2 pr-2' value={name} onChange={onChange} />
      <div className='flex justify-between space-x-1'>
        <BsX className='cursor-pointer' size='20px' />
        <IoMdPerson className='cursor-pointer' size='20px' />
      </div>
    </li>
  )
}

export default ListProfile
