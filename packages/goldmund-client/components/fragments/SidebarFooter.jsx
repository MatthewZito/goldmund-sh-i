import React from "react";

const SidebarFooter = () => {
    return (
        <nav className="nav-footer">
            <p className="nav-footer-social-buttons">
                <a className="fa-icon" target="_blank" href="https://www.instagram.com/magister_zito" title="">
                    <i className="fab fa-instagram" aria-hidden="true"></i>
                </a>
                <a className="fa-icon" target="_blank" href="https://www.youtube.com/channel/UCg3SBNPF1QyMeL-GtrKkvRQ/about?view_as=public" title="">
                    <i className="fab fa-youtube" aria-hidden="true"></i>
                </a>
                <a className="fa-icon" target="_blank" href="https://github.com/MatthewZito" title="">
                    <i className="fab fa-github" aria-hidden="true"></i>
                </a>
            </p>
            <p>© goldmund</p>
        </nav>  
    );
}
export default SidebarFooter;
    