import React, { Component } from 'react';
import SearchResult from './SearchResult';
import Header from './Header';
import LeftNavigation from './LeftNavigation';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      myData: [],
      loadingImage: false,
      recentSearchList: [],
    }
  }

  setInputValue = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }

  recentResultClick = (book) => {
    this.setState({
      inputValue: book
    }, this.fetchData)
  }

  setToLocalStorage = (recentSearchList) => {
    localStorage.setItem('searchList',JSON.stringify(recentSearchList))
  }

  componentDidMount = () => {
    const searchList= JSON.parse(localStorage.getItem('searchList'));
    if (searchList === null) {
      this.setState({
        recentSearchList: this.state.recentSearchList
      })
    } else {
      this.setState({
        recentSearchList: searchList
      })
    }
  } 

  searchClick = () => {
    this.setState({
      recentSearchList: this.state.recentSearchList.concat(this.state.inputValue),
    },() => this.setToLocalStorage(this.state.recentSearchList));
    this.fetchData();
  }

  fetchData = () => {
    this.setState({
      loadingImage: true,
    })
    fetch('https://openlibrary.org/search.json?q=' + this.state.inputValue)
    .then(response => response.json())
    .then(docs => docs.docs)
    .then(sliced => sliced.slice(0,20))
    .then(myData => this.setState({
      myData: myData, 
      loadingImage: false,
    }))
  }

  render() {
    return (
      <div className="App">
        <Header setInputValue={this.setInputValue} buttonClick={this.searchClick} />
        <div className="recent-results">
          <LeftNavigation recentSearchList={this.state.recentSearchList} recentResultClick={this.recentResultClick} searchList={this.searchList} />
          <SearchResult myData={this.state.myData} loadingImage={this.state.loadingImage} />
        </div>
      </div>
    );
  }
}

export default App;
