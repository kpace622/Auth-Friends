import React from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

class Login extends React.Component {
    state = {
        credentials: {
            username: 'Lambda School',
            password: 'i<3Lambd4'
        }
    };

    handleChange = e => {
        this.setState({
            credentials: {
                ...this.state.credentials,
            [e.target.name]: e.target.value
            }
        });
    };

    handleLogin = e => {
        e.preventDefault();
        axiosWithAuth()
        .post('/login', this.state.credentials)
        .then(res => {
            console.log(res);
            localStorage.setItem('token', res.data.payload);
            this.props.history.push('/friendslist')
        })
        .catch(err => {
            console.log('invalid log in', err)
        });
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleLogin}>
                    <input
                        type='text'
                        name='username'
                        value={this.state.credentials.username}
                        onChange={this.handleChange}
                    />
                    <input
                        type='password'
                        name='password'
                        value={this.state.credentials.password}
                        onChange={this.handleChange}
                    />
                    <button>Log in</button>
                </form>
            </div>
        );
    }
}

export default Login;