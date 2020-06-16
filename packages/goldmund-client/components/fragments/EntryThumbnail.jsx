import React from 'react';
import Link from "next/link";

const EntryThumbnail = (props) => {
    return (
        <div key={props._id} className="grid-item" >
            <img className="img-responsive" alt="blog entry thumbnail" src={props.imgsrc} />
            <Link href="/entries/[slug]" as={`/entries/${props.slug}`}>
                <a className="project-description">
                <div className="project-text-holder">
                    <div className="project-text-inner">
                        <h3>{props.title}</h3>
                        <p>{props.subtitle}</p>
                    </div>
                </div>
                </a>
            </Link>
        </div>
    );
}
export default EntryThumbnail;