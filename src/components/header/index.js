import React from 'react';
import './index.css';

function Header() {
    return (
        <header>
            <button onClick={() => {window.location.assign('/')}}>Login Interface</button>
        </header>
    )
}

export default Header;