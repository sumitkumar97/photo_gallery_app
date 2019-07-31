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
            console.log(result);
            selfReference.setState({albumList: result});
            return result;
        });
    }

    render() {
        let {albumList} = this.state;
        let albumListJsx = albumList.map(
            function(album){
                return (<div key={album.id} className='flexdiv-vertical'>
                            <h3>{album.name}</h3>
                            <div>{`By ${album.owner}`}</div>
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
                albumListJsx
            }
        </div>
    }
}

export default MyAlbums;