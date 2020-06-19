import React from "react";

const SidebarFooter = () => {
    return (
        <nav className="nav-footer">
            <p className="nav-footer-social-buttons">
                <a aria-label="instagram" rel="noreferrer" className="fa-icon" target="_blank" href="https://www.instagram.com/magister_zito" title="instagram link">
                    <i className="fab fa-instagram" aria-hidden="true"></i>
                </a>
                <a aria-label="youtube" rel="noreferrer" className="fa-icon" target="_blank" href="https://www.youtube.com/user/fasolplanetarium/videos" title="youtube link">
                    <i className="fab fa-youtube" aria-hidden="true"></i>
                </a>
                <a aria-label="github" rel="noreferrer" className="fa-icon" target="_blank" href="https://github.com/MatthewZito" title="github link">
                    <i className="fab fa-github" aria-hidden="true"></i>
                </a>
            </p>
            <p>© goldmund</p>
        </nav>  
    );
}
export default SidebarFooter;
    