import React, {Component} from 'react';
import {createOscillator, hasClass, removeClass, addClass} from '../helpers';
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

        let activeType = _.head(_.filter(this.state.types, {active: true}));

        if (this.oscillator) {
            this.oscillator.stop();
        }

        this.oscillator = createOscillator({
            gainNode: this.gainNode,
            audioCtx: this.audioCtx,
            volume: this.state.volume,
            activeType: activeType.id,
            frequency: this.state.frequency
        });

        this.oscillator.start();

    }

    pause() {
        this.setState({on: false});
        this.oscillator.stop();
    }

    changeFrequency(e) {
        this.setState({
            frequency: e.target.value
        });

        if(this.oscillator) {
            this.oscillator.frequency.value = this.state.frequency;
        }
    }

    changeVolume(e) {
        let volume = e.target.value;

        this.setState({
            volume: volume
        });
        this.gainNode.gain.value = volume / 100;
    }

    hideInput(e) {
        let parentSpan = e.target.parentElement;
        let children = parentSpan.parentElement.children;

        children[0].style.display = 'none';
        children[1].style.display = 'inline';
    }

    showInputEditor(e) {
        let parentSpan = e.target.parentElement;
        let children = parentSpan.parentElement.children;

        children[0].style.display = 'block';
        children[1].style.display = 'none';

        setTimeout(function() {
            children[0].focus();
        }, 500)
    }

    changeType(type) {

        var types = this.state.types.map((t) => {
            t.id === type ? t.active = true : t.active = false;
            return t;
        });

        this.setState({types: types});

        if(this.oscillator) {
            this.oscillator.type = type;
        }
    }

    render() {
        let btnclass = {btn: true};

        let onClass = classNames(_.extend(btnclass, {
            'selected': this.state.on
        }));

        let offClass = classNames(_.extend(btnclass, {
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
                        let typeClass = classNames(_.extend(btnclass, {
                            'selected': type.active
                        }));
                        return <span
                            key={type.id}
                            className={typeClass}
                            onClick={() => this.changeType(type.id)}>
                            {type.id}
                        </span>

                    })}
                </div>
                <div className="btn-group">
                    <div className="slider">
                        <label htmlFor="">frequency</label>
                        <input type="range"
                               className="frequency slider"
                               min="100"
                               max="3000"
                               value={this.state.frequency}
                               onChange={this.changeFrequency}/>
                        <span className="clickeable" onClick={this.showInputEditor}>
                            <span className="hidden-input">
                                <input
                                    value={this.state.frequency}
                                    onChange={this.changeFrequency}
                                    onBlur={this.hideInput}
                                    type="text" className="small-input"/>
                            </span>
                            <span className="text">
                                {this.state.frequency}Hz
                            </span>
                        </span>
                    </div>
                </div>
                <div className="btn-group">
                    <div className="slider">
                        <label htmlFor="">Volume</label>
                        <input type="range"
                               className="volume slider"
                               min="0"
                               max="100"
                               value={this.state.volume}
                               onChange={this.changeVolume}/>
                        <span>{this.state.volume}</span>
                    </div>
                </div>
                <canvas className='canvas'></canvas>
            </div>
        )
    }
}