import React, {Component} from 'react';
import {connect} from 'react-redux';
import ProfileItem from './ProfileItem';

class Profile extends Component{

    state = {
        first_name: this.props.user.first_name,
        last_name: this.props.user.last_name,
        email: this.props.user.email,
        phone_number: this.props.user.phone_number
    }

    componentDidMount(){
        console.log('this.state on mount:', this.state);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('saving profile');        
        this.props.dispatch({type: 'UPDATE_PROFILE', payload: this.state});        
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
            <div>
                <h1>Profile</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>First Name: <ProfileItem handleChange={this.handleChange} valueToChange="first_name" item={this.state.first_name} /></div>
                    <div>Last Name: <ProfileItem handleChange={this.handleChange} valueToChange="last_name" item={this.state.last_name} /></div>                    
                    <div>Email: <ProfileItem handleChange={this.handleChange} valueToChange="email" item={this.state.email} /></div>
                    <div>Phone Number: <ProfileItem handleChange={this.handleChange} valueToChange="phone_number" item={this.state.phone_number} /></div>
                    <button type="submit">save</button>
                </form>
            </div>
        )
    }
}

const mapStatToProps = (reduxState) => {
    return { 
        user: reduxState.user,
     };
}

export default connect(mapStatToProps)(Profile);