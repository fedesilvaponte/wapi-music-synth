import React, {Component, PropTypes} from 'react';
import {createOscillator} from '../helpers';
import classNames from 'classnames/bind';
import SliderInput from './sliderInput';
import BiquadFilter from './biquadFilter.component';
import '../../sass/oscillator.scss';
import _ from 'lodash';

class Oscillator extends Component {
    constructor(props) {
        super(props);

        this.audioCtx = props.audioCtx;
        this.gainNode = this.audioCtx.createGain();

        this.state = {
            frequency: this.props.keyPressed ? this.props.keyPressed.freq : 220,
            volume: 50,
            detune: 0,
            keyName: '',
            on: false,
            filters: [],
            types: [
                { id: 'sine', active: true },
                { id: 'square', active: false },
                { id: 'triangle', active: false },
                { id: 'sawtooth', active: false }
            ]
        };
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    gainInterval = (action) => {
        if (action === 'start') {
            this.gainReduction = setInterval(() => {
                if (this.gainNode.gain.value < 0) {
                    clearInterval(this.gainReduction);
                    this.gainNode.gain.value = 0;
                } else {
                    this.gainNode.gain.value = this.gainNode.gain.value - 0.01;
                }
            }, 10);
        } else {
            clearInterval(this.gainReduction);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            frequency: nextProps.keyPressed.freq,
            keyName: nextProps.keyPressed.name,
            muted: nextProps.muted
        });

        if (this.oscillator) {
            this.oscillator.frequency.value = nextProps.keyPressed.freq;
        }

        if (nextProps.muted && this.props.keyPressed.freq === nextProps.keyPressed.freq) {
            this.gainInterval('start');
        } else {
            this.gainInterval('clear');
            this.gainNode.gain.value = this.state.volume / 100;
        }
    }

    createOscillator = () => {
        this.setState({ on: true });

        let activeType = _.head(_.filter(this.state.types, { active: true }));

        if (this.oscillator) {
            this.oscillator.stop();
        }

        this.oscillator = createOscillator({
            audioCtx: this.audioCtx,
            activeType: activeType.id,
            frequency: this.state.frequency
        });

        this.gainNode.gain.value = this.state.volume / 100;
        this.oscillator.connect(this.gainNode);

        this.props.connectOsc(this.gainNode);

        this.oscillator.start();
        this.gainNode.gain.value = 0;
        // params.gainNode.connect(params.audioCtx.destination);
    }

    pause = () => {
        this.setState({ on: false });
        this.oscillator.stop();
    }

    changeFrequency = (e) => {
        this.updateValues(e);

        if (this.oscillator) {
            this.oscillator.frequency.value = this.state.frequency;
        }
    }
    detune = (e) => {
        this.updateValues(e);

        if (this.oscillator) {
            this.oscillator.detune.value = this.state.detune;
        }
    }

    updateValues = (e) => {
        this.setState({
            detune: e.target.value
        });
    }

    changeVolume = (e) => {
        let volume = e.target.value;

        this.setState({
            volume: volume
        });
    }


    changeType = (type) => {

        let types = this.state.types.map((t) => {
            t.id === type ? t.active = true : t.active = false;
            return t;
        });

        this.setState({ types: types });

        if (this.oscillator) {
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
        let btnclass = { btn: true };

        let onClass = classNames(_.extend(btnclass, {
            'selected': this.state.on
        }));

        let offClass = classNames(_.extend(btnclass, {
            'selected': !this.state.on
        }));

        return (
            <div className="oscillator">
                <div className="btn-group on-off-container">
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
                        return (
                            <span
                                key={type.id}
                                className={typeClass}
                                onClick={() => this.changeType(type.id) }>
                                {type.id}
                            </span>
                        );

                    }) }
                </div>
                <div className="btn-group">
                    <SliderInput
                        label="Detune"
                        range={[0,100]}
                        changeFrequency={this.changeFrequency}
                        change={this.detune}
                        value={this.state.detune}
                        updateValues={this.updateValues}
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
                {/*<a onClick={this.addFilter} className="add">Add Filter</a>*/}
                {/*<div className="filters">*/}
                    {/*{this.state.filters.map(function (f) {*/}
                        {/*return (*/}
                            {/*<BiquadFilter frequency={f.frequency}/>*/}
                        {/*);*/}
                    {/*}) }*/}
                {/*</div>*/}
                <canvas className='canvas'></canvas>
            </div>
        );
    }
}

Oscillator.propTypes = {
    audioCtx: PropTypes.object.isRequired,
    muted: PropTypes.bool,
    keyPressed: PropTypes.object,
    connectOsc: PropTypes.func.isRequired
};

export default Oscillator;
