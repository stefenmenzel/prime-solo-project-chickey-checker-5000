import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import {
  AppBar, Toolbar, Typography, IconButton,
  Drawer, List, ListItem, ListItemIcon, ListItemText, Divider
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {Alarm, BarChart, AccountCircle, Assessment, Dashboard, Input} from '@material-ui/icons';
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
        <Typography>
          {/* dashboard, alerts, historic data, about, log out */}
          <List>
            <ListItem style={{textAlign: 'center', display:'block'}}>
              <img src='images/Chickey-Checker-5000-logo-2.png' height='50px' width='50px' />
            </ListItem>
            <Divider />            
            <ListItem component={Link} to="/dashboard" button>
              {/* Show this link if they are logged in or not,
            but call this link 'Dashboard' if they are logged in,
            and call this link 'Login / Register' if they are not */}
              {this.props.user.id ? 
                <>
                  <Dashboard color="primary" />
                  <Typography variant="h5">Dashboard</Typography>
                </>
                : 
                'Login / Register'}
            </ListItem>

            {this.props.user.id && (
              <>

              <ListItem component={Link} to="/alerts" button>
                <Alarm color="primary" />
                <span>{' '}</span>                
                <Typography variant="h5">Alerts</Typography>                  
              </ListItem>

                <ListItem component={Link} to="historicData" button>
                  <Assessment color="primary" />
                  <Typography variant="h5">Historic Data</Typography>
              </ListItem>

                <ListItem component={Link} to="profile" button>
                  <AccountCircle color="primary" />
                  <Typography variant="h5">Profile</Typography>
              </ListItem>
              <ListItem component={LogOutButton} button nav={true} ContainerProps={{nav: 'true'}}>                  
                  {/* <Typography variant="h5">Log Out</Typography> */}
              {/* <LogOutButton /> */}
              </ListItem>

              </>
            )}
            {/* <ListItem component={Link} to="/about" button>
              About
          </ListItem> */}
          </List>
        </Typography>
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
