import React, {Component} from 'react'
import {connect} from 'react-redux';

class AlertItem extends Component{

    handleDelete = (idToDelete) => {
        console.log('do some alert deleting here');
        if(!window.confirm("Are you sure you want to delete this alert")){
            return;
        }
        console.log('doing a delete boss');
        this.props.dispatch({type: 'DELETE_ALERT', payload: {id: idToDelete}});
    }

    toggleActive = (idToToggle) => {
        console.log('toggle alert');
        this.props.dispatch({type: 'TOGGLE_ALERT', payload: {id: idToToggle}});
    }

    conditionToString = (condition) => {
        switch (this.props.alert.condition) {
            case '<':
                return 'Less Than';
            case '>':
                return 'Greater Than';
            case '<=':
                return 'Less Than or Equal to';
            case '>=':
                return 'Greater Than or Equal to';
        
            default:
                return condition;
        }
    }

    methodsToString = (email, phone) => {
        if( email && phone){
            return `${this.props.user.email} + ${this.props.user.phone_number}`;
        }
        else if(email && !phone){
            return `${this.props.user.email}`;
        }
        else if(!email && phone){
            return `${this.props.user.phone_number}`
        }
    }

    render(){
        console.log('this.props.alerts', this.props.alert);
        return(
            <tr>
                <td>{this.props.alert.metric}</td>
                <td>{this.conditionToString(this.props.alert.condition)} {this.props.alert.value}</td>
                <td>{this.methodsToString(this.props.alert.email, this.props.alert.phone)}</td>
                <td><input type="checkbox" checked={this.props.alert.active} onChange={() => this.toggleActive(this.props.alert.id)} /></td>
                {/* <td>{this.props.alert.active}</td> */}
                <td><button onClick={() => this.handleDelete(this.props.alert.id)}>X</button></td>
            </tr>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {user: reduxState.user};
}

export default connect(mapStateToProps)(AlertItem);