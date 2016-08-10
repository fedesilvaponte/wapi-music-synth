import React, {PropTypes, Component} from 'react';
import SliderInput from './SliderInput';
import OnOffButtons from './OnOffButtons';
import '../../sass/effects.scss';

class Compressor extends Component {
    constructor(props) {
        super(props);
        this.comp = props.audioCtx.createDynamicsCompressor();

        this.state = {
            threshold: -20,
            ratio: 1,
            knee: 40,
            reduction: 0,
            on: false
        };

        this.comp.threshold.value = this.state.threshold;
        this.comp.ratio.value = this.state.ratio;
        this.comp.knee.value = this.state.knee;
        this.comp.attack.value = 0;
        this.comp.release.value = 0.25;
    }

    connect = () => {
        this.props.connect(this.comp);
        this.setState({on: true});

        this.reductionInterval = setInterval(() => {
            this.setState({reduction: this.comp.reduction});
        }, 500);
    }

    disconnect = () => {
        this.props.disconnect(this.comp);
        this.setState({on: false});
        clearInterval(this.reductionInterval);
    }

    handleThreshold = (e) => {
        this.comp.threshold.value = e.target.value;
        this.setState({threshold: e.target.value, reduction: this.comp.reduction});
    }

    handleRatio = (e) => {
        this.setState({ratio: e.target.value});
        this.comp.ratio.value = e.target.value;
    }

    handleKnee = (e) => {
        this.setState({knee: e.target.value});
        this.comp.knee.value = e.target.value;
    }

    render() {
        return (
            <div className="effect-box">
                <div className="effects-title">
                    <h1>COMP</h1>
                </div>
                <OnOffButtons onHandler={this.connect} offHandler={this.disconnect} status={this.state.on}/>
                <div className="btn-group">
                    <SliderInput range={[-50, 0]}
                                 value={this.state.threshold}
                                 change={this.handleThreshold}
                                 postfix='db'
                                 label='Threshold'/>
                </div>
                <div className="btn-group">
                    <SliderInput range={[1, 20]}
                                 value={this.state.ratio}
                                 step={0.1}
                                 change={this.handleRatio}
                                 label='Ratio'/>
                </div>
                <div className="btn-group">
                    <SliderInput range={[0, 50]}
                                 value={this.state.knee}
                                 change={this.handleKnee}
                                 label='Knee'/>
                </div>
            </div>
        );
    }
}

Compressor.propTypes = {
    connect: PropTypes.func.isRequired,
    disconnect: PropTypes.func.isRequired,
    audioCtx: PropTypes.object.isRequired
};

export default Compressor;
