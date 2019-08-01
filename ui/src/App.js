import React from 'react';
import Login from './Login';
import Albums from './Albums';
import SignUp from './SignUp';
import Images from './Images';

const API_HOST = 'http://127.0.0.1:8000';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      'appState': 'loginPage',
      'token': null,
      'albumActiveItem': 'allAlbums',
      'albumId': null,
      'imageActiveItem': null,
      'albumName': null,
      'albumOwner': null,
      'username': null,
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.changeAppState = this.changeAppState.bind(this);
  }

  changeAppState(params){
    this.setState(params);
  }

  async login(params) {
    if ( this.state.appState !== 'loginPage' )
      return;
    let data = {
      "username": params.username,
      "password": params.password,
    }

    let url = `${API_HOST}/api/v1/rest-auth/login/`;
    let selfReference = this ;
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
    .then(function(myJson) {
      //console.log(myJson);
      if ( typeof myJson.key === "undefined" )
        return;
      selfReference.setState({ 'token' : myJson.key, 'appState': 'albumsPage', 'username': params.username});
      //console.log(selfReference.state);
    });
    if ( this.state.appState === 'loginPage' )
      return "failed";
  }

  async logout() {
    let url = `${API_HOST}/api/v1/rest-auth/logout/`;
    let selfReference = this ;
    await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `TOKEN ${selfReference.state.token}`,
          // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({}), // body data type must match "Content-Type" header
    })
    .then(function(response) {
      return response.json();
    }).then(function(response){
      //console.log(response);
      if (response.detail === "Successfully logged out."){
        selfReference.setState({ 
          'appState': 'loginPage',
          'token': null,
          'albumActiveItem': 'allAlbums',
          'albumId': null,
          'imageActiveItem': null,
          'albumName': null,
          'albumOwner': null,
          'username': null,
        });
      }
      return response;
    })
  }
  
  

  render(){
    if ( this.state.appState === 'loginPage' ){
      return (
        <div className="topdiv-flex">
          <h2 className="ui header">Photo Gallery App</h2>
          <Login
            login={this.login}
            changeAppState={this.changeAppState}
          />
        </div>
      );
    }
    if ( this.state.appState === 'signUp' ){
      return (
        <div className="topdiv-flex">
          <h2 className="ui header">Photo Gallery App</h2>
          <SignUp
            changeAppState={this.changeAppState}
          />
        </div>
      );
    }
    if ( this.state.appState === 'albumsPage'){
      return (
        <Albums
          logout={this.logout}
          token={this.state.token}
          changeAppState={this.changeAppState}
          activeItem={this.state.albumActiveItem}
          username={this.state.username}
        />
      );
    }
    if ( this.state.appState === 'imagesPage'){
      return (
        <Images
          logout={this.logout}
          token={this.state.token}
          changeAppState={this.changeAppState}
          activeItem={this.state.imageActiveItem}
          albumId = {this.state.albumId}
          albumName = {this.state.albumName}
          albumOwner = {this.state.albumOwner}
        />
      );
    }
    return null;  
  }
}

export default App;
