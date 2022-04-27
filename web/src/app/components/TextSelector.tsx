import React, { FC, useState } from 'react';

/**
 * File contains TextSelector component responsible for searching and selecting approved inputs.
 * 
 * @author Hugo Ekstrand
 */

/**
 * @field placeholder - Placeholder for input
 * @field selectables - Approved inputs
 * @field 
 */
type TSelectorData = {
    placeholder?: string
    selectables: string[]
    inputChangedCallback: (str: string) => void 
}


const TextSelector: FC<TSelectorData> = ({placeholder, selectables, inputChangedCallback}) => {
    
    // User text input value
    let [inputValue, inputSetter] = useState("");

    // All current predictions
    let [predictionsValue, predictionsSetter]  = useState(['']);

    // Index for the prediction. Note: -1 is for no prediction selected.
    let [predictionIndex, setPredictionIndex] = useState(-1);


    function onKeyDown(ev: React.KeyboardEvent<HTMLInputElement>){
        if(ev.key === "ArrowDown"){
            setPredictionIndex(Math.min(predictionIndex + 1, predictionsValue.length - 1));
        }
        if(ev.key === "ArrowUp"){
            setPredictionIndex(Math.max(predictionIndex - 1,-1));
        }
        if(ev.key === "Enter" && predictionIndex !== -1){
            onInputChange(predictionsValue[predictionIndex]);
        }

        console.log("Selected " + predictionIndex + ", " + predictionsValue[predictionIndex])
    }

    function onInputChange(str: string){
        inputSetter(str);
        predictionsSetter(str !== '' ? predictions(str, selectables) : []);
        setPredictionIndex(-1);
        inputChangedCallback(str);
    }

    return (
        <div>
            
            <input autoComplete='true' placeholder={placeholder} value={inputValue} 
            onChange={ev => onInputChange(ev.target.value)} onKeyDown={onKeyDown}/>
            <ul>
                {
                    predictionsValue.map((itm, i) => (
                        <li style={{color: i === predictionIndex ? "green" : "red"}}
                            key={i + '_' + itm} 
                            onClick={_ => onInputChange(itm)}>
                            {itm}
                        </li>
                    ))
                }
            </ul>
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
    
    // TODO: Cleanup or change prediction
    // Currently it matches on every word in the string.
    // E.g. partial match of the second word in a string in collection
    // Or the second word in partial could match a string in collection
    return collection
        .filter(str => str.toLowerCase() !== partial.toLowerCase())
        .filter(str => 
            str.toLowerCase()
                .split(' ') // We want to match any word. E.g. surnames and first name
                .filter(sp => 
                    partial.toLowerCase().split(' ').filter(p => sp.startsWith(p)).length > 0).length > 0);
}

export default TextSelector