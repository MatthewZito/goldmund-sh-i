import React from 'react';

const EntryThumbnail = (props) => {
    return (
        <div className="grid-item" style={{position: "absolute", left: "0px", top: "0px"}}>
            <img className="img-responsive" alt="" src={props.thumbnailSrc} />
            <a className="project-description">
                <div className="project-text-holder">
                <div className="project-text-inner">
                    <h3>{props.title}</h3>
                    <p>{props.subtitle}</p>
                </div>
                </div>
            </a>
            </div>
    );
}
export default EntryThumbnail;