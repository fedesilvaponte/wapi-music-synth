import React, {Component, PropTypes} from 'react';
import SliderInput from './sliderInput';

class BiquadFilter extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="biquadfilter">
                <h3>Filter</h3>
                <SliderInput
                    label="frequency"
                    value="20"
                />
                
            </div>
        );
    }
}

BiquadFilter.propTypes = {
    value: PropTypes.number.isRequired,
    change: PropTypes.func.isRequired,
    showInputEditor: PropTypes.func.isRequired,
    updateValues: PropTypes.func.isRequired,
    handleKeyUp: PropTypes.func.isRequired,
    hideInput: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
};

export default BiquadFilter;
