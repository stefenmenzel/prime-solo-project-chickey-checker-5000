import React, {Component} from 'react';
import {TextField} from '@material-ui/core';
import './Profile.css';

class ProfileItem extends Component{

    render(){
        return(
            (this.props.isClicked) ?
                <TextField 
                    className="profileInput"
                    label={this.props.item}
                    onChange={(e) => {this.props.handleChange(this.props.valueToChange, e)}}
                />
                // <input placeholder={this.props.item} onChange={(e) => { this.props.handleChange(this.props.valueToChange, e) }} />            
            :
            <span>{(this.props.item) ? ` ${this.props.item}`: '*EMPTY*'}</span>
        )
    }
}

export default ProfileItem;