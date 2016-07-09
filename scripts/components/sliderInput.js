import React from 'react';

const SliderInput = (props) => {
    return (
        <div className="slider">
            <label htmlFor="">{props.label}</label>
            <input type="range"
                   className="frequency slider"
                   min="0"
                   max="100"
                   value={props.value}
                   onChange={props.change}/>
                        <span className="clickeable" onClick={props.showInputEditor}>
                            <span className="hidden-input">
                                <input
                                    value={props.value}
                                    onChange={props.updateValues}
                                    onBlur={props.hideInput}
                                    onKeyUp={props.handleKeyUp}
                                    type="text" className="small-input"/>
                            </span>
                            <span className="text">
                                {props.value}
                            </span>
                        </span>
        </div>
    )
}
export default SliderInput;