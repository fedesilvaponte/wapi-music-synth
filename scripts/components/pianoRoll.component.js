import React, {Component, PropTypes} from 'react';
import {addClass, removeClass} from '../helpers';
import _ from 'lodash';

const keys1 = [
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

const keys2 = [
    {name: 'C4', freq: 261.63, type: 'white'},
    {name: 'C#4', freq: 277.18, type: 'csharp'},
    {name: 'D4', freq: 293.66, type: 'white'},
    {name: 'D#4', freq: 311.13, type: 'dsharp'},
    {name: 'E4', freq: 329.63, type: 'white'},
    {name: 'F4', freq: 349.23, type: 'white'},
    {name: 'F#4', freq: 369.99, type: 'fsharp'},
    {name: 'G4', freq: 392.00, type: 'white'},
    {name: 'G#4', freq: 415.30, type: 'gsharp'},
    {name: 'A4', freq: 440.00, type: 'white'},
    {name: 'A#4', freq: 466.16, type: 'asharp'},
    {name: 'B4', freq: 493.88, type: 'white'},
    {name: 'C4', freq: 523.25, type: 'white'},
    {name: 'C#5', freq: 554.37, type: 'csharp2'},
    {name: 'D5', freq: 587.33, type: 'white'},
    {name: 'D#5', freq: 622.25, type: 'dsharp2'},
    {name: 'E5', freq: 659.25, type: 'white'},
    {name: 'F5', freq: 698.46, type: 'white'},
    {name: 'F#5', freq: 739.99, type: 'fsharp2'},
    {name: 'G5', freq: 783.99, type: 'white'},
    {name: 'G#5', freq: 830.61, type: 'gsharp2'},
    {name: 'A5', freq: 880.00, type: 'white'},
    {name: 'A#5', freq: 932.33, type: 'asharp2'},
    {name: 'B5', freq: 987.77, type: 'white'},
    {name: 'C#', freq: 1046.50, type: 'white'},
    {name: 'C#6', freq: 1108.73, type: 'csharp3'},
    {name: 'D6', freq: 1174.66, type: 'white'},
    {name: 'D#6', freq: 1244.51, type: 'dsharp3'},
    {name: 'E6', freq: 1318.51, type: 'white'},
    {name: 'F6', freq: 1396.91, type: 'white'},
    {name: 'F#6', freq: 1479.98, type: 'fsharp3'},
    {name: 'G6', freq: 1567.98, type: 'white'},
    {name: 'G#6', freq: 1661.22, type: 'gsharp3'},
    {name: 'A6', freq: 1760.00, type: 'white'},
    {name: 'A#6', freq: 1864.66, type: 'asharp3'},
    {name: 'B6', freq: 1975.53, type: 'white'},
];

let keyFired = false;

class PianoRoll extends Component {
    constructor(props) {
        super(props);

        this.state = {
            keys: keys1
        }

        document.body.addEventListener('keydown', _.debounce(this.handleKeydown, 100));
        document.body.addEventListener('keyup', _.debounce(this.handleKeyup, 100));
    }

    handleMouseDown = (e, key) => {
        this.props.playKey(key);
        console.log(key)
        if(e) {
            addClass(e.target, 'down');
        }
    }

    handleMouseUp = (e) => {
        this.props.muteKey();
        if(e) {
            removeClass(e.target, 'down');
        }
    }

    handleKeydown = (e) => {
        var currentKey;
        if(!keyFired) {
            keyFired = true;

            switch(e.key) {
                case 'a':
                    currentKey = _.filter(keys, {name: 'C1'})
                    this.handleMouseDown(null, currentKey[0]);
                    break;
                case 'w':
                    currentKey = _.filter(keys, {name: 'C#1'})
                    this.handleMouseDown(null, currentKey[0]);
                    break;

            }
        }
    };
    handleKeyup = (e) => {
        keyFired = false;
        this.handleMouseUp();
    }

    octaveUp = () => {
        this.setState({keys: keys2});
    }
    octaveDown = () => {
        this.setState({keys: keys1});
    }


    render() {
        return (
            <div>
                <div>
                    <a className="btn" onClick={this.octaveDown}>Octave Down</a>
                    <a className="btn" onClick={this.octaveUp}>Octave Up</a>
                </div>
                <div className="piano-roll">
                    {this.state.keys.map((key) => {
                        return (
                            <div
                                key={key.freq}
                                onMouseDown={(e) => this.handleMouseDown(e, key)}
                                onMouseUp={(e) => this.handleMouseUp(e)}
                                className={key.type}
                            ></div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

PianoRoll.propTypes = {
    muteKey: PropTypes.func.isRequired,
   playKey: PropTypes.func.isRequired
}

export default PianoRoll;