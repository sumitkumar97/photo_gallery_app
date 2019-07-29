import React from 'react';

const API_HOST = 'http://127.0.0.1:8000';
let token = null;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 'login': false, 'token': null };
    this.createAlbum = this.createAlbum.bind(this);
  }

  async login(params) {
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
      console.log(selfReference.state);
    });
  }

  async logout(params) {
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
    let url = `${API_HOST}/api/v1/album/create`;
    console.log(this);
    let selfReference = this ;
    fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `TOKEN ${selfReference.state.token}`,
      },
      body: JSON.stringify({
        'name': 'Ocean',
        'privacy': '1'
      }), // body data type must match "Content-Type" header
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
    //this.logout();
    this.login();
    return (
      <div>
        <h2 className="ui header">Photo Gallery App</h2>
        <button className="ui primary button" onClick={this.createAlbum}>Create New Album</button>
      </div>
    );
    }
}

export default App;
