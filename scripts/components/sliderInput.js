import React, {PropTypes} from 'react';

const SliderInput = (props) => {

    const handleKeyUp = (e) => {
        if (e.keyCode === 13) {
            props.hideInput(e);
        }
    };

    const showInputEditor = (e) => {
        let parentSpan = e.target.parentElement;
        let children = parentSpan.parentElement.children;

        children[0].style.display = 'block';
        children[1].style.display = 'none';

        setTimeout(function () {
            children[0].focus();
        }, 500);
    };

    const hideInput = (e) => {
        let parentSpan = e.target.parentElement;
        let children = parentSpan.parentElement.children;

        children[0].style.display = 'none';
        children[1].style.display = 'inline';
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
            <span className="clickeable" onClick={showInputEditor}>
                <span className="hidden-input">
                    <input
                        value={props.value}
                        onChange={props.change}
                        onBlur={hideInput}
                        onKeyUp={handleKeyUp}
                        type="text" className="small-input"/>
                </span>
                <span className="text">
                    {props.value} {props.postfix}
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
