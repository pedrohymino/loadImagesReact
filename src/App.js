import React, { Component } from 'react';
// styles
import './index.scss';
// component
import Header from './components/Header';
//
import Main from './pages/main'

class APP extends Component {
  state = {
      img: []
  }

  updatePhotos = (list) => {
    this.setState({img: this.state.img.concat(list)});
  }

  render() { 
    return ( 
      <div className="App">
        <Header count={this.state.img.length}/>
        <div id="container">
          <Main callbackParent={(data) => this.updatePhotos(data)} />
        </div>
      </div>
     );
  } 
}      

export default APP;