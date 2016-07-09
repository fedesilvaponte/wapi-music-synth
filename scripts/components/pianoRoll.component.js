import React from 'react';
import {addClass, removeClass} from '../helpers';
import _ from 'lodash';

const keys = [
    {name: 'C1', freq: 32.70, type: 'white'},
    {name: 'C#1', freq: 34.65, type: 'csharp'},
    {name: 'D1', freq: 36.71, type: 'white'},
    {name: 'D#1', freq: 38.89, type: 'dsharp'},
    {name: 'E1', freq: 41.20, type: 'white'},
    {name: 'F1', freq: 43.65, type: 'white'},
    {name: 'F#1', freq: 46.25, type: 'fsharp'},
    {name: 'G1', freq: 49.00, type: 'white'},
    {name: 'G#1', freq: 51.91, type: 'gsharp'},
    {name: 'A1', freq: 55.00, type: 'white'},
    {name: 'A#1', freq: 58.27, type: 'asharp'},
    {name: 'B1', freq: 61.74, type: 'white'},
    {name: 'C2', freq: 65.41, type: 'white'},
    {name: 'C#2', freq: 69.30, type: 'csharp2'},
    {name: 'D2', freq: 73.42, type: 'white'},
    {name: 'D#2', freq: 77.78, type: 'dsharp2'},
    {name: 'E2', freq: 82.41, type: 'white'},
    {name: 'F2', freq: 87.31, type: 'white'},
    {name: 'F#2', freq: 92.50, type: 'fsharp2'},
    {name: 'G2', freq: 98.00, type: 'white'},
    {name: 'G#2', freq: 103.83, type: 'gsharp2'},
    {name: 'A2', freq: 110.00, type: 'white'},
    {name: 'A#2', freq: 116.54, type: 'asharp2'},
    {name: 'B2', freq: 123.47, type: 'white'},
    {name: 'C#', freq: 130.81, type: 'white'},
    {name: 'C#2', freq: 138.59, type: 'csharp3'},
    {name: 'D3', freq: 146.83, type: 'white'},
    {name: 'D#2', freq: 155.56, type: 'dsharp3'},
    {name: 'E3', freq: 164.81, type: 'white'},
    {name: 'F3', freq: 174.61, type: 'white'},
    {name: 'F#2', freq: 185.00, type: 'fsharp3'},
    {name: 'G3', freq: 196.00, type: 'white'},
    {name: 'G#2', freq: 207.65, type: 'gsharp3'},
    {name: 'A3', freq: 220.00, type: 'white'},
    {name: 'A#2', freq: 233.08, type: 'asharp3'},
    {name: 'B3', freq: 246.94, type: 'white'},
];

let keyFired = false;

const PianoRoll = (props) => {
    const handleMouseDown = (e, key) => {
        props.playKey(key);
        console.log(key)
        if(e) {
            addClass(e.target, 'down');
        }
    }

    const handleMouseUp = (e) => {
        props.muteKey();
        if(e) {
            removeClass(e.target, 'down');
        }
    }

    const handleKeydown = (e) => {
        var currentKey;
        if(!keyFired) {
            keyFired = true;

            switch(e.key) {
                case 'a':
                    currentKey = _.filter(keys, {name: 'C1'})
                    console.log(currentKey)
                    handleMouseDown(null, currentKey[0]);
                    break;
                case 'w':
                    currentKey = _.filter(keys, {name: 'C#1'})
                    console.log(currentKey)
                    handleMouseDown(null, currentKey[0]);
                    break;

            }
        }
    };
    const handleKeyup = (e) => {
        keyFired = false;
        handleMouseUp();
    }

    document.body.addEventListener('keydown', _.debounce(handleKeydown, 100));
    document.body.addEventListener('keyup', _.debounce(handleKeyup, 100));

   return(
       <div className="piano-roll">
           {keys.map((key) => {
               return (
                   <div
                       onMouseDown={(e) => handleMouseDown(e, key)}
                       onMouseUp={(e) => handleMouseUp(e)}
                       className={key.type}
                   ></div>
               )
           })}
       </div>
   )
}

export default PianoRoll;