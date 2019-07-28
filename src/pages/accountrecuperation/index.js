import React, { Component } from 'react';
import api from '../../services/axios';
import './accountrecuperation.css';

class AccountRecuperation extends Component {
    constructor(props) {
        super(props)
        this.state = { email: [] }
    }

    handleSubmit = async e => {
        e.preventDefault();

        const data = new FormData();
        let { email, password } = this.state;

        data.append('email', email);
        data.append('password', password);

        this.sendEmail();
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    sendEmail = async () => {
        try {
            await api.post('auth/forgotpassword', {
                email: this.state.email
            });
        } catch (error) {
            // if error returns status 401 then
            alert('No email registered')
            return document.location.assign('/');
        } finally {
            return document.location.assign('/resetpassword')
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
                        <div id="actions">
                            <button>Send email</button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
        )
    };
};

export default AccountRecuperation;