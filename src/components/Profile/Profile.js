import React, {Component} from 'react';
import {connect} from 'react-redux';

class Profile extends Component{

    state = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('saving profile');
    }

    render(){
        return(
            <div>
                <h1>Profile</h1>
                <form onSubmit={this.handleSubmit}>
                    <input placeholder="first name" />
                    <input placeholder="last name" />
                    <input placeholder="email" />
                    <input placeholder="area code" />
                    <input placeholder="phone number" />
                    <button type="submit">save</button>
                </form>
            </div>
        )
    }
}

const mapStatToProps = (reduxState) => {
    return { reduxState };
}

export default connect(mapStatToProps)(Profile);