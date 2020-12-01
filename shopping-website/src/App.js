import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FilteredList from "./FilteredList";
import products from "./products";


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <h1>
          <div className="title">The Pro-fresh-inal Market </div>
        </h1>
        <div className="filter-and-sort">
        <FilteredList products = {products} > </FilteredList>
        </div>
      </div>
    );
  }

 
}

export default App;
