import React from 'react';
import './styles.css';

const API_HOST = 'http://127.0.0.1:8000';

class AlbumImage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            token: this.props.token,
            imageList: []
        };

        this.fetchImages = this.fetchImages.bind(this);
        this.deleteImages = this.deleteImages.bind(this);
    }

    componentWillMount(){
        this.fetchImages();
    }

    async fetchImages(){
        let url = `${API_HOST}/api/v1/album/${this.props.albumId}/images`, result;
        let { token } = this.state;
        let selfReference = this ;
        await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                //'Content-Type': 'application/json',
                'Authorization': `TOKEN ${token}`,
            }
        })
        .then(function(response) {
            return response.json();
        })
        .catch(error => console.error('Error:', error))
        .then(function(myJson) {
            result = myJson;
            //console.log(result);
            selfReference.setState({imageList: result});
            return result;
        });
    }

    async deleteImages(imageId){
        let url = `${API_HOST}/api/v1/album/delete/image/${imageId}`;
        let { token } = this.state;
        let selfReference = this ;
        await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                //'Content-Type': 'application/json',
                'Authorization': `TOKEN ${token}`,
            }
        })
        .then(function(response) {
            selfReference.fetchImages();
            return response;
        })
        .catch(error => console.error('Error:', error));
    }

    render() {
        let {imageList} = this.state;
        if ( !imageList )
            return <div className="ui negative message">Server not responding.</div>
        let selfReference = this ;
        let imageListJsx = imageList.map(
            function(image){
                return (<div key={image.id} className='flexdiv-vertical'>
                        {   selfReference.props.albumOwner ?
                            <div style={{'display':'flex'}}>
                                <button className="negative ui button" onClick={()=>selfReference.deleteImages(image.id)}>Delete</button>
                            </div>
                        :
                            null
                        }
                            <img className="ui small image" style={{'width': '500px'}} src={API_HOST+image.file} alt='Not available'/>
                            { image.description ?
                                <div className="ui compact message">
                                    <p>{image.description}</p>
                                </div>
                            :
                                null
                            }
                        </div>
                );
            }
        );
        return <div className='album-container'>
            {
                imageListJsx.length?
                    imageListJsx
                :
                <div className="ui error message">
                    <div className="header">
                        This album does not have any photos.
                    </div>
                    <ul className="list">
                        <li>Head to the 'Add Photo' section to add them</li>
                    </ul>
                </div>
            }
        </div>
    }
}

export default AlbumImage;
