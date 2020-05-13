import React from 'react';
import { Link } from 'react-router-dom';

const CollapsedNavigator = () => {
    return (
        <div className="navbar navbar-default visible-xs">
            <button type="button" className="navbar-toggle collapsed">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/" className="navbar-brand">Lexicon II</Link>
        </div>
    );
}

export default CollapsedNavigator;