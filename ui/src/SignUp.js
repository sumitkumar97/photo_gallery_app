import React from 'react';
import './styles.css';

const API_HOST = 'http://127.0.0.1:8000';

class SignUp extends React.Component {
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
        this.signUp = this.signUp.bind(this);
    }

    async signUp() {
        let { username, password } = this.state;
        let data = {
            "username": username,
            "password1": password,
            "password2": password,
        }

        let url = `${API_HOST}/api/v1/rest-auth/registration/`;
        let selfReference = this ;
        let failedFetch = false;
        await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
        .then(function(response) {
            return response.json();
        })
        .catch(error => {console.error('Error:', error); failedFetch = true;})
        .then(function(response) {
            //console.log(response);
            if ( response && response.key ){
                selfReference.props.changeAppState({ 'appState': 'loginPage' });
                return;
            }
            let error = '';
            if ( response && response.username ){
                response.username.forEach(
                    function (item) {
                        error += item + " ";
                    }
                )
            }
            if ( response && response.password1 ){
                response.password1.forEach(
                    function (item) {
                        error += item + " ";
                    }
                )
            }
            if ( failedFetch )
                error = "Server not responding.";
            selfReference.setState({ loading: false, error });
        });
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
        this.signUp();  
    }

    render() {
        const { username, password, submitted, loading, error } = this.state;
        return (
            <div className='form-container'>
                <div className="flexdiv">
                    <h2>SignUp</h2>
                    <button
                        className="ui primary button signup"
                        onClick={()=>this.props.changeAppState({'appState': 'loginPage'})}
                    >
                        Login
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
                        <button type="submit" className="ui primary button" disabled={loading}>SignUp</button>
                        {loading &&
                            <div className="ui icon message">
                                <i className="notched circle loading icon"></i>
                                <div className="content">
                                    <div className="header">
                                        Signing Up
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

export default SignUp;