import React from 'react';
import { Menu } from 'semantic-ui-react';
import AddImage from './AddImage';
import AlbumImage from './AlbumImage';

class Images extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            activeItem: this.props.activeItem ? this.props.activeItem : 'images',
        };
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.activeItem && nextProps.activeItem !== this.state.activeItem )
            this.setState({ activeItem: nextProps.activeItem });
    }

    render(){
        let {logout, token, albumId, albumName, albumOwner} = this.props;
        return(
            <div className="topdiv-flex">
                <h2 className="ui header">Photo Gallery App</h2>
                <Menu pointing secondary style={{"width":"100%"}}>
                    <Menu.Item
                        name={albumName}
                        active={this.state.activeItem === 'images'}
                        onClick={()=>this.setState({ 'activeItem': 'images'})}
                    />
                    <Menu.Item
                        name='Add Photo'
                        active={this.state.activeItem === 'addImage'}
                        onClick={()=>this.setState({ 'activeItem': 'addImage'})}
                    />
                    <Menu.Menu position='right'>
                        <Menu.Item
                        name='Logout'
                        active={this.state.activeItem === 'logout'}
                        onClick={logout}
                        />
                    </Menu.Menu>
                </Menu>
                { this.state.activeItem === 'addImage' ?
                    <AddImage
                        token={token}
                        changeAppState={this.props.changeAppState}
                        albumId={albumId}
                        albumName={albumName}
                        albumOwner={albumOwner}
                    />
                :
                    null
                }
                { this.state.activeItem === 'images' ?
                    <AlbumImage
                        token={token}
                        changeAppState={this.props.changeAppState}
                        albumOwner={albumOwner}
                        albumId={albumId}
                    />
                :
                    null
                }
            </div>
        );
    }
}

export default Images;