import React, { Component } from 'react';
import SearchResult from './SearchResult';
import Header from './Header';
import LeftNavigation from './LeftNavigation';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: "",
      myData: [],
      loadingImage: false,
    }
  }

  setInputValue = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }

  displaySearchResult = () => {
    this.setState({loadingImage:true})
    fetch('https://openlibrary.org/search.json?q=' + this.state.inputValue)
    .then(response => response.json())
    .then(docs => docs.docs)
    .then(sliced => sliced.slice(0,20))
    .then(myData => this.setState({
      myData: myData, 
      loadingImage:false
    }))
  }

  render() {
    return (
      <div className="App">
        <Header setInputValue={this.setInputValue} buttonClick={this.displaySearchResult} />
        <div className="recent-results">
          <LeftNavigation />
          <SearchResult myData={this.state.myData} loadingImage={this.state.loadingImage} />
        </div>
      </div>
    );
  }
}

export default App;
