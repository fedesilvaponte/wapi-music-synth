import React from 'react';

const SliderInput = (props) => {
    return (
        <div className="slider">
            <label htmlFor="">{props.label}</label>
            <input type="range"
                   className="frequency slider"
                   min="100"
                   max="3000"
                   value={props.frequency}
                   onChange={props.changeFrequency}/>
                        <span className="clickeable" onClick={props.showInputEditor}>
                            <span className="hidden-input">
                                <input
                                    value={props.frequency}
                                    onChange={props.updateValues}
                                    onBlur={props.hideInput}
                                    onKeyUp={props.handleKeyUp}
                                    type="text" className="small-input"/>
                            </span>
                            <span className="text">
                                {props.frequency}Hz
                            </span>
                        </span>
        </div>
    )
}
export default SliderInput;