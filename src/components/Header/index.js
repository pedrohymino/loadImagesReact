import React, { Component } from 'react';
// style
import './style.scss';

class Header extends Component{

    componentDidMount(){
        
    }

    render(){
        // const { img } = this.state;
        return(
            <header>
                <h1>Challange</h1>
                <p>Images loaded: {this.props.count}</p>
            </header>
        );
    }
}


export default Header;