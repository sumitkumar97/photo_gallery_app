import React from 'react';
import './styles.css';
import { Form, Radio } from 'semantic-ui-react'

const API_HOST = 'http://127.0.0.1:8000';

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
            error: '',
            token: this.props.token,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handlePrivacy = this.handlePrivacy.bind(this);
    }

    async createAlbum(){
        let url = `${API_HOST}/api/v1/album/create`, result;
        let { token, name, description, cover, privacy } = this.state;
        let selfReference = this ;
        const formData = new FormData();
        formData.append('name', name);
        if ( description )
            formData.append('description', description === '' ? null : description);
        if ( cover )
            formData.append('cover', cover);
        formData.append('privacy', privacy);
    
        await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                //'Content-Type': 'application/json',
                'Authorization': `TOKEN ${token}`,
            },
            body: formData // body data type must match "Content-Type" header
        })
        .then(function(response) {
            return response.json();
        })
        .catch(error => console.error('Error:', error))
        .then(function(myJson) {
            result = myJson;
            if ( result && result.id ){
                //console.log(result);
                let newState = {
                    appState: 'imagesPage',
                    imageActiveItem: 'images',
                    albumId: result.id,
                    albumName: result.name,
                    albumOwner: true,
                };
                selfReference.props.changeAppState(newState);
            }
            else
                selfReference.setState({ loading: false, error: result && result.cover? result.cover: '' });
            return result;
        });
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value, error:'' });
    }

    handlePrivacy(e, {value}) {
        this.setState({ privacy: value, error:'' });
    }


    handleUpload(e){
        this.setState({ cover: e.target.files[0], error:'' });
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
        this.createAlbum();
   }

    render() {
        const { name, description, privacy, submitted, loading, error } = this.state;
        return (
            <div className="flexdiv">
                <form className="ui fluid form" onSubmit={this.handleSubmit}>
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
                    <div className = "flexdiv">
                        <input type='file' name='cover' onChange={this.handleUpload}/>
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