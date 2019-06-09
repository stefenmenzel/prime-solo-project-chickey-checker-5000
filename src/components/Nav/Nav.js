import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import {
  AppBar, Toolbar, Typography, IconButton,
  Drawer, List, ListItem, ListItemIcon, ListItemText
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import cc5Icon from '../../customIcons/cc5Icon.jsx';
import './Nav.css';

// {/* <Link to="/dashboard">
//   <h2 className="nav-title">Chickey-Checker-5000</h2>
// </Link>
//   <div className="nav-right">
//     <Link className="nav-link" to="/dashboard">
//       {/* Show this link if they are logged in or not,
//         but call this link 'Dashboard' if they are logged in,
//         and call this link 'Login / Register' if they are not */}
//       {this.props.user.id ? 'Dashboard' : 'Login / Register'}
//     </Link>
//     {/* Show the link to the info page, the alerts page, and the logout button if the user is logged in */}
//     {this.props.user.id && (
//       <>
//         <Link className="nav-link" to="/alerts">
//           Alerts
//           </Link>
//         <Link className="nav-link" to="/historicData">
//           Historic Data
//           </Link>
//         <Link className="nav-link" to="/profile">
//           Profile
//           </Link>
//         <Link className="nav-link" to="/info">
//           Info Page
//           </Link>
//         <LogOutButton className="nav-link" />
//       </>
//     )}
//     {/* Always show this link since the about page is not protected */}
//     <Link className="nav-link" to="/about">
//       About
//       </Link> */}

class Nav extends Component {

  state = {
    left: false
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  ListItemLink = () => {
    return <ListItem button component="a" />
  }

  getSideList = () => {
    return (
      <div>
        {/* dashboard, alerts, historic data, about, log out */}
        <List>
          <ListItem component={Link} to="/dashboard" button>
            {/* Show this link if they are logged in or not,
            but call this link 'Dashboard' if they are logged in,
            and call this link 'Login / Register' if they are not */}
            {this.props.user.id ? 'Dashboard' : 'Login / Register'}
          </ListItem>

          {this.props.user.id && (
            <>

              <ListItem component={Link} to="/alerts" button>                
                  Alerts              
              </ListItem>

              <ListItem component={Link} to="historicData" button>                
                  Historic Data              
              </ListItem>

              <ListItem component={Link} to="profile" button>                
                  Profile              
              </ListItem>

              <ListItem component={LogOutButton} button>
                Log Out
                {/* <LogOutButton className="nav-link" /> */}
              </ListItem>

            </>
          )}
          <ListItem component={Link} to="/about" button>            
              About            
          </ListItem>          
        </List>        
      </div>
    )
  }

  render() {
    return (
      <div className="nav">
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="Menu" onClick={this.toggleDrawer('left', true)}>
              <MenuIcon />
              {/* <cc5Icon viewBox="0 0 24 24"/> */}
            </IconButton>
            <Typography variant="h6">
              Chickey Checker 5000
            </Typography>
            {this.props.user.id &&
              <LogOutButton
                style={{ marginLeft: 'auto' }}
                color="inherit"
              />              
            }            
          </Toolbar>          
        </AppBar>
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {this.getSideList()}
          </div>
        </Drawer>        
        </div>      
    )
  }
}

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
