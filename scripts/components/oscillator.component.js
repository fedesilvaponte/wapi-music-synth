import React, {Component, PropTypes} from 'react';
import classNames from 'classnames/bind';
import SliderInput from './sliderInput';
import OnOffButtons from './onOffButtons.component';
// import BiquadFilter from './biquadFilter.component';
import '../../sass/oscillator.scss';
import _ from 'lodash';

class Oscillator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            frequency: this.props.keyPressed ? this.props.keyPressed.freq : 220,
            volume: 50,
            detune: 0,
            keyName: '',
            on: false,
            types: [
                {id: 'sine', active: true},
                {id: 'square', active: false},
                {id: 'triangle', active: false},
                {id: 'sawtooth', active: false}
            ]
        };

        this.oscillator = props.audioCtx.createOscillator();
        this.gainNode = props.audioCtx.createGain();

        this.oscillator.type = 'sine';
        this.oscillator.frequency.value = this.state.frequency;

        this.gainNode.gain.value = 0;
        this.oscillator.start();
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
        if (nextProps.keyPressed) {
            this.setState({
                frequency: nextProps.keyPressed.freq,
                keyName: nextProps.keyPressed.name,
                muted: nextProps.muted
            });

            this.oscillator.frequency.value = nextProps.keyPressed.freq;

            if (nextProps.muted && this.props.keyPressed.freq === nextProps.keyPressed.freq) {
                this.gainInterval('start');
            } else {
                this.gainInterval('clear');
                this.gainNode.gain.value = this.state.volume / 100;
            }
        }
    }

    detune = (e) => {
        this.setState({detune: e.target.value});
        this.oscillator.detune.value = this.state.detune;
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

        this.setState({types: types});
        this.oscillator.type = type;
    }

    connect = () => {
        this.setState({on: true});
        this.oscillator.connect(this.gainNode);
        this.props.connect(this.gainNode);
    }

    disconnect = () => {
        this.setState({on: false});
        this.oscillator.disconnect();
        this.props.disconnect(this.gainNode);
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
        const btnclass = {btn: true};
        const typesList = this.state.types.map((type) => {
            const typeClass = classNames(_.extend(btnclass, { 'selected': type.active }));

            return (
                <span
                    key={type.id}
                    className={typeClass}
                    onClick={() => this.changeType(type.id) }>
                    {type.id}
                </span>
            );
        });

        return (
            <div className="oscillator">
                <OnOffButtons
                    onHandler={this.connect}
                    offHandler={this.disconnect}
                    status={this.state.on}/>
                <div className="btn-group">
                    <p>Oscillator Type</p>
                    {typesList}
                </div>
                <div className="btn-group">
                    <SliderInput
                        label="Detune"
                        range={[0, 100]}
                        change={this.detune}
                        value={this.state.detune}
                    />
                </div>
                <div className="btn-group">
                    <SliderInput
                        value={this.state.volume}
                        change={this.changeVolume}
                        label="Volume"
                        range={[0, 100]}/>
                </div>
            </div>
        );
    }
}

Oscillator.propTypes = {
    audioCtx: PropTypes.object.isRequired,
    muted: PropTypes.bool,
    keyPressed: PropTypes.object,
    connect: PropTypes.func.isRequired,
    disconnect: PropTypes.func.isRequired
};

export default Oscillator;
