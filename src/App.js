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
      addBook: false,
      myBooks: [],
      myBooksClicked: true, 
    }
  }

  componentDidMount = () => {
    const searchList= JSON.parse(localStorage.getItem('searchList'));
    const booksAdded= JSON.parse(localStorage.getItem('addedBook'));
    
    if (searchList === null) {
      this.setState({
        recentSearchList: this.state.recentSearchList
      })
    } else {
      this.setState({
        recentSearchList: searchList
      })
    }

    if (booksAdded === null) {
      this.setState({
        myBooks: this.state.myBooks
      })
    } else {
      this.setState({
        myBooks: booksAdded
      })
    }

  }

  setInputValue = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }

  setRecentSearchListToLocalStorage = (recentSearchList) => {
    localStorage.setItem('searchList',JSON.stringify(recentSearchList))
  } 

  setBooksToLocalStorage = (addedBook) => {
    localStorage.setItem('addedBook',JSON.stringify(addedBook))
  }

  addBookClickHandler = (book) => {
    this.setState({
      addBook: true,
      myBooks: this.state.myBooks.concat(book)
    },() => console.log(this.state.myBooks))
    setTimeout(() => this.setState({addBook: false}), 3000)
  }

  myBooksClickHandler = () => {
    this.setState({
      myBooksClicked: true
    },() => this.setBooksToLocalStorage(this.state.myBooks))
  }

  searchClick = () => {
    this.setState({
      recentSearchList: this.state.recentSearchList.concat(this.state.inputValue),
    },() => this.setRecentSearchListToLocalStorage(this.state.recentSearchList));
    this.fetchData();
  }

  recentResultClick = (book) => {
    this.setState({
      inputValue: book
    }, this.fetchData)
  }

  fetchData = () => {
    this.setState({
      loadingImage: true,
      myBooksClicked: false,
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
    const books = (this.state.myBooksClicked === true) ? this.state.myBooks : this.state.myData
    return (
      <div className="App">
        <Header setInputValue={this.setInputValue} buttonClick={this.searchClick} />
        <div className="recent-results">
          <LeftNavigation recentSearchList={this.state.recentSearchList} recentResultClick={this.recentResultClick} searchList={this.searchList} />
          <div className="my-books" onClick={this.myBooksClickHandler}>MY BOOKS </div>
          <SearchResult myData={books} loadingImage={this.state.loadingImage} addBookClickHandler={this.addBookClickHandler} 
            myBooksClicked={this.state.myBooksClicked} />
        <div className="bottom-book-added">
          {this.state.addBook === true ? "Book Added To Library" : null}
        </div>
        </div>
      </div>
    );
  }
}

export default App;
