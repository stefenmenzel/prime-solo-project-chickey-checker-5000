import React, { Component } from 'react';
import {connect} from 'react-redux';

import {Grid, Button} from '@material-ui/core';

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
    email: '',    
    coop: '',

  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,          
          coop: this.state.coop
        },
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {  
    return(  
      <div>
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <Grid container justify="center">
          <Grid item xs={12}>
            <Grid item xs={2}></Grid>
            <Grid item xs={10} style={{marginLeft:'auto'}}>
              <form onSubmit={this.registerUser}>
                <div className="cc5FormInner">
                  <h1>Register User</h1>
                  <div>
                    <label htmlFor="username">
                      Username:
              <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleInputChangeFor('username')}
                      />
                    </label>
                  </div>
                  <div>
                    <label htmlFor="password">
                      Password:
              <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChangeFor('password')}
                      />
                    </label>
                  </div>
                  <div>
                    <label htmlFor="email address">
                      Email Address:
              <input
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleInputChangeFor('email')}
                      />
                    </label>
                  </div>
                  <div>
                    <label htmlFor="coop">
                      coop id:
              <input
                        type="text"
                        name="coop"
                        value={this.state.coop}
                        onChange={this.handleInputChangeFor('coop')}
                      />
                    </label>
                  </div>
                  <div>
                    <Button
                      className="register"
                      variant="contained"
                      color="primary"
                      type="submit"
                      name="submit"                      
                    >
                      Register
                    </Button>
                  </div>
                </div>
              </form>
            </Grid>
          </Grid>                  
        <Grid item xs={12}>
          <Grid item xs={2}></Grid>
          <Grid item xs={10} style={{ marginLeft: 'auto' }}>
            <Grid item xs={5} style={{marginLeft: '20%'}}>
                <Button
                  type="button"
                  className="link-button"
                  onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}
                  color="primary"
                >
                  Login
                </Button>
            </Grid>
          </Grid>
        </Grid>          
        </Grid>                
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);

