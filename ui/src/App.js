import React from 'react';
import Login from './Login';
import Albums from './Albums';

const API_HOST = 'http://127.0.0.1:8000';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 'appState': 'loginPage', 'token': null };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
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
      selfReference.setState({ 'token' : myJson.key, 'appState': 'albumsPage' });
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
      if (response.detail === "Successfully logged out.")
        selfReference.setState({ 'token' : null, 'appState': 'loginPage' });
      return response;
    })
  }
  
  createAlbum(){
    let url = `${API_HOST}/api/v1/album/list/private`;
    let selfReference = this ;
    fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `TOKEN ${selfReference.state.token}`,
      },
      //body: JSON.stringify({
      //}), // body data type must match "Content-Type" header
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      let result = JSON.stringify(myJson);
      console.log(result);
    });
  }

  render(){
    if ( this.state.appState === 'loginPage' ){
      return (
        <div className="topdiv-flex">
          <h2 className="ui header">Photo Gallery App</h2>
          <Login login={this.login}/>
        </div>
      );
    }
    else if ( this.state.appState === 'albumsPage'){
      return (
        <Albums
          logout={this.logout}
        />
      );
    }  
    return (
      <div>
        <h2 className="ui header">Photo Gallery App</h2>
        <button className="ui primary button" onClick={this.createAlbum}>Create New Album</button>
        <input type='file' className="ui secondary button"/>
        <button className="ui button" onClick={this.logout}>Logout</button>
      </div>
    );
    }
}

export default App;
