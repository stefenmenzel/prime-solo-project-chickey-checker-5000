import React, {Component} from 'react';
import {connect} from 'react-redux';

class NewAlertForm extends Component{

    render(){
        return(
            <div>Ye havest foundeth thee new alert form page</div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return { reduxState };
}

export default connect(mapStateToProps)(NewAlertForm);