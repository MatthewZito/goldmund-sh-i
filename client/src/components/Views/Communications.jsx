import React from 'react';
import { Link } from 'react-router-dom';
import CollapsedNavigator from "../Navigation/CollapsedNavigator.jsx";
import SidebarNavigator from "../Navigation/SidebarNavigator.jsx";

const Communications = () => {
    return (
        <div>
            <CollapsedNavigator />
            <SidebarNavigator name="$ ping"/>
            <main className="" id="main-collapse">
                <div className="row">
                <div className="col-xs-12">
                    <div className="section-container-spacer">
                    <h1>Communications</h1>
                    <p>Should you wish to communicate, this is the best means to do so. PGP correspondence is welcome and even encouraged.
                        To this end, find below my self-signed GPG public key and accompanying fingerprint for validation.
                    </p>
                    </div>
                    <div className="section-container-spacer">
                    <form action="submit_form" method="post" className="reveal-content">
                        <div className="row">
                            <div className="col-md-6">
                            <div className="form-group">
                                <input name="email" type="email" className="form-control" id="email" placeholder="Email" />
                            </div>
                            <div className="form-group">
                                <input name="subject" type="text" className="form-control" id="subject" placeholder="Subject" />
                            </div>
                            <div className="form-group">
                                <textarea name="message" className="form-control" rows="3" placeholder="Enter your message"></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg">Send</button>
                            </div>
                            <div className="col-md-6">
                            <ul className="list-unstyled address-container">
                                <li>
                                <span className="fa-icon">
                                    <i className="fa fa-key" aria-hidden="true"></i>
                                </span>
                                <Link to="/pubkey">public key</Link>
                                </li>
                                <li>
                                <span className="fa-icon">
                                    <i className="fa fa-fingerprint" aria-hidden="true"></i>
                                </span>
                                    306E 7D6A 359E 3448 F2F4  F85A 204C 907B 2280 7B5B
                                </li>
                            </ul>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
                </div>
            </main>
        </div>
    );
}
export default Communications;