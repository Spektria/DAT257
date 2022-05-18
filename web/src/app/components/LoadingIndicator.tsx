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
  const Desktop = () => (
   <div 
       className='absolute z-30 top-2 left-4 text-light-primary 
                  bg-button-solid flex items-center rounded justify-between
                  space-x-2 px-2 bg-opacity-20 py-0.5' 
   >
     <AiOutlineLoading3Quarters 
       className='animate-spin'
     />
     <p
       className='pt-0.5 font-mono font-semibold leading-none'
     >{text}
     </p>
   </div>
  )
  
  const Mobile = () => (
    <AiOutlineLoading3Quarters 
      className='absolute z-30 top-2 left-4 animate-spin text-light-primary'
    />
  )

  return (
    <MediaQuery minWidth={768} >
      { (matches: boolean) => matches ? <Desktop /> : <Mobile />}
    </MediaQuery>
  )
}

export default LoadingIndicator
