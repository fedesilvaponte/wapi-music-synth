import React, {Component} from 'react';
import Oscillator from './components/oscillator.component';
import PianoRoll from './components/pianoRoll.component';
import '../sass/main.scss';

export default class App extends Component {
    constructor(props) {
        super(props);
        
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext);
        this.synthDelay = this.audioCtx.createDelay(5.0);
        this.feedbackGain = this.audioCtx.createGain();

        this.state = {
            key: null,
            muted: true,
            keyPressed: null
        };

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

    connectOsc = (node) => {
        this.feedbackGain.gain.value = 0.7;
        this.synthDelay.delayTime.value = 0.5;

        node.connect(this.synthDelay);
        this.synthDelay.connect(this.feedbackGain);
        this.feedbackGain.connect(this.synthDelay);

        this.synthDelay.connect(this.audioCtx.destination);
        node.connect(this.audioCtx.destination);
    }

    render() {
        return (
            <div className="app">
                <div className="oscillators">
                    <Oscillator muted={this.state.muted} keyPressed={this.state.key} audioCtx={this.audioCtx} connectOsc={this.connectOsc}/>
                    <Oscillator muted={this.state.muted} keyPressed={this.state.key} audioCtx={this.audioCtx} connectOsc={this.connectOsc}/>
                    <Oscillator muted={this.state.muted} keyPressed={this.state.key} audioCtx={this.audioCtx} connectOsc={this.connectOsc}/>
                </div>
                <PianoRoll muteKey={this.muteKey} playKey={this.setFreq}/>
            </div>
        );
    }
}
