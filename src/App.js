import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import MyReadings from './MyReadings'
import ListBooks from './ListBooks'

/**
  * @Renders the component App who is responsible of the of the book application including the search page and the myReading's shelfs
  * @return {object} : Application page
*/
class BooksApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allBooks: []
    };
    this.updateShelf = this.updateShelf.bind(this);
  }

  /**
    * @Calling he GetAllBooks to initialize the state
  */
  componentDidMount(){
      this.getAllBooks()
  }
  
  /**
    * @Updating the state with the current myReading's shelfs of the current user
  */
  getAllBooks() {
      BooksAPI.getAll().then((allBooks) => {        
          this.setState({ allBooks })
      })
  }

  /**
    * @Loading the new shelf from the backened server after updating in the search page
  */
  addFromSearch = () => {
      this.getAllBooks()
  }

  /**
        * @Changing the myReadings shelfs based of the users wishes of shelf parameter
        * @param {string} book - The book that need to be updated from the change of shelfs
        * @param {string} shelf - The shelf to be updated to
  */
  updateShelf = (book, shelf) => {
      BooksAPI.update(book,shelf).then(books => {
        if (book.shelf === 'none') this.setState(currState => ({
        allBooks: currState.allBooks.filter(specBook => specBook.id !== book.id)
      })); else this.setState(currState => {        
         currState.allBooks.find(b => b.id === book.id).shelf = shelf
      })})     
  }

  render() {
      
    return (
        
      <div className="app">  
          <Route exact path='/' render={() => (
          <MyReadings
                allBooks={this.state.allBooks}
                onUpdateShelf={this.updateShelf}
            />
        )}/>
        <Route path='/search' render={({ history }) => (
          <ListBooks
            allBooks={this.state.allBooks}
            addFromSearch={this.addFromSearch}
            onUpdateShelf={this.updateShelf}
            />
        )}/>
      </div>
    )
  }
}

export default BooksApp