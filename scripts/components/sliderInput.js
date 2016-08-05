import React, {PropTypes} from 'react';

const SliderInput = (props) => {

    const handleKeyUp = (e) => {
        if (e.keyCode === 13) {
            props.hideInput(e);
        }
    };

    const showInputEditor = (e) => {
        e.stopPropagation();
        let parentSpan = e.target.parentElement;
        let hiddenInput = parentSpan.nextSibling;
        console.log(e.target.parentElement.nextSibling);

        hiddenInput.style.display = 'inline';
        parentSpan.style.display = 'none';
    };

    const hideInput = (e) => {
        e.stopPropagation();
        let parentSpan = e.target.parentElement.parentElement;

        e.target.parentElement.style.display = 'none';
        parentSpan.childNodes[0].style.display = 'inline';
    };

    return (
        <div className="slider">
            <label htmlFor="">{props.label}</label>
            <input type="range"
                   className="frequency slider"
                   min={props.range[0]}
                   max={props.range[1]}
                   step={props.step || 1}
                   value={props.value}
                   onChange={props.change}/>
            <span className="clickeable" >
                <span className="text" onClick={showInputEditor}>
                    {props.value} {props.postfix}
                </span>
                <span className="hidden-input">
                    <input
                        value={props.value}
                        onChange={props.change}
                        onMouseLeave={hideInput}
                        onBlur={hideInput}
                        onKeyUp={handleKeyUp}
                        type="text" className="small-input"/>
                </span>
            </span>
        </div>
    );
};

SliderInput.propTypes = {
    value: PropTypes.any.isRequired,
    change: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    range: PropTypes.array.isRequired,
    postfix: PropTypes.string,
    step: PropTypes.number
};

export default SliderInput;
