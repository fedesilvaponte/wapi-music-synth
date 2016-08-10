import React, {PropTypes} from 'react';
import classNames from 'classnames/bind';
import './on-off-buttons.scss';

const OnOffButtons = (props) => {
    let btnclass = { btn: true };

    let onClass = classNames(_.extend(btnclass, {
        'selected': props.status
    }));

    let offClass = classNames(_.extend(btnclass, {
        'selected': !props.status
    }));

    return (
        <div className="on-off-container">
            <span className={onClass} onClick={props.onHandler}>On</span>
            <span className={offClass} onClick={props.offHandler}>Off</span>
        </div>
    );
};

OnOffButtons.propTypes = {
    onHandler: PropTypes.func.isRequired,
    offHandler: PropTypes.func.isRequired,
    status: PropTypes.bool.isRequired
};

export default OnOffButtons;
