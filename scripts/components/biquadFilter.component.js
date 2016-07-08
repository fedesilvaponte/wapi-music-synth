import React, {Component} from 'react';
import SliderInput from './sliderInput';

export default class BiquadFilter extends Component {
    constructor(props) {
        super(props);

        console.log(props.frequency)
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
        )
    }
}
