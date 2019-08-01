import React from 'react';
import { Menu } from 'semantic-ui-react';
import CreateAlbum from './CreateAlbum';
import MyAlbums from './MyAlbums';
import Trending from './Trending';

class Albums extends React.Component {
    constructor(props) {
        super(props);
        this.state = { activeItem: this.props.activeItem ? this.props.activeItem : 'trending' };
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.activeItem && nextProps.activeItem !== this.state.activeItem )
            this.setState({ activeItem: nextProps.activeItem });
    }

    render(){
        let {logout, token, changeAppState} = this.props;
        return(
            <div className="topdiv-flex">
                <h2 className="ui header">Photo Gallery App</h2>
                <Menu pointing secondary style={{"width":"100%"}}>
                    <Menu.Item
                        name='Trending'
                        active={this.state.activeItem === 'trending'}
                        onClick={()=>{this.setState({ 'activeItem': 'trending'}); changeAppState({'albumActiveItem':'trending'}); }}
                    />
                    <Menu.Item
                        name='My Albums'
                        active={this.state.activeItem === 'allAlbums'}
                        onClick={()=>{this.setState({ 'activeItem': 'allAlbums'}); changeAppState({'albumActiveItem':'allAlbums'}); }}
                    />
                    <Menu.Item
                        name='Create Album'
                        active={this.state.activeItem === 'createAlbum'}
                        onClick={()=>{this.setState({ 'activeItem': 'createAlbum'}); changeAppState({'albumActiveItem':'createAlbum'}); }}
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
                    <CreateAlbum
                        token={token}
                        changeAppState={this.props.changeAppState}
                    />
                :
                    null
                }
                { this.state.activeItem === 'allAlbums' ?
                    <MyAlbums
                        token={token}
                        changeAppState={this.props.changeAppState}
                    />
                :
                    null
                }
                { this.state.activeItem === 'trending' ?
                    <Trending
                        token={token}
                        changeAppState={this.props.changeAppState}
                        username={this.props.username}
                    />
                :
                    null
                }
            </div>
        );
    }
}

export default Albums;