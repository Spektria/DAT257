import { BiError } from 'react-icons/bi'
import MediaQuery from 'react-responsive'

type Props = { text: string }

/**
 * Responsive error indicator
 *
 * @param props
 * @param props.text - Text to show on desktop
 *
 * @see {@link https://github.com/yocontra/react-responsive}
 */
function ErrorIndicator({ text }: Props) {
  return (
    <MediaQuery minWidth={768} >
      {(matches: boolean) => matches ? <Desktop text={text} /> : <Mobile />}
    </MediaQuery>
  )
}


/**
 * Indicator show on Desktop
 * 
 * @param props 
 * @param props.text
 */
function Desktop({ text }: Props) {
  return (
    <div
      className='text-red-500 bg-button-solid flex items-center rounded px-2 
                 bg-opacity-40 py-0.5'
    >
      <BiError className='mr-2' size={20} />
      <p
        className='pt-0.5 font-mono font-semibold leading-none'
      >{text}
      </p>
    </div>
  )
}

/**
 * Indicator show on Mobile
 */
function Mobile() {
  return (
    <BiError className='text-red-500' size={20} />
  )
}

export default ErrorIndicator
