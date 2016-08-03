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

        this.delay = false;
        this.compressor = false;

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
        this.delay = false;
        if(this.compressor) {
            node.disconnect();
            this.compressor.connect(this.audioCtx.destination);
        } else {
            node.disconnect();
        }
    }

    connectDelay = (node) => {
        this.delay = node;

        if(this.compressor) {
            this.compressor.connect(node);
        } else {
            this.masterGain.connect(node);
        }

        node.connect(this.audioCtx.destination);
    }

    connectCompressor = (node) => {
        this.compressor = node;
        this.masterGain.disconnect(this.audioCtx.destination);
        this.masterGain.connect(node);
        node.connect(this.audioCtx.destination);

        if(this.delay) { node.connect(this.delay); }
    }

    disconnectCompressor = (node) => {
        this.compressor = false;
        node.disconnect(this.audioCtx.destination);
        if(this.delay) {
            this.masterGain.connect(this.delay);
        }
        this.masterGain.connect(this.audioCtx.destination);
    }

    connectOsc = (node) => {
        node.connect(this.masterGain);
    }

    disconnectOsc = (node) => {
        node.disconnect(this.masterGain);
    }

    render() {
        return (
            <div className="app">
                <div className="oscillators container-rack">
                    <h1 className="title">Oscillators</h1>
                    <Oscillator
                        muted={this.state.muted}
                        keyPressed={this.state.key}
                        audioCtx={this.audioCtx}
                        disconnect={this.disconnectOsc}
                        connect={this.connectOsc}/>
                    <Oscillator
                        muted={this.state.muted}
                        keyPressed={this.state.key}
                        audioCtx={this.audioCtx}
                        disconnect={this.disconnectOsc}
                        connect={this.connectOsc}/>
                    <Oscillator
                        muted={this.state.muted}
                        keyPressed={this.state.key}
                        audioCtx={this.audioCtx}
                        disconnect={this.disconnectOsc}
                        connect={this.connectOsc}/>
                </div>
                <div className="container-rack">
                    <h1 className="title">Effects Rack</h1>
                    <Compressor connect={this.connectCompressor} disconnect={this.disconnectCompressor} audioCtx={this.audioCtx}/>
                    <Delay audioCtx={this.audioCtx} connect={this.connectDelay} disconnect={this.disconnectDelay}/>
                </div>
                <PianoRoll muteKey={this.muteKey} playKey={this.setFreq}/>
            </div>
        );
    }
}
