import Link from "next/link";
import SidebarNavigator from "../navigation/SidebarNavigator.jsx";

const ErrorBoundary = (props) => {
    return (
        <>
            <SidebarNavigator name="$pwd" />
            <main id="main-collapse">
                <img alt="error boundary image" src="/static/assets/sadmac.jpeg" />
                <div>{props.reason}</div>
                <Link href="/communications"><span>Please <a style={{cursor: "pointer"}}>report this event</a> to the webmaster.</span></Link>
            </main>
        </>
    );
}

export default ErrorBoundary;