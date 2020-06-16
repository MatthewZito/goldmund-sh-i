import Link from "next/link";
import SidebarNavigator from "../components/navigation/SidebarNavigator.jsx";
import Meta from "../components/wrappers/Meta.jsx";

const Information = () => {
    return (
        <>
            <Meta />
            <div>
                <SidebarNavigator name="$ whatis"/>
                <main id="main-collapse">
                    <div className="row">
                        <div className="col-xs-12 col-md-6">
                            <img className="img-responsive" alt="John Tromp's Cuckoo Cycle logo" src="https://hackernoon.com/hn-images/1*y9-rz5yuvrYeQMhyFChocg.png" />
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <h1>Goldmund.sh | Automated Cluster v1</h1>
                            <p>This site's content is currently being developed.</p>
                            <p>Lexicon (or simply 'Lex') is the corpus of my various efforts, coordinated as a dynamic and scalable graph across several
                            mediums. I have until now held archive of Lex via hand, an endeavor that has left me with copious 'loose leafs' and tattered journals
                            to which they once (presumably belonged). Now, I have decided to better archive this media.
                            </p>
                            
                            <h3>A Collation of Visual Media from 2009 - 2018</h3>

                            <p>While I've earnest intent to nigh archive the constituents of Lexicon in full, I am - for practical reasons - beginning with the visual media.</p>
                            <p>I should be able to utilize wget to pull everything from Lexicon I (a now defunct 'Google Pages' site from the
                            yesteryears that preceded my endeavoring into code.) and map all images into this site's database.</p> 
                            <p>Thus, this site will for now comprise all documents of visual media (contingent on quality) which I can salvage. 
                            Quality, here, is intended to mean substantive in narrative value, or otherwise integral to the macro-discourse 
                            of my collated visual works to which the document in question belongs. In other words, a subjective metric at best.</p>

                            <h3>Lexicon II: Build</h3>
                            
                            <p>This site is rather experimental; that is, I would not choose to utilize the technologies here for production web development - at least not in the 
                            manner in which they have been orchestrated here. 
                            </p>
                            <p>I'm running a server built with Python and the microframework Flask. It's handling everything server-side, including the database.</p>
                            
                            <p>The frontend is simple JS and CSS. I wanted something minimal and responsive; no React or CSS pre-processors (e.g. SASS) needed here.
                            I'm mapping through a few HTML files and dynamically interpolating values into them contingent on custom server-side logic.</p>
                            
                            <p>I began writing the code this morning; by noon, this app was complete (for now). In any case, this has been fun.
                            </p>
                            <Link href="/communications">
                                <button className="btn btn-primary">Communicate</button>
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
export default Information;
