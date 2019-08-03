import React from 'react';
import './styles.css';

const API_HOST = 'http://127.0.0.1:8000';

class AddImage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            description: '',
            submitted: false,
            loading: false,
            error: '',
            token: this.props.token,
            imgFile: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.addImage = this.addImage.bind(this);
    }

    async addImage(){
        let url = `${API_HOST}/api/v1/album/add`, result;
        let { token, description, imgFile } = this.state;
        let { albumId, albumName, albumOwner, } = this.props;
        let selfReference = this ;
        const formData = new FormData();
        formData.append('album', albumId);
        if ( description )
            formData.append('description', description === '' ? null : description);
        if ( imgFile )
            formData.append('file', imgFile);
    
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
                    albumId,
                    albumName,
                    albumOwner,
                    imageActiveItem: 'images',
                    appState: 'imagesPage',
                };
                selfReference.props.changeAppState(newState);
            }
            else
                selfReference.setState({ loading: false, error: result && result.file && result.file[0] ? result.file[0] : '' });
            return result;
        });
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value, error:'' });
    }

    handleUpload(e){
        this.setState({ imgFile: e.target.files[0], error:''});
    }

    async handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { imgFile } = this.state;

        // stop here if form is invalid
        if (!imgFile) {
            return;
        }

        this.setState({ loading: true });
        this.addImage();
   }

    render() {
        const { description, loading, error } = this.state;
        return (
            <div className="flexdiv">
                <form className="ui fluid form" onSubmit={this.handleSubmit}>
                    <div className="flexdiv">
                        <div>Description</div>
                        <div className="ui input">
                        <input type="text" name="description" value={description} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className = "flexdiv">
                        <input type='file' name='imgFile' onChange={this.handleUpload}/>
                    </div>
                    <div>
                        <button className="ui primary button" disabled={loading}>Add</button>
                        {loading &&
                            <div className="ui icon message">
                                <i className="notched circle loading icon"></i>
                                <div className="content">
                                <div className="header">
                                    Adding
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

export default AddImage;