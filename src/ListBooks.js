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
        books: [],
        query: '',
        options: ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']
    }
    
    /**
        * @Updates the query with a new string
        * @param {string} query - The query search
    */
    updateQuery = (query) => {
        if (query !== this.state.query) {
            this.setState({ query: query.trim() }, function() {this.updateSearch()})
        }
    }
    
    /**
        * @Updates the state of the searched books result based on the backened server and comparing it with the allBooks the users myReadings
        * @param {string} query - The query search
    */
   updateSearch = () => {
       if(this.state.options.indexOf(this.state.query) > - 1) {
        BooksAPI.search(this.state.query).then((books) => {
            if (books === undefined || books.error) {
                      this.setState(currState =>
                                   ({books: []}))
            } else {    
                  function  checkExcist(book){
                    filteredBooks: books.map((b) => { return b.id === book.id ? (b.shelf = book.shelf, b) : b})
                  }
                    this.props.allBooks.forEach(checkExcist)
                    this.setState({ books })
            }})
       } else {
           this.setState(currState =>
                             ({books: []}))
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
        
        const { books, query } = this.state

        return (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                  <input type="text" placeholder="Search by title or author" value={query} onChange= {(event) => {this.updateQuery(event.target.value.trim())}} 
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