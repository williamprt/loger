import React, { Component } from 'react';
import './main.css';

class Main extends Component {

    logout() {
        localStorage.clear();
        window.location.assign('/')
    }

    render() {
        return (
            <div className="main">
                <section id="box">
                    <h1>Hello World</h1>
                    <button onClick={this.logout}>Logout</button>
                </section>
            </div>
        )
    };
};

export default Main;