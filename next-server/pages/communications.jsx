import Link from "next/link";
import SidebarNavigator from "../components/navigation/SidebarNavigator.jsx";

const Communications = () => {
    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(data)
        console.log(event.target)
        // try {
        //     let response = await fetch("http://localhost:5000/email", { method: "POST", body: data })
        //     const slugResponse = await response.text();
        //     if (response.status === 201) {
        //         this.setState({ redirect: true, redirectPath: `/formsuccess}`});
        //     } else {
        //         this.setState({ redirect: true, redirectPath: "/"});
        //     }
        //     Router.push(`${this.state.redirectPath}`);
        // } catch(err) {
        //     Router.back();
        // }
    }

    return (
        <div>
            <SidebarNavigator name="$ ping"/>
            <main id="main-collapse">
                <div className="row" style={{maxWidth: "900px"}}>
                    <div className="section-container-spacer">
                        <h1>Communications</h1>
                        <p>Should you wish to communicate, this is the best means to do so. PGP correspondence is welcome and even encouraged.
                            To this end, find below my self-signed GPG public key and accompanying fingerprint for validation.
                        </p>
                    </div>
                    <div className="section-container-spacer">
                        <form onSubmit={handleSubmit} className="reveal-content">
                            <div className="form-group">
                                <input name="email" type="email" className="form-control" id="email" placeholder="Email" />
                            </div>
                            <div className="form-group">
                                <input name="subject" type="text" className="form-control" id="subject" placeholder="Subject" />
                            </div>
                            <div className="form-group">
                                <textarea name="message" className="form-control" rows="3" placeholder="Enter your message"></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Send</button>
                        </form>
                        <div className="row" style={{marginTop: "20px"}}>
                            <div className="col-md-6">
                                <ul className="list-unstyled address-container">
                                    <li>
                                        <span className="fa-icon">
                                            <i className="fas fa-key" aria-hidden="true"></i>
                                        </span>
                                        <Link href="/pubkey"><a>public key</a></Link>
                                    </li>
                                    <li>
                                        <span className="fa-icon">
                                            <i className="fas fa-fingerprint" aria-hidden="true"></i>
                                        </span>
                                            306E 7D6A 359E 3448 F2F4  F85A 204C 907B 2280 7B5B
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
export default Communications;