import React, {Component} from 'react';
import {createOscillator, hasClass, removeClass, addClass} from '../helpers';
import classNames from 'classnames/bind';
import _ from 'lodash';
import SliderInput from './sliderInput';
import BiquadFilter from './biquadFilter.component';

export default class Oscillator extends Component {
    constructor(props) {
        super(props);

        this.audioCtx = props.audioCtx;
        this.gainNode = this.audioCtx.createGain();

        this.state = {
            frequency: this.props.keyPressed ? this.props.keyPressed.freq : 220,
            volume: 50,
            keyName: '',
            on: false,
            muted: this.props.muted,
            filters: [],
            types: [
                {id: 'sine', active: true},
                {id: 'square', active: false},
                {id: 'triangle', active: false},
                {id: 'sawtooth', active: false},
            ]
        };

        this.oscillator;
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        var gainReduction;
        this.setState({
            frequency: nextProps.keyPressed.freq,
            keyName: nextProps.keyPressed.name,
            muted: nextProps.muted
        });

        if(this.oscillator) {
            this.oscillator.frequency.value = nextProps.keyPressed.freq;
        }

        if(nextProps.muted && this.props.keyPressed.freq === nextProps.keyPressed.freq) {
            gainReduction = setInterval(() => {
                if(this.gainNode.gain.value < 0.2) {
                    this.gainNode.gain.value = 0;
                    clearInterval(gainReduction)
                }
                this.gainNode.gain.value = this.gainNode.gain.value - 0.01;
            }, 10)

        } else {
            clearInterval(gainReduction)
            this.gainNode.gain.value = this.state.volume / 100;
        }
    }

    createOscillator = () => {
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
            frequency: this.state.frequency,
        });

        this.oscillator.start();
        this.gainNode.gain.value = 0;

    }

    pause = () => {
        this.setState({on: false});
        this.oscillator.stop();
    }

    mute = (e) => {
        this.setState({ muted: !this.state.muted });
        setTimeout(() => {
            this.state.muted ? this.gainNode.gain.value = 0 : this.gainNode.gain.value = this.state.volume / 100;
        }, 100);
    }

    changeFrequency = (e) => {
        this.updateValues(e);

        if(this.oscillator) {
            this.oscillator.frequency.value = this.state.frequency;
        }
    }

    updateValues = (e) => {
        this.setState({
            frequency: e.target.value
        });
    }

    changeVolume = (e) => {
        let volume = e.target.value;

        this.setState({
            volume: volume
        });
    }

    hideInput = (e) => {
        let parentSpan = e.target.parentElement;
        let children = parentSpan.parentElement.children;

        children[0].style.display = 'none';
        children[1].style.display = 'inline';

        this.changeFrequency(e);
    }

    showInputEditor = (e) => {
        let parentSpan = e.target.parentElement;
        let children = parentSpan.parentElement.children;

        children[0].style.display = 'block';
        children[1].style.display = 'none';

        setTimeout(function() {
            children[0].focus();
        }, 500)
    }

    handleKeyUp = (e) => {
        if(e.keyCode === 13) {
            this.hideInput(e);
        }
    }

    changeType = (type) => {

        var types = this.state.types.map((t) => {
            t.id === type ? t.active = true : t.active = false;
            return t;
        });

        this.setState({types: types});

        if(this.oscillator) {
            this.oscillator.type = type;
        }
    }

    addFilter = () => {
        this.setState({
            filters: [{
                name: 'filter',
                frequency: 100,
                q: 1
            }]
        });
    }

    render() {
        let btnclass = {btn: true};

        let onClass = classNames(_.extend(btnclass, {
            'selected': this.state.on
        }));

        let offClass = classNames(_.extend(btnclass, {
            'selected': !this.state.on
        }));

        let muteClass = classNames(_.extend(btnclass, {
            'selected': this.state.muted
        }));

        return (
            <div className="oscillator">
                <div className="btn-group">
                    <span className={onClass} onClick={this.createOscillator}>On</span>
                    <span className={offClass} onClick={this.pause}>Off</span>
                    <span className={muteClass} onClick={this.mute}>Mute</span>
                    <div className="key-name">{this.state.keyName}</div>
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
                    <SliderInput
                        label="frequency"
                        changeFrequency={this.changeFrequency}
                        value={this.state.frequency}
                        updateValues={this.updateValues}
                        handleKeyup={this.handleKeyUp}
                        showInputEditor={this.showInputEditor}
                        hideInput={this.hideInput}
                        frequency={this.state.frequency}
                    />
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
                <a onClick={this.addFilter} className="add">Add Filter</a>
                <div className="filters">
                    {this.state.filters.map(function(f) {
                        return <BiquadFilter frequency={f.frequency} />
                    })}
                </div>
                <canvas className='canvas'></canvas>
            </div>
        )
    }
}