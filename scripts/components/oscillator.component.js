import React, {Component} from 'react';
import {hasClass, removeClass, addClass} from '../helpers';
import classNames from 'classnames/bind';
import _ from 'lodash';

export default class Oscillator extends Component {
    constructor(props) {
        super(props);

        this.audioCtx = props.audioCtx;
        this.gainNode = this.audioCtx.createGain();
        
        this.state = {
            frequency: 100,
            volume: 50,
            on: false,
            types: [
                {id: 'sine', active: true},
                {id: 'square', active: false},
                {id: 'triangle', active: false},
                {id: 'sawtooth', active: false},
            ]
        };

        this.oscillator;

        this.createOscillator = this.createOscillator.bind(this);
        this.changeFrequency = this.changeFrequency.bind(this);
        this.changeVolume = this.changeVolume.bind(this);
        this.pause = this.pause.bind(this);
    }

    createOscillator(e) {
        this.setState({on: true});
        let activeType = _.filter(this.state.types, (t) => {
            return t.active === true;
        });

        console.log(activeType)
        if (this.oscillator) {
            this.oscillator.stop();
        }

        let analyser = this.audioCtx.createAnalyser();
        analyser.fftSize = 2048;
        let bufferLength = analyser.frequencyBinCount;
        let dataArray = new Uint8Array(bufferLength);

        this.oscillator = this.audioCtx.createOscillator();
        this.oscillator.type = activeType.id;
        this.oscillator.frequency.value = this.state.frequency;
        this.oscillator.connect(this.gainNode);
        this.oscillator.connect(analyser);
        this.gainNode.gain.value = this.state.volume / 100;
        this.gainNode.connect(this.audioCtx.destination);

        this.oscillator.start();

        function renderFrame() {
            const WIDTH = 500;
            const HEIGHT = 300;
            let canvas = document.querySelector('.canvas');
            let canvasCtx = canvas.getContext('2d');

            requestAnimationFrame(renderFrame);

            analyser.getByteTimeDomainData(dataArray);

            canvasCtx.fillStyle = 'rgb(255, 255, 255)';
            canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

            canvasCtx.lineWidth = 2;
            canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

            canvasCtx.beginPath();

            var sliceWidth = WIDTH * 1.0 / bufferLength;
            var x = 0;

            for(var i = 0; i < bufferLength; i++) {

                var v = dataArray[i] / 128.0;
                var y = v * HEIGHT/2;

                if(i === 0) {
                    canvasCtx.moveTo(x, y);
                } else {
                    canvasCtx.lineTo(x, y);
                }

                x += sliceWidth;
            }

            canvasCtx.lineTo(canvas.width, canvas.height/2);
            canvasCtx.stroke();

            // render frame based on values in frequencyData
        }
        renderFrame();

    }

    pause() {
        this.setState({on: false});
        this.oscillator.stop();
    }

    changeFrequency(e) {
        console.log(this.state.frequency)
        this.setState({
            frequency: e.target.value
        });
        this.oscillator.frequency.value = this.state.frequency;
    }

    changeVolume(e) {
        let volume = e.target.value;

        this.setState({
            volume: volume
        });
        this.gainNode.gain.value = volume / 100;
    }

    changeType(type) {

        var types = this.state.types.map((t) => {
            console.log(t)
           t.id === type ? t.active = true : t.active = false;
            return t;
        });

        this.setState({types: types});
        this.oscillator.type = type;
    }

    render() {
        let btnclass = {btn: true};

        let onClass = classNames(_.extend(btnclass, {
            'selected': this.state.on
        }));

        let offClass = classNames(_.extend(btnclass,{
            'selected': !this.state.on
        }));

        return (
            <div className="oscillator">
                <div className="btn-group">
                    <span className={onClass} onClick={this.createOscillator}>On</span>
                    <span className={offClass} onClick={this.pause}>Off</span>
                </div>
                <br/>
                <div className="btn-group">
                    <p>Oscillator Type</p>

                    {this.state.types.map((type) => {
                        let typeClass = classNames(_.extend(btnclass,{
                            'selected': type.active
                        }));
                        return <span
                            className={typeClass}
                            onClick={() => this.changeType(type.id)}>
                            {type.id}
                        </span>

                    })}
                </div>
                <div className="btn-group">
                    <label htmlFor="">frequency</label>
                    <input type="range"
                           className="frequency"
                           min="100"
                           max="3000"
                           value={this.state.frequency}
                           onChange={this.changeFrequency}/>
                    <span>{this.state.frequency}Hz</span>
                </div>
                <div className="btn-group">
                    <label htmlFor="">Volume</label>
                    <input type="range"
                           className="volume"
                           min="0"
                           max="100"
                           value={this.state.volume}
                           onChange={this.changeVolume}/>
                    <span>{this.state.volume}</span>
                </div>
                <canvas className='canvas'></canvas>
            </div>
        )
    }
}