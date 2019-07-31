import React from 'react';
import './styles.css';
import { Form, Radio } from 'semantic-ui-react'

class CreateAlbum extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            cover: null,
            privacy: 0,
            submitted: false,
            loading: false,
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handlePrivacy = this.handlePrivacy.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value, error:'' });
    }

    handlePrivacy(e, {value}) {
        this.setState({ privacy: value, error:'' });
    }


    handleUpload(e){
        console.log(e.target.files[0]);
        this.setState({ cover: e.target.files[0]});
    }

    async handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { name } = this.state;

        // stop here if form is invalid
        if (!name) {
            return;
        }

        this.setState({ loading: true });
        /*let response = await this.props.login(this.state);
        //console.log(response);
        if ( response === "failed" )
            this.setState({ loading: false, error: 'Unable to log in with provided credentials.' });
        */
    }

    render() {
        const { name, description, privacy, submitted, loading, error } = this.state;
        return (
            <div>
                <form className="ui fluid form" onSubmit={this.handleSubmit}>
                    <input type='file' name='cover' onChange={this.handleUpload}/>
                    <div className="flexdiv">
                        <div>Name</div>
                        <div className="ui input">
                            <input type="text" name="name" value={name} onChange={this.handleChange} />
                        </div>
                        {submitted && !name &&
                            <div className="ui left pointing red basic label">Album Name is required</div>
                        }
                    </div>
                    <div className="flexdiv">
                        <div>Description</div>
                        <div className="ui input">
                        <input type="text" name="description" value={description} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div>
                        <Form.Field>
                            Privacy: <b>{privacy === 0 ? 'Private' : 'Public'}</b>
                        </Form.Field>
                        <Form.Field>
                            <Radio
                                label='Private'
                                name='privacy'
                                value={0}
                                checked={privacy === 0}
                                onChange={this.handlePrivacy}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Radio
                                label='Public'
                                name='privacy'
                                value={1}
                                checked={privacy === 1}
                                onChange={this.handlePrivacy}
                            />
                        </Form.Field>
                    </div>
                    <div>
                        <button className="ui primary button" disabled={loading}>Create</button>
                        {loading &&
                            <div className="ui icon message">
                                <i className="notched circle loading icon"></i>
                                <div className="content">
                                <div className="header">
                                    Creating
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

export default CreateAlbum;