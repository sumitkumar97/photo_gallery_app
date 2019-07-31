import React from 'react';
import './styles.css';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submitted: false,
            loading: false,
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value, error:'' });
    }

    async handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;

        // stop here if form is invalid
        if (!(username && password)) {
            return;
        }

        this.setState({ loading: true });
        let response = await this.props.login(this.state);
        //console.log(response);
        if ( response === "failed" )
            this.setState({ loading: false, error: 'Unable to log in with provided credentials.' });
    }

    render() {
        const { username, password, submitted, loading, error } = this.state;
        return (
            <div className='form-container'>
                <div className="flexdiv">
                    <h2>Login</h2>
                    <button
                        className="ui primary button signup"
                        onClick={()=>this.props.changeAppState({'appState': 'signUp'})}
                    >
                        SignUp
                    </button>
                </div>
                <form className="ui fluid form" onSubmit={this.handleSubmit}>
                    <div className="flexdiv">
                        <div>Username</div>
                        <div className="ui input">
                            <input type="text" name="username" value={username} onChange={this.handleChange} />
                        </div>
                        {submitted && !username &&
                            <div className="ui left pointing red basic label">Username is required</div>
                        }
                    </div>
                    <div className="flexdiv">
                        <div>Password</div>
                        <div className="ui input">
                            <input type="password" name="password" value={password} onChange={this.handleChange} />
                        </div>
                        {submitted && !password &&
                            <div className="ui left pointing red basic label">Password is required</div>
                        }
                    </div>
                    <div>
                        <button className="ui primary button" disabled={loading}>Login</button>
                        {loading &&
                            <div className="ui icon message">
                                <i className="notched circle loading icon"></i>
                                <div className="content">
                                <div className="header">
                                    Logging in
                                </div>
                                </div>
                            </div>
                        }
                    </div>
                    {error &&
                        <div className="ui negative message">
                            <div className="header">
                                {error}
                            </div>
                        </div>
                    }
                </form>
            </div>
        );
    }
}

export default Login;