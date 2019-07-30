import React from 'react';
import Login from './Login';

const API_HOST = 'http://127.0.0.1:8000';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 'login': false, 'token': null };
    this.createAlbum = this.createAlbum.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async login() {
    if ( this.state.login )
      return;
    let data = {
      "username": "amit",
      "password": "Amit@123"
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
      selfReference.setState({ 'token' : myJson.key, 'login': true });
      //console.log(selfReference.state);
    });
  }

  async logout() {
    let url = `${API_HOST}/api/v1/rest-auth/logout/`;
    await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({}), // body data type must match "Content-Type" header
    })
    .then(function(response) {
      return response.json();
    }).then(function(response){
      console.log(response);
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
    if ( !this.state.login )
      return <Login login={this.login} createAlbum={this.createAlbum}/>;
    //this.logout();
    this.login();
    return (
      <div>
        <h2 className="ui header">Photo Gallery App</h2>
        <button className="ui primary button" onClick={this.createAlbum}>Create New Album</button>
        <input type='file'/>
      </div>
    );
    }
}

export default App;
