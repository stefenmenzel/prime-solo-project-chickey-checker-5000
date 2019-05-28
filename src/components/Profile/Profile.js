import React, {Component} from 'react';
import {connect} from 'react-redux';

class Profile extends Component{

    render(){
        return(
            <div>Yee bee een thee Profeel peege</div>
        )
    }
}

const mapStatToProps = (reduxState) => {
    return { reduxState };
}

export default connect(mapStatToProps)(Profile);