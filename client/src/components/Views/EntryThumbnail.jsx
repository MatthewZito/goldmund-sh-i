import React from 'react';
import { NavLink } from "react-router-dom";

const EntryThumbnail = (props) => {
    return (
        <div className="grid-item">
            <img className="img-responsive" alt="" src={props.imgsrc} />
            <NavLink to={`/entry/${props.id}`} className="project-description">
                <div className="project-text-holder">
                <div className="project-text-inner">
                    <h3>{props.title}</h3>
                    <p>{props.subtitle}</p>
                </div>
                </div>
            </NavLink>
            </div>
    );
}
export default EntryThumbnail;