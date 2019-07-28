import React, { Component } from 'react';
import api from '../../services/axios';
import './newpassword.css'

class NewPassword extends Component {
    constructor(props) {
        super(props)
        this.state = { email: [], password: [], token: [] }
    }

    handleSubmit = async e => {
        e.preventDefault();

        const data = new FormData();
        let { email, password } = this.state;

        data.append('email', email);
        data.append('password', password);

        this.changePassword();
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    changePassword = async () => {
        try {
            await api.post('auth/resetpassword', {
                email: this.state.email,
                password: this.state.password,
                token: this.state.token
            });

            let { token } = this.state;
            localStorage.setItem('TOKEN', token);
        } catch (error) {
            // if error returns status 401 then
            return window.location.assign('/');
        } finally {
            return window.location.assign('/main');
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
                                id="password" 
                                placeholder="Password"
                                name="password"
                                type="text"
                                onChange={this.handleChange}
                                defaultValue={this.state.password}
                            />
                        </article>
                        <article id="input-token">
                            <input
                                id="token" 
                                placeholder="Token"
                                name="token"
                                type="text"
                                onChange={this.handleChange}
                                defaultValue={this.state.token}
                            />
                        </article>
                        <div id="actions">
                            <button>Reset password</button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
        )
    };
};

export default NewPassword;