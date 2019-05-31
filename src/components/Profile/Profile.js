import React, {Component} from 'react';
import {connect} from 'react-redux';

class Profile extends Component{

    state = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',

        firstNameEdit: '',
        lastNameEdit: '',
        emailEdit: '',
        areaCodeEdit: '',
        phoneNumberEdit: '',
    }

    componentDidMount(){
        this.setState({
            ...this.state,
            firstName: this.props.user.first_name,
            lastName: this.props.user.last_name,
            email: this.props.user.email,
            phoneNumber: this.props.user.phone_number
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('saving profile');
    }

    handleClick = (propertyToEdit, event) => {
        console.log('doing a thing');
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
                    <h3 onClick={(e) => this.handleClick('firstName', e)}>First name: {this.state.firstName}</h3>
                    {/* <input placeholder="first name" /> */}
                    <h3>Last name: {this.state.lastName}</h3>
                    {/* <input placeholder="last name" /> */}
                    <h3>Email address: {this.state.email}</h3>
                    {/* <input placeholder="email" /> */}
                    <h3>Phone Number: {this.state.phoneNumber}</h3>
                    {/* <input placeholder="area code" /> */}                    
                    {/* <input placeholder="phone number" /> */}
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