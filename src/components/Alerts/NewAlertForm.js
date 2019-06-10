import React, {Component} from 'react';
import {connect} from 'react-redux';

import {TextField, MenuItem, Checkbox, Grid, Button} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

const style = theme => ({
    ccForm: {
        width: '75%',
        marginTop:'10%',
        // margin: '20px auto',        
        // padding: '25px',
        borderRadius: '20px',
        // color: "primary",
        borderStyle: 'solid',
        borderColor: theme.palette.primary.main,
        backgroundColor: '#e3f2fd',
    },

    ccTextField: {
        width: '40%',
        marginRight:'20px'
    },

    ccFormGrid:{
        marginLeft:'auto'
    }
})

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
        this.props.history.push('/alerts');
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
                console.log('sensor metric', sensor.metric)
                return <MenuItem color="primary" key={sensor.id} value={sensor.id}>{sensor.metric}</MenuItem>
            }) :
            'EMPTY'
        )
    }

    conditionalPhoneCheckBox = () => {
        return(
            (this.props.user.phone_number) ?
            <>
                <label htmlFor="phone">text</label>
                <Checkbox 
                    checked={this.state.phone}
                    onChange={() => this.handleCheck('phone')}
                    id="phone"
                    color="primary"
                />
                {/* <input id="phone" type="checkbox" checked={this.state.phone} onChange={() => this.handleCheck('phone')} /> */}
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
            <Grid container justify="center">
                <Grid item xs={12}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={10} className={this.props.classes.ccFormGrid}>                        
                        <form onSubmit={this.handleSubmit} className={this.props.classes.ccForm}>
                            <div className="cc5FormInner">
                                <h2>New Alert</h2>
                                <TextField
                                    id="sensorToCheck"
                                    select
                                    label="Sensor"
                                    value={this.state.sensor}
                                    onChange={(e) => this.handleChange('sensor', e)}
                                    variant="outlined"
                                    margin="normal"
                                    className={this.props.classes.ccTextField}
                                >
                                    {this.conditionalSensorOptions()}
                                </TextField>
                                {/* <label htmlFor="sensorToCheck">Sensor</label>
                    <select id='sensorToCheck' value={this.state.sensor} onChange={(e) => this.handleChange('sensor', e)}>
                        {this.conditionalSensorOptions()}                        
                    </select> */}
                                {/* <input onChange={(e) => this.handleChange('sensor', e)} placeholder="Alert Sensor" /> */}
                                <div>
                                    <TextField
                                        id="condition"
                                        select
                                        label="Condition"
                                        value={this.state.condition}
                                        onChange={(e) => this.handleChange('condition', e)}
                                        variant="outlined"
                                        margin="normal"
                                        className={this.props.classes.ccTextField}
                                    >
                                        <MenuItem value='<'>Less Than</MenuItem>
                                        <MenuItem value='>'>Greater Than</MenuItem>
                                        <MenuItem value='<='>Less Than or Equal To</MenuItem>
                                        <MenuItem value='>='>Greater Than or Equal To</MenuItem>
                                    </TextField>
                                    {/* <label htmlFor="condition">Condition</label>
                        <select id="condition" value={this.state.condition} onChange={(e) => this.handleChange('condition', e)}>
                            <option value='<' label='Less Than'/>
                            <option value='>' label='Greater Than' />
                            <option value='<=' label='Less Than or Equal To' />
                            <option value='>=' label='Greater Than or Equal To' />
                        </select> */}
                                    {/* <input onChange={(e) => this.handleChange('condition', e)} placeholder="condition" /> */}
                                    <TextField
                                        id="value"
                                        label="value"
                                        type="number"
                                        margin="normal"
                                        variant="outlined"
                                        onChange={(e) => this.handleChange('value', e)}
                                        className={this.props.classes.ccTextField}
                                        inputProps={{
                                            step: "0.01"
                                        }}
                                    />
                                    {/* <label htmlFor="value">Value</label>
                        <input id="value" type='number' step="0.01" onChange={(e) => this.handleChange('value', e)} placeholder="value" /> */}
                                </div>
                                <div>
                                    <label>Contact Method</label>
                                    <br />
                                    <label htmlFor='email'>email</label>
                                    <Checkbox
                                        checked={this.state.email}
                                        onChange={() => this.handleCheck('email')}
                                        value={this.props.user.email}
                                        color="primary"
                                    />
                                    {/* <input id="email" type="checkbox" checked={this.state.email} onChange={() => this.handleCheck('email')} value={this.props.user.email} /> */}
                                    {this.conditionalPhoneCheckBox()}
                                </div>
                                {/* <select id='method' onChange={(e) => this.handleChange('method', e)} value={this.state.method}>
                        {this.conditionalMethods()}
                    </select>                     */}
                                {/* <input onChange={(e) => this.handleChange('method', e)} placeholder="method" /> */}
                                <Button variant="contained" color="primary" type="submit">Add Alert</Button>
                            </div>                            
                        </form>
                    </Grid>
                </Grid>                
            </Grid>                
        )
    }
}

const mapStateToProps = (reduxState) => {
    return { 
        sensors: reduxState.sensors,
        user: reduxState.user,
     };
}

const connectedNewAlertForm = connect(mapStateToProps)(NewAlertForm);

// export default connect(mapStateToProps)(NewAlertForm);
export default withStyles(style)(connectedNewAlertForm);