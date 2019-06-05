import React, {Component} from 'react';

class ProfileItem extends Component{

    render(){
        return(
            (this.props.isClicked) ?            
                <input placeholder={this.props.item} onChange={(e) => { this.props.handleChange(this.props.valueToChange, e) }} />            
            :
            <span onClick={this.props.toggleInput}>{(this.props.item) ? this.props.item: '*EMPTY*'}</span>
        )
    }
}

export default ProfileItem;