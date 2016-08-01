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

        props.changeFrequency(e);
    };

    return (
        <div className="slider">
            <label htmlFor="">{props.label}</label>
            <input type="range"
                   className="frequency slider"
                   min="0"
                   max="100"
                   value={props.value}
                   onChange={props.change}/>
            <span className="clickeable" onClick={showInputEditor}>
                <span className="hidden-input">
                    <input
                        value={props.value}
                        onChange={props.updateValues}
                        onBlur={hideInput}
                        onKeyUp={handleKeyUp}
                        type="text" className="small-input"/>
                </span>
                <span className="text">
                    {props.value}
                </span>
            </span>
        </div>
    );
};

SliderInput.propTypes = {
    value: PropTypes.number.isRequired,
    change: PropTypes.func.isRequired,
    changeFrequency: PropTypes.func.isRequired,
    updateValues: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
};

export default SliderInput;
