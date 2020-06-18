
import React, { useState } from "react";
import Link from "next/link";
import SidebarNavigator from "../components/navigation/SidebarNavigator.jsx";
import Meta from "../components/wrappers/Meta.jsx";

const Information = () => {
    const [tooLongDidntRead, setTooLongDidntRead] = useState(true)
    return (
        <>
            <Meta />
            <div>
                <SidebarNavigator name="$ whatis"/>
                <main id="main-collapse">
                    <div className="row">
                    <div className="col-xs-12 col-md-6">
                            <img className="img-responsive" style={{ marginTop: "30px" }} alt="A picture of the site admin" src="/assets/headshot.jpg" />
                            <p className="img-caption">Hi, how are you?</p>
                            { !tooLongDidntRead && (
                                <>
                                    <img className="img-responsive" alt="A diagrammatic chart and HLD for Goldmund.sh" src="/assets/goldmund_hld.jpg" />
                                    <p className="img-caption">A diagrammatic HLD of the Goldmund.sh architecture</p>
                                </>
                            )}
                        </div>
                    
                        <div className="col-xs-12 col-md-6">
                            <h1>Goldmund.sh | Automated Cluster v1</h1>
                            <hr />
                            <p>
                            Welcome to Goldmund.sh. This website is but an entrypoint into an experimental web application designed as an inquiry
                            into the nature of automation as it pertains to personhood and the internet. My name is Matthew; I am an artist and computer scientist. I admire greatly elegant
                            system architectures; whether such architectures comprise software or humans is of negligible consequence to what is a rather unbridled interest in these topics.
                            </p>
                            
                            <p>
                            As someone who inhabits a markedly obsessive-compulsive framework, I have - for the greater duration of my life - taken to archiving and documenting 
                            the topological graph that is my meandering outputs. Even prior to my forays into computer science, I comprised at the age of 14 the aptly and eponymously named 
                            "Lexicon", to be a corpus of my various efforts, coordinated as a comprehensive archive across several mediums. 
                            </p>

                            <p>
                            I have until now - some fifteen years subsequent - held archive of Lex via hand, an endeavor that has left me with copious 'loose leafs' and tattered journals
                            to which they once (presumably belonged). Now, I have decided to better archive this media. So yes, in short, you're looking at a glorified blog. But this site is also so very much more than that...
                            </p>
                            
                            { !tooLongDidntRead && (
                                <>
                                    <h3>Goldmund.sh v1 | Build</h3>
                                    <hr />
                                    <p>
                                    You've probably wondered why this site is being referred to as an <em>automated</em> cluster. Aren't clusters automated by nature? Not necessarily. There are imperative paradigms and approaches
                                    to development and CI/CD in cloud computing, but I feel these methodologies bely the potency of PaaS and other such cloud-integrations. I've the conviction that Kubernetes is a beautiful software that 
                                    eagerly expresses a proclivity for orchestrating objects in a less explicit manner.
                                    </p>
                                    <p>
                                    This <em>less explicit manner</em> is automating the cloud software declaratively. While a considerable deal more arduous to configure than the aforementioned approach, doing this ultimately affords lower opportunity-cost. 
                                    In my case, this meant making my software infrastructure robust, scalable, and <em>dynamically</em> automated by coordinating the entire CI/CD pipeline to be triggered by single actions, from deduplicated sources of truth. 
                                    Follows is a high-level overview of this process:
                                    </p>
                                    <ul>
                                        <li>The Goldmund.sh web app is comprised of several microservices which work together to efficiently handle data processing, content management, and response normalization.</li>
                                        <li>These services are orchestrated with Kubernetes and are built from Docker images. While these images are kept relatively compact, the Goldmund.sh cluster spawns new nodes with pre-configured persistent volume claims as needed</li>
                                        <li>The services are coordinated by an Ingress Controller with automated RBAC and role allocation rule tables</li>
                                        <li>This site's TLS certification process is likewise automated: every ninety days, the goldmund-issuer service initializes, contacts the certificate authority, and completes the presented infra challenge and paired-key exchange, effectively renewing the cert.</li>
                                        <li>This application is automatically tested, built, and deployed by way of custom webhooks: pushing new code changes to the central repository accompanied with the deployment commit message keyword will trigger this entire pipeline.</li>
                                        <li>This application's services replicate themselves programmatically, typically to stabilize virtual CPU processing e.g. if the client pods (responsible for what you're looking at right now) are hit with too much traffic,
                                        the Goldmund.sh cluster will spin up new replicas and disperse traffic evenly via the Ingress-Controller.</li>
                                        <li>The entire application has been open-sourced, utilizing polymorphic and otherwise self-modifying code to instantiate the semiotic environment (i.e. the specific data such as blog entries). Kubectl applies constants via a Secret object; these values are interpolated into the base images' source-code. Hypothetically,
                                        I might replicate the actual cluster and therein respectively instantiate different semiotic scopes (e.g. three versions of Goldmund.sh contingent on locale - one dedicated to programming, the second to dogs, the third to music theory) </li>
                                    </ul>
                                    <p>You can also To read more about the Goldmund.sh v1 development process, system architecture, and the myriad nuances + easter eggs of this project, visit its repository <a target="_blank" href="https://github.com/MatthewZito/goldmund-automate-cluster/tree/master/documentation" title="github repository for Goldmund.sh">here.</a></p>

                                    <h3>A Collation of Writings and Visual Media from 2009 - Present</h3>
                                    <hr />
                                    <p>Lessening expenditures insofar as productivity is concerned means that I can do with this project what I did in the past as a painter - construct conceptual narratives; this is the web as performance.</p>
                                    <p>While I've earnest intent to nigh archive the constituents of Lexicon in full, I am - for practical reasons - beginning with visual and literary media.</p>
                                    <p>You'll notice the ostensible non-sequitur that arises when contrasting the writing entries' thumbnails and the entries' subject matter - it is not so 
                                    apparent that they are inextricable, or even related at all. That is, the entry thumbnails are a meta-collection of visual media; they are also portals to 
                                    literary media. I make a concerted effort to correlate these across a recognizable narrative. </p>
                                    <p>That said, if you're interested in the stranger and more esoteric domains of computer-science, music, art, theory and criticism, philosophy, et al, stick around.</p>
                                </>
                            )}
                            <hr />
                            <div>
                                <Link href="/communications">
                                    <button className="btn btn-primary">Communicate</button>
                                </Link>
                                <button onClick={() => setTooLongDidntRead(!tooLongDidntRead) } className="btn btn-primary" style={{ marginLeft: "1rem" }}>{ tooLongDidntRead ? "Show more..." : "Show less..."}</button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
export default Information;
