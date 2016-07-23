import React, {Component} from 'react';
import Oscillator from './components/oscillator.component';
import PianoRoll from './components/pianoRoll.component';
import '../sass/main.scss';

export default class App extends Component {
    constructor(props) {
        super(props);
        
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext);

        this.state = {
            key: null,
            muted: true,
            keyPressed: null
        }

    }


    muteKey = () => {
        this.setState({
            frequency: this.state.frequency,
            muted: true
        });
    }

    setFreq = (key) => {
       this.setState({
           key: key,
           muted: false
       });
    }

    render() {
        return (
            <div className="app">
                <div className="oscillators">
                    <Oscillator muted={this.state.muted} keyPressed={this.state.key} audioCtx={this.audioCtx}/>
                    <Oscillator muted={this.state.muted} keyPressed={this.state.key} audioCtx={this.audioCtx}/>
                    <Oscillator muted={this.state.muted} keyPressed={this.state.key} audioCtx={this.audioCtx}/>
                </div>
                <PianoRoll muteKey={this.muteKey} playKey={this.setFreq}/>
            </div>
        );
    }
}
