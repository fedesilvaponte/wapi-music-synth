import React, {Component} from 'react';
import Oscillator from './components/oscillator.component';
import PianoRoll from './components/pianoRoll.component';
import Delay from './components/delay.component';
import Compressor from './components/compressor.component';
import '../sass/main.scss';

export default class App extends Component {
    constructor(props) {
        super(props);
        
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext);
        this.masterGain = this.audioCtx.createGain();
        this.masterGain.gain.value = 0.5;

        this.masterGain.connect(this.audioCtx.destination);

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

    disconnectDelay = node => {
        this.masterGain.disconnect(node);
        node.disconnect(this.audioCtx.destination);
    }

    connectDelay = (node) => {
        this.masterGain.connect(node);
        node.connect(this.audioCtx.destination);
    }

    connectCompressor = (node) => {
        this.masterGain.disconnect(this.audioCtx.destination);
        this.masterGain.connect(node);
        node.connect(this.audioCtx.destination);
    }

    disconnectCompressor = (node) => {
        node.disconnect(this.audioCtx.destination);
        this.masterGain.disconnect(node);
        this.masterGain.connect(this.audioCtx.destination);
    }

    connectOsc = (node) => {
        node.connect(this.masterGain);
    }

    render() {
        return (
            <div className="app">
                <div className="oscillators container-rack">
                    <h1 className="title">Oscillators</h1>
                    <Oscillator muted={this.state.muted} keyPressed={this.state.key} audioCtx={this.audioCtx} connectOsc={this.connectOsc}/>
                    <Oscillator muted={this.state.muted} keyPressed={this.state.key} audioCtx={this.audioCtx} connectOsc={this.connectOsc}/>
                    <Oscillator muted={this.state.muted} keyPressed={this.state.key} audioCtx={this.audioCtx} connectOsc={this.connectOsc}/>
                </div>
                <div className="container-rack">
                    <h1 className="title">Effects Rack</h1>
                    <Delay audioCtx={this.audioCtx} connect={this.connectDelay} disconnect={this.disconnectDelay}/>
                    <Compressor connect={this.connectCompressor} disconnect={this.disconnectCompressor} audioCtx={this.audioCtx}/>
                </div>
                <PianoRoll muteKey={this.muteKey} playKey={this.setFreq}/>
            </div>
        );
    }
}
