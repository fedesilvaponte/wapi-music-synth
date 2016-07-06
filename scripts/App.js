import React, {Component} from 'react';
import Oscillator from './components/oscillator.component';

export default class App extends Component {
    constructor(props) {
        super(props);
        
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext);

    }

    render() {
        return (
            <div className="app">
                <Oscillator audioCtx={this.audioCtx}/>
                <Oscillator audioCtx={this.audioCtx}/>
                <Oscillator audioCtx={this.audioCtx}/>
            </div>
        );
    }
}
