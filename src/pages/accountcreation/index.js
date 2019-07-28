import React, { Component } from 'react';
import api from '../../services/axios';
import './accountcreation.css'

class NewAccount extends Component {
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

        this.createAccount();
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    createAccount = async () => {
        try {
            let { data: response } = await api.post('auth/register', {
                email: this.state.email,
                password: this.state.password
            });
            let { token, registration } = response;

            localStorage.setItem('TOKEN', token)

            return registration;
        } catch (error) {
            // if error returns status 401
        } finally {
            document.location.assign('/main');
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
                                <button>Sign in</button>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        )
    };
};

export default NewAccount;