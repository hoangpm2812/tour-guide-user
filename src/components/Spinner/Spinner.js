import React, { Component } from 'react';
// import styles from './spinner.sass'
import spinner from './Facebook.svg';
import './spinner.css';

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
