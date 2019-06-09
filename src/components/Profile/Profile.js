import React, {Component} from 'react';
import {connect} from 'react-redux';
import ProfileItem from './ProfileItem';
import { Grid, Button, Typography, TextField, Fab } from '@material-ui/core';
import {Edit} from '@material-ui/icons';

import './Profile.css';

class Profile extends Component{

    state = {
        first_name: this.props.user.first_name,
        last_name: this.props.user.last_name,
        email: this.props.user.email,
        phone_number: this.props.user.phone_number,
        isClicked: false,
    }

    componentDidMount(){
        console.log('this.state on mount:', this.state);
        this.initializeState();
    }

    initializeState = () => {
        this.setState({
            first_name: this.props.user.first_name,
            last_name: this.props.user.last_name,
            email: this.props.user.email,
            phone_number: this.props.user.phone_number,
            isClicked: false
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (!window.confirm("Are you sure you want to update your profile?")) {
            this.toggleInput();
            this.initializeState();
            return;
        }
        console.log('saving profile');
        this.props.dispatch({type: 'UPDATE_PROFILE', payload: this.state});
        this.toggleInput();
    }

    toggleInput = () => {
        this.setState({
            ...this.state,
            isClicked: !this.state.isClicked,
        })
    }

    handleChange = (propertyToChange, event) => {
        console.log('handling change:', event.target.value);
        this.setState({
            ...this.state,
            [propertyToChange]: event.target.value
        })
    }
    
    render(){
        console.log('this.state hath re-rendered: ', this.state);
        return(
            <Grid container justify="center">
                <Grid item xs={12}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={10} style={{marginLeft:'auto'}}>
                        <form onSubmit={this.handleSubmit} className="profileForm">
                            <div className="cc5FormInner">
                                <Typography variant="h4">Profile</Typography>
                                {/* <h1>Profile</h1> */}
                                <div className="profileItem" ><Typography style={{justifyContent:"center"}}><div className="profileLabel">First Name: </div><ProfileItem toggleInput={this.toggleInput} isClicked={this.state.isClicked} handleChange={this.handleChange} valueToChange="first_name" item={this.state.first_name} /></Typography></div>
                                <div className="profileItem"><Typography>Last Name: <ProfileItem toggleInput={this.toggleInput} isClicked={this.state.isClicked} handleChange={this.handleChange} valueToChange="last_name" item={this.state.last_name} /></Typography></div>
                                <div className="profileItem"><Typography>Email: <ProfileItem toggleInput={this.toggleInput} isClicked={this.state.isClicked} handleChange={this.handleChange} valueToChange="email" item={this.state.email} /></Typography></div>
                                <div className="profileItem"><Typography>Phone Number: <ProfileItem toggleInput={this.toggleInput} isClicked={this.state.isClicked} handleChange={this.handleChange} valueToChange="phone_number" item={this.state.phone_number} /></Typography></div>
                                <Grid item xs={12}>                                    
                                    <Button color="primary" variant="contained" type="submit">save</Button>                                                                        
                                    <Button style={{float: 'right'}} color="primary" aria-label="Edit Profile" onClick={this.toggleInput}>
                                        <Edit />
                                    </Button>
                                </Grid>                                
                            </div>
                        </form>
                    </Grid>
                </Grid>                
            </Grid>
        )
    }
}

const mapStatToProps = (reduxState) => {
    return { 
        user: reduxState.user,
     };
}

export default connect(mapStatToProps)(Profile);