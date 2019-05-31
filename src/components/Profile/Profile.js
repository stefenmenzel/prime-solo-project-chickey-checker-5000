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

    /* So meyer did a cool thing with conditionally rendering <h3>'s as input fields....so
        first you set the <h3> to like...<h3>{this.state.firstName}</h3> or whatever....then
        onclick you set firstName to something like <input onchange={handleChange} /> or soemthing
        this will all be in a form so when you click enter it will submit which will change the props
        and reset state and re-render...it's great*/
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