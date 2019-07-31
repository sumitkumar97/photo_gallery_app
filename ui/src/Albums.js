import React from 'react';
import { Menu } from 'semantic-ui-react';
import CreateAlbum from './CreateAlbum';

//const API_HOST = 'http://127.0.0.1:8000';

class Albums extends React.Component {
    constructor(props) {
        super(props);
        this.state = { activeItem: this.props.activeItem ? this.props.activeItem : 'trending' };
    }
    render(){
        let {logout, token} = this.props;
        return(
            <div className="topdiv-flex">
                <h2 className="ui header">Photo Gallery App</h2>
                <Menu pointing secondary style={{"width":"100%"}}>
                    <Menu.Item
                        name='Trending'
                        active={this.state.activeItem === 'trending'}
                        onClick={()=>this.setState({ 'activeItem': 'trending'})}
                    />
                    <Menu.Item
                        name='My Albums'
                        active={this.state.activeItem === 'allAlbums'}
                        onClick={()=>this.setState({ 'activeItem': 'allAlbums'})}
                    />
                    <Menu.Item
                        name='Create Album'
                        active={this.state.activeItem === 'createAlbum'}
                        onClick={()=>this.setState({ 'activeItem': 'createAlbum'})}
                    />
                    <Menu.Menu position='right'>
                        <Menu.Item
                        name='Logout'
                        active={this.state.activeItem === 'logout'}
                        onClick={logout}
                        />
                    </Menu.Menu>
                </Menu>
                { this.state.activeItem === 'createAlbum' ?
                    <CreateAlbum token={token}/>
                :
                    null
                }
            </div>
        );
    }
}

export default Albums;