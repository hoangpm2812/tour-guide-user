import React, { Component } from 'react';
import spinner from './ccby.svg';
import './Spinner.css';

class Spinner extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }
 
  render() {
      return (
          this.state.loading ? (
            <div className='backdropSpinner'>
              <img src={spinner} />
            </div>
          ) : null
      );
  }

  showLoading = (enable) => {
    this.setState({
      loading: enable
    })
  }
}

export default Spinner;
