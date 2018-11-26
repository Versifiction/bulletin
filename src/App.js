import React, { Component } from 'react';

import datas from '../src/datas/bulletin';
import './App.css';
import Title from '../src/components/Title';
import Table from '../src/components/Table';

class App extends Component {
  constructor() {
    super();
    this.state = {
      datas: datas,
    };
  }
  render() {
    const { datas } = this.state;
    return (
      <div className="App">
        <Title />
        <Table datas={datas} />
      </div>
    );
  }
}

export default App;
