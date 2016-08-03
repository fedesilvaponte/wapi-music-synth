import React, {PropTypes, Component} from 'react';
import SliderInput from './sliderInput';
import OnOffButtons from './onOffButtons.component';
import '../../sass/effects.scss';

class Delay extends Component {
    constructor(props) {
        super(props);
        this.synthDelay = props.audioCtx.createDelay(5.0);
        this.feedbackGain = props.audioCtx.createGain();

        this.state = {
            feedback: 0.7,
            delayTime: 0.5,
            on: false
        }

        this.synthDelay.delayTime.value = 0.5;
        this.feedbackGain.gain.value = this.state.feedback;
    }


    connect = () => {
        this.synthDelay.connect(this.feedbackGain);
        this.feedbackGain.connect(this.synthDelay);
        this.props.connect(this.synthDelay);
        this.setState({on: true});
    }

    disconnect = () => {
        console.log('disconect');
        this.props.disconnect(this.synthDelay);
        this.setState({on: false});
    }

    handleFeedback = (e) => {
        this.setState({feedback: e.target.value / 100});
        this.feedbackGain.gain.value = e.target.value / 100;
    }

    handleDelayTime = (e) => {
        this.setState({delayTime: e.target.value / 1000});
        this.synthDelay.delayTime.value = e.target.value / 1000;
    }

    render() {
        return (
            <div className="effect-box">
                <div className="effects-title">
                    <h1>DELAY</h1>
                </div>
                <OnOffButtons onHandler={this.connect} offHandler={this.disconnect} status={this.state.on}/>
                <div className="btn-group">
                    <SliderInput range={[0, 100]}
                                 value={this.state.feedback * 100}
                                 change={this.handleFeedback}
                                 updateValues={this.handleFeedback}
                                 label='Feedback'/>
                </div>
                <div className="btn-group">
                    <SliderInput range={[0, 3000]}
                                 value={this.state.delayTime * 1000}
                                 change={this.handleDelayTime}
                                 updateValues={this.handleDelayTime}
                                 postfix='ms'
                                 label='Time'/>
                </div>
            </div>
        );
    }
}

Delay.propTypes = {
    connect: PropTypes.func.isRequired,
    disconnect: PropTypes.func.isRequired,
    audioCtx: PropTypes.object.isRequired
};

export default Delay;
