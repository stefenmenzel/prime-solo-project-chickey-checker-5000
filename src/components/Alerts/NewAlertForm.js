import React, {Component} from 'react';
import {connect} from 'react-redux';

class NewAlertForm extends Component{

    state = {
        sensor: 1,        
        condition: '<',
        value:'0',
        email: true,
        phone: false,
        user: this.props.user.id
    }

    componentDidMount(){
        this.props.dispatch({ type:'FETCH_SENSORS'});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(!this.state.email && !this.state.phone){
            alert('you must pick either a text, email, or both');
            return;
        }
        this.props.dispatch({type:'ADD_ALERT', payload:this.state})
        console.log("submit event");
    }

    handleChange = (propertyToChange, event) =>{
        if(propertyToChange === 'method'){            
            this.setState({
                ...this.state,
                method:{
                    ...this.state.method
                }
            })
        }
        this.setState({
            ...this.state,
            [propertyToChange]: event.target.value
        });
    }

    handleCheck = (propertyToChange, event) => {
        let value = false;
        if(propertyToChange === 'email'){            
            if(!this.state.email){
                value = true
            }
            this.setState({
                ...this.state,
                email: value
            })
        }
        else if(propertyToChange === 'phone'){
            if(!this.state.phone){
                value = true
            }
            this.setState({
                ...this.state,
                phone: value
            })
        }
    }

    conditionalSensorOptions = () => {
        return(
            (this.props.sensors.length) ?
            this.props.sensors.map(sensor => {
                return <option key={sensor.id} value={sensor.id} label={sensor.metric} />
            }) :
            ''
        )
    }

    conditionalPhoneCheckBox = () => {
        return(
            (this.props.user.phone_number) ?
            <>
                <label htmlFor="phone">text</label>
                <input id="phone" type="checkbox" checked={this.state.phone} onChange={() => this.handleCheck('phone')} />
            </>
            :
            ''
        )
    }

    render(){
        console.log('this.state:', this.state);
        console.log('this.props.sensors:', this.props.sensors);
        console.log('this.props.user:', this.props.user);
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="sensorToCheck">Sensor</label>
                    <select id='sensorToCheck' value={this.state.sensor} onChange={(e) => this.handleChange('sensor', e)}>
                        {this.conditionalSensorOptions()}                        
                    </select>
                    {/* <input onChange={(e) => this.handleChange('sensor', e)} placeholder="Alert Sensor" /> */}
                    <div>
                        <label htmlFor="condition">Condition</label>
                        <select id="condition" value={this.state.condition} onChange={(e) => this.handleChange('condition', e)}>
                            <option value='<' label='Less Than'/>
                            <option value='>' label='Greater Than' />
                            <option value='<=' label='Less Than or Equal To' />
                            <option value='>=' label='Greater Than or Equal To' />
                        </select>
                        {/* <input onChange={(e) => this.handleChange('condition', e)} placeholder="condition" /> */}
                        <label htmlFor="value">Value</label>
                        <input id="value" type='number' step="0.01" onChange={(e) => this.handleChange('value', e)} placeholder="value" />
                    </div>
                    <div>
                        <label>Contact Method</label>
                        <br />
                        <label htmlFor='email'>email</label>
                        <input id="email" type="checkbox" checked={this.state.email} onChange={() => this.handleCheck('email')} value={this.props.user.email} />
                        {this.conditionalPhoneCheckBox()}
                    </div>                    
                    {/* <select id='method' onChange={(e) => this.handleChange('method', e)} value={this.state.method}>
                        {this.conditionalMethods()}
                    </select>                     */}
                    {/* <input onChange={(e) => this.handleChange('method', e)} placeholder="method" /> */}
                    <button type="submit">Add Alert</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return { 
        sensors: reduxState.sensors,
        user: reduxState.user,
     };
}

export default connect(mapStateToProps)(NewAlertForm);