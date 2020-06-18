import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'
import SidebarFooter from "../fragments/SidebarFooter.jsx";

// wrap new entry route in admin
const SidebarNavigator = (props) => {
    const router = useRouter();
    const [toggled, setToggled] = useState(false);
    return (
        <>
        <div className="navbar navbar-default visible-xs">
            <button type="button" onClick={() => setToggled(!toggled)} className="navbar-toggle collapsed">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link href="/">
                <a className="navbar-brand">./goldmund.sh</a>
            </Link>
        </div>
        <div>
            <nav className={`sidebar ${toggled ? "open" : ""}`}>
                <div className="navbar-collapse" id="navbar-collapse">
                    <div className="site-header hidden-xs">
                    <img className="img-responsive site-logo" alt="site logo" src="/assets/main-logo.svg" />
                    <Link href="/"><a className="site-brand">{props.name}</a></Link>
                        {(router.pathname === "/") && (
                        <p>A collection of essays and writings.</p>
                        )}
                    </div>
                    <ul className="nav">
                        <li> 
                            <Link href="/">
                                <a className={router.pathname == "/" ? "active" : ""}>Vestibule</a>
                            </Link>
                        </li>
                        <li> 
                            <Link href="/information">
                                <a className={router.pathname == "/information" ? "active" : ""}>Info</a>
                            </Link>
                        </li>
                        <li> 
                            <Link href="/communications">
                                <a className={router.pathname == "/communications" ? "active" : ""}>Comms</a>
                            </Link>
                        </li>
                    </ul>
                    <SidebarFooter />
                </div> 
            </nav>
        </div>
        </>
    );
}

export default SidebarNavigator;

