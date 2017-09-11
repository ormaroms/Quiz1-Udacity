import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './App.css'

/**
  * @Renders the component of a book with the book's details
  * @return {object} : Book
*/
class Book extends Component {
    
    /**
        * @Uses the proptypes to save and require a books list of the current shelf and an updated func in case of an update from the parent component
    */
    static propTypes = {
        books: PropTypes.array.isRequired,
        onUpdateShelf: PropTypes.func,
        searchInBooks: PropTypes.func
    }
    
    render() {
        
        /** saves the recived props in consts from the parent component*/
        const { books, onUpdateShelf } = this.props

        return(
                    <ol className="books-grid">
                      {books.map((book) => (
                      <li key={book.id} className="books-grid li">
                        <div className="book">
                          <div className="book-top">
                            {
                                (book.imageLinks)
                                    ? <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${book.imageLinks.smallThumbnail})` }}></div>
                                    : <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(https://www.jordans.com/~/media/jordans%20redesign/no-image-found.ashx?h=275&la=en&w=275&hash=F87BC23F17E37D57E2A0B1CC6E2E3EEE312AAD5B)` }}></div>
                            }
                            <div className="book-shelf-changer">
                              <select defaultValue={(book.shelf) ? book.shelf : "none"} onChange={event => onUpdateShelf(book, event.target.value)}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading" >Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                           <div className="book-authors">{book.authors}</div>
                        </div>
                      </li>
                        ))}
                    </ol>
        )
    }
}

export default Book