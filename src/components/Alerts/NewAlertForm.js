import React, {Component} from 'react';
import {connect} from 'react-redux';

class NewAlertForm extends Component{

    state = {
        sensor: '',
        condition: '',
        value:'',
        method:''
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("submit event");
    }

    handleChange = (propertyToChange, event) =>{
        this.setState({
            ...this.state,
            [propertyToChange]: event.target.value
        });
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={(e) => this.handleChange('sensor', e)} placeholder="Alert Sensor" />
                    <input onChange={(e) => this.handleChange('condition', e)} placeholder="condition" />
                    <input onChange={(e) => this.handleChange('value', e)} placeholder="value" />
                    <input onChange={(e) => this.handleChange('method', e)} placeholder="method" />
                    <button type="submit">Add Alert</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return { reduxState };
}

export default connect(mapStateToProps)(NewAlertForm);