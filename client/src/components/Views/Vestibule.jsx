import React from 'react';
import SidebarNavigator from "../Navigation/SidebarNavigator.jsx";
import EntryThumbnail from "./EntryThumbnail.jsx";

const Vestibule = (props) => {
    return (
        <div>
            <SidebarNavigator name="$pwd" home={true} />
            <main id="main-collapse">
            <div className="hero-full-wrapper">
                <div className="grid" style={{position: "relative", height: "15912.9px"}}>
                <div className="gutter-sizer"></div>
                <div className="grid-sizer"></div>
                    <EntryThumbnail title="hello" subtitle="test" thumbnailSrc="" />
                </div>
            </div>
            </main>
        </div>
    );
}
export default Vestibule;