import React, { useState } from "react";

const Tooltip = (props) => {
    const [toolTipDisplay, setToolTipDisplay] = useState(false);
    let message = props.message
    let position = props.position
    return (
        <div style={{width: "100px", marginLeft: "-15px"}}>
            <span className='tooltip'
            onMouseEnter={() => setToolTipDisplay(!toolTipDisplay)}
            onMouseLeave={() => setToolTipDisplay(!toolTipDisplay)}
            >
            {toolTipDisplay === true &&
            <div className={`tooltip-bubble tooltip-${position}`}>
                <div className='tooltip-message'>{message}</div>
            </div>
            }
            {props.children}
            </span>
        </div>
    )
}

export default Tooltip;