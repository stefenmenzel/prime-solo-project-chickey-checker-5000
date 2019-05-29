import React, {Component} from 'react'

class AlertItem extends Component{

    handleDelete = (idToDelete) => {
        console.log('do some alert deleting here');
    }

    render(){
        return(
            <tr>
                <td>{this.props.alert.metric}</td>
                <td>{`${this.props.alert.condition} ${this.props.alert.value}`}</td>
                <td>{this.props.alert.method}</td>
                <td>{this.props.alert.active}</td>
                <td><button onClick={() => this.handleDelete(this.props.alert.id)}>X</button></td>
            </tr>
        )
    }
}

export default AlertItem;