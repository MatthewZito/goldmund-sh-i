import Link from "next/link";
import SidebarNavigator from "../components/navigation/SidebarNavigator.jsx";

const Information = () => {
    return (
        <div>
            <SidebarNavigator name="$ whatis"/>
            <main id="main-collapse">
                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        <img className="img-responsive" alt="" src="" />
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <h1>Lexicon v2.0</h1>
                        <p>content here</p>
                        <Link href="/communications">
                            <button className="btn btn-primary">Communicate</button>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
export default Information;
