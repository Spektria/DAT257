/**
 * File contains TextSelector component responsible for searching and selecting approved inputs.
 *
 * @author Hugo Ekstrand
 * ***REMOVED***
 */

import { toLower } from "ramda"
import { useState, forwardRef, ForwardedRef } from "react"

type Props = {
  placeholder?: string
  selectables: string[]
  onSubmit: (str: string) => void
}

/**
 * TextSelector component allows text input selection of approved selectables 
*  with dropdown a dropdown menue of searchable selectables. 
 *
 * @param props
 * @param props.placeholder - Placeholder for text input
 * @param props.selectables - Approved inputs
 * @param props.onSubmit    - Callback for when input changes
 * @param ref               - Reference to input element
 * 
 * @remarks TextSelector is wrapped in forwardRef at the end of the file.
 *
 * @see {@link https://reactjs.org/docs/forwarding-refs.html}
 * @see {@link https://reactjs.org/docs/hooks-reference.html#useref}
 */
function TextSelector({ placeholder, selectables, onSubmit}: Props, ref: ForwardedRef<HTMLInputElement>) {
  // User text input value
  const [input, setInput] = useState('');
  // All current predictions
  const [pred, setPred] = useState(['']);
  // Index for the prediction. Note: -1 is for no prediction selected.
  const [predIndex, setPredIndex] = useState(-1);
  // If unapproved input warning shoud be showed
  const [badInputNotify, setBadInputNotify] = useState(false);



  return (
    <div className='group relative dropdown px-4 cursor-pointer font-bold tracking-wide'>

      <input type="text"
        className={`peer input text-lg ${badInputNotify ? 'border-red-400 focus:border-red-400 focus:outline-red-400' : ''}`}
        placeholder={placeholder}
        value={input}
        onChange={ev => handleChange(ev.target.value)}
        onKeyDown={handleKeyDown}
        onSubmit={_ => handleSubmit()}
        ref={ref}
      />

      <div 
        className="peer-focus:block group-hover:block absolute hidden h-auto 
                   border-l-2 border-r-2 rounded z-20 bg-white overflow-y-auto 
                   max-h-32" 
        role="menu"
      >
        {
          pred.filter(s => s !== "").map((itm, i) => (
            <li 
              className={`text-gray-700 block px-4 py-2 text-sm 
                          hover:bg-gray-400 border-b-2 rounded z-20 
                          ${i === predIndex ? ' bg-red-200 border-red-400' : ''}`} 
              role="menuitem"
              key={i + '_' + itm}
              onClick={_ => handleChange(itm)} 
            >
            {itm}
            </li>
          ))
        }
      </div>
    </div>
  );


  /** 
   * Handles navigating the dropdown menu.
   *
   * @param ev - Keyboard event
   */
  function handleKeyDown(ev: React.KeyboardEvent<HTMLInputElement>) {
    if (ev.key === "ArrowDown") {
      setPredIndex(Math.min(predIndex + 1, pred.length - 1));
    }

    if (ev.key === "ArrowUp") {
      setPredIndex(Math.max(predIndex - 1, -1));
    }

    if (ev.key === "Enter") {
      if (predIndex === -1)
        handleSubmit()
      else
        handleChange(pred[predIndex]);

    }
  }

  /**
   * Handles change
   *
   * @param str - The new text input value.
   */
  function handleChange(str: string) {
    setInput(str);

    // Create new predictions
    setPred(str !== '' ? predictions(str, selectables) : []);

    // Reset dropdown menu index selection
    setPredIndex(-1);
  }

  /**
   * Handles submit
   */
  function handleSubmit() {
    if (isValid(input)) {
      setInput('')
      setBadInputNotify(false)
      onSubmit(input)
    } else {
      setBadInputNotify(true)
    }

  }

  /**
   * Check if input is valid
   *
   * @returns true if valid
   */
  function isValid(str: string) {
    return selectables.includes(str)
  }

}

/**
 * Returns a list of predictions given a partial string input and a collection of allowed predictions.
 * @param partial - The partial string which will be predicted of.
 * @param collection - The allowed predictions
 * @returns the subset of allowed predictions which are predictions to the given partial string.
 */
function predictions(partial: string, collection: string[]): string[] {
  const lowerPartial = toLower(partial);	// Lowercase version of search input to compare against
  const partialLen = lowerPartial.length;	// Length of search input
  let result: string[] = [];	// List of matching search results

  // Go through each string in the collection of available results and then
  // compare each substring of the same length as the search string to the
  // search string until a match is found. If a matching substring is found,
  // add it to the result list.
  for (var str of collection) {
    const len = str.length;
    const lowerStr = toLower(str);

    if (lowerStr === lowerPartial)
      continue;

    for (let i = 0; i < len; i++) {
      if (i + partialLen > len) {
        // We've gone too far
        break;
      }

      const subStr = lowerStr.substring(i, i + partialLen);

      if (subStr === lowerPartial) {
        // Found a match! Add it to the list.
        result.push(str);
        break;
      }
    }
  }

  return result;
}

export default forwardRef<HTMLInputElement, Props>(TextSelector)
