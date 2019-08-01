import React from 'react';
import './styles.css';

const API_HOST = 'http://127.0.0.1:8000';

class MyAlbums extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            token: this.props.token,
            albumList: []
        };

        this.fetchAlbums = this.fetchAlbums.bind(this);
        this.deleteAlbums = this.deleteAlbums.bind(this);
    }

    componentWillMount(){
        this.fetchAlbums();
    }

    async fetchAlbums(){
        let url = `${API_HOST}/api/v1/album/list/private`, result;
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
            selfReference.setState({albumList: result});
            return result;
        });
    }

    async deleteAlbums(albumId){
        let url = `${API_HOST}/api/v1/album/delete/${albumId}`;
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
            selfReference.fetchAlbums();
            return response;
        })
        .catch(error => console.error('Error:', error));
    }

    render() {
        let {albumList} = this.state;
        let selfReference = this ;
        let albumListJsx = albumList.map(
            function(album){
                return (<div key={album.id} className='flexdiv-vertical'>
                            <div style={{'display':'flex'}}>
                                <u>
                                    <h3
                                        className="click-heading"
                                        onClick={()=>selfReference.props.changeAppState(
                                            {
                                                albumId: album.id,
                                                albumName: album.name,
                                                albumOwner: true,
                                                imageActiveItem: 'images',
                                                appState: 'imagesPage',
                                            }
                                        )}
                                    >
                                        {album.name}
                                    </h3>
                                </u>
                                <button className="negative ui button" onClick={()=>selfReference.deleteAlbums(album.id)}>Delete</button>
                            </div>
                            { album.cover ?
                                <img className="ui small image" style={{'width': '500px'}} src={API_HOST+album.cover} alt='Not available'/>
                            :
                                null
                            }
                            { album.description ?
                                <div className="ui compact message">
                                    <p>{album.description}</p>
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
                albumListJsx.length?
                    albumListJsx
                :
                <div className="ui error message">
                    <div className="header">
                        You have not created any albums.
                    </div>
                    <ul className="list">
                        <li>Head to the 'Create Album' section to create albums</li>
                    </ul>
                </div>
            }
        </div>
    }
}

export default MyAlbums;