import React, {PropTypes, Component} from 'react';
import SliderInput from './sliderInput';
import '../../sass/effects.scss';

class Delay extends Component {
    constructor(props) {
        super(props);
        this.synthDelay = props.audioCtx.createDelay(5.0);
        this.feedbackGain = props.audioCtx.createGain();

        this.state = {
            feedback: 0.7,
            delayTime: 0.5
        }

        this.synthDelay.delayTime.value = 0.5;
        this.feedbackGain.gain.value = this.state.feedback;

        this.synthDelay.connect(this.feedbackGain);
        this.feedbackGain.connect(this.synthDelay);
    }


    connect = () => {
        this.props.connect(this.synthDelay);
    }

    disconnect = () => {
        console.log('disconect');
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
                <div className="on-off-container">
                    <span className="btn" onClick={this.connect}>On</span>
                    <span className="btn" onClick={this.disconnect}>Off</span>
                </div>
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
    audioCtx: PropTypes.object.isRequired
};

export default Delay;
