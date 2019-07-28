import React, { Component } from 'react';
import api from '../../services/axios';
import './login.css';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = { email: [], password: [] }
    };

    handleSubmit = async e => {
        e.preventDefault();

        const data = new FormData();
        let { email, password } = this.state;

        data.append('email', email);
        data.append('password', password);
        
        this.Authenticate();
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    Authenticate = async () => {
        let { email, password } = this.state;

        if (email.length === 0 || password.length === 0) {
            return 
        } else {
            try {
                let { data: response } = await api.post('auth/authenticate', {
                    email: this.state.email,
                    password: this.state.password
                });
                let { token, user } = response;

                localStorage.setItem('TOKEN', token)
                return user;
            } catch (error) {
                // if response status 401
            } finally {
                window.location.assign('/main')
            }
        }
    }

    render() {
        return (
            <div className="main">
                <section id="component-box">
                    <div id="component">
                        <form onSubmit={this.handleSubmit}>
                            <article id="input-email">
                                <input
                                    id="mail" 
                                    placeholder="Email"
                                    name="email"
                                    type="text"
                                    onChange={this.handleChange}
                                    defaultValue={this.state.email}
                                />
                            </article>
                            <article id="input-password">
                                <input                                
                                    id="passw"
                                    placeholder="Password"
                                    name="password"
                                    type="text"
                                    onChange={this.handleChange}
                                    defaultValue={this.state.password}
                                />
                            </article>
                            <div id="actions">
                                <button id="actions-button">Login</button>
                            </div>
                            <div id="manager">
                                <button id="manager-button" onClick={() => {window.location.assign('/signin')}}>Sign in</button>
                                <p onClick={() => {window.location.assign('/forgotpassword')}} style={{
                                    fontSize: '9pt',
                                    color: 'grey',
                                    cursor: 'pointer',
                                    textDecoration: 'underline'
                                }}>Forgot you password?</p>                   
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        )
    };
};

export default Login;