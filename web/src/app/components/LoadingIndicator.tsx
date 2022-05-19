import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import MediaQuery from 'react-responsive'

type Props = { text: string }

/**
 * Responsive loading indicator
 *
 * @param props
 * @param props.text - Text to show on desktop
 *
 * @see {@link https://github.com/yocontra/react-responsive}
 */
function LoadingIndicator({ text }: Props) {


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
      className='text-light-primary bg-button-solid flex items-center rounded 
                 px-2 bg-opacity-40 py-0.5'
    >
      <AiOutlineLoading3Quarters
        className='animate-spin mr-2'
      />
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
    <AiOutlineLoading3Quarters
      className='animate-spin text-light-primary'
    />
  )
}

export default LoadingIndicator
