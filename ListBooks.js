import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import './App.css'

/**
  * @Renders the component of the search page which renders a go back buttom and a
     list of books from the backend api based on the query search
  * @return {object} : Search page
*/

class ListBooks extends Component {
    
    /**
        * @Uses the proptypes to save and require a func from the parent component
    */
    static propTypes = {
        addFromSearch: PropTypes.func.isRequired
    }
    
    state = {
        books: []
    }
    
    /**
        * @Updates the state of the searched books result based on the backened server and comparing it with the allBooks the users myReadings
        * @param {string} query - The query search
    */
    updateSearch = (query) => {
        if(query.trim().length !== 0){
        
        BooksAPI.search(query.trim()).then((books) => {
                if (books === undefined || books.error) {
                          this.setState(currState =>
                                       ({books: []}))
                } else {    
                      function  syncBook(book){
                        newArray: books.map((b) => { return b.id === book.id ? (b.shelf = book.shelf, b) : b})
                      }
                        this.props.allBooks.forEach(syncBook)
                        this.setState({ books })
                }})
       }
    }
    
    /**
        * @Changing the searched books result in the state to the new state and updating in the backened server the result
        * @param {string} bookToUpdate - The book that need to be updated from the search result
        * @param {string} shelf - The shelf to be updated to
    */
    updateBooks = (bookToUpdate, shelf) => {
        BooksAPI.update(bookToUpdate, shelf).then((books) => { 
            this.props.addFromSearch()
        })
    }

    render() {
        
        const { books } = this.state

        
        
        return (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                  <input type="text" placeholder="Search by title or author" value={this.state.query} onChange= {(event) => {this.updateSearch(event.target.value.trim())}} 
              />
                
              </div>
                </div>
                    <div className="search-books-results">
                        <ol className="books-grid">
                            <Book
                             books={books}
                             onUpdateShelf={this.updateBooks}
                            />
                        </ol>
                    </div>
                </div>
            )
        }
    }

export default ListBooks