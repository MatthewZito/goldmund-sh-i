import Link from "next/link";

const EntryThumbnail = (props) => {
    return (
        <div className="grid-item">
            <img className="img-responsive" alt="" src={props.imgsrc} />
            <Link href="/entry/[slug]" as={`/entry/${props.slug}`}>
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