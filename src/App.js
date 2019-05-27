import React, { Component } from 'react';
import './App.css';
import Table from './components/table/Table'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }
  
  }

  render() {
    return (
      <div className="container">
        <h1>Tasklist</h1> 
        <div className="flex-row">
          <div>
            <Table />          
          </div>
        </div>
      </div>
    );
  }
}

export default App;
