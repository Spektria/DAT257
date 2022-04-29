/**
 * File contains TextSelector component responsible for searching and selecting approved inputs.
 *
 * @author Hugo Ekstrand
 * ***REMOVED***
 */

import { toLower } from "ramda"
import { FC, useState } from "react"

/**
 * @field placeholder - Placeholder for text input
 * @field selectables - Approved inputs
 * @field onChange    - Callback for when input changes
 */
 type TSelectorData = {
    placeholder?: string
    selectables: string[]
    onChange: (str: string) => void
}

/**
 * TextSelector component allows text input selection of approved selectables with dropdown a dropdown menue of
 * searchable selectables. 
 * Contains a callback for when the input has been changed to a new, approved input. 
 * @param param0 - The TextSelector data argument
 * @returns - The component
 */
const TextSelector: FC<TSelectorData> = ({placeholder, selectables, onChange}) => {
    // User text input value
    const [inputValue, inputSetter] = useState("");
    // All current predictions
    const [predictionsValue, predictionsSetter]  = useState(['']);
    // Index for the prediction. Note: -1 is for no prediction selected.
    const [predictionIndex, setPredictionIndex] = useState(-1);

    // Handles navigating the dropdown menu.
    function onKeyDown(ev: React.KeyboardEvent<HTMLInputElement>){
        if(ev.key === "ArrowDown"){
            setPredictionIndex(Math.min(predictionIndex + 1, predictionsValue.length - 1));
        }

        if(ev.key === "ArrowUp"){
            setPredictionIndex(Math.max(predictionIndex - 1, -1));
        }

        if(ev.key === "Enter" && predictionIndex !== -1){
            onInputChange(predictionsValue[predictionIndex]);
        }
    }

    /**
     * Main logic loop handling changes to the primary text input. 
     * @param str - The new text input value.
     */
    function onInputChange(str: string){
        inputSetter(str);

        // Create new predictions
        predictionsSetter(str !== '' ? predictions(str, selectables) : []);

        // Reset dropdown menu index selection
        setPredictionIndex(-1);

        // Only if it is a valid string do we notify listener. 
        if(selectables.includes(str))
            onChange(str);
    }


    return (
        <div className='group relative dropdown  px-4 cursor-pointer font-bold tracking-wide'>

            <input 
            className='input text-lg' 
            placeholder={placeholder} 
            value={inputValue}
            onChange={ev => onInputChange(ev.target.value)} 
            onKeyDown={onKeyDown}/>

            <div className="group-hover:block dropdown-menu absolute hidden h-auto border-2 rounded z-20 bg-white" role="menu">
                {
                    predictionsValue.filter(s => s !== "").map((itm, i) => (
                        <li className={"text-gray-700 block px-4 py-2 text-sm hover:bg-gray-400 border-b-2 rounded z-20" + (i == predictionIndex ? " bg-red-200 border-red-400" : "")} role="menuitem" 
                            key={i + '_' + itm}
                            onClick={_ => onInputChange(itm)} >
                            {itm}
                        </li>
                    ))
                }
            </div>
        </div>
    );
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
export default TextSelector