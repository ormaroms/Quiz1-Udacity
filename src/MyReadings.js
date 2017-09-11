import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Shelf from './Shelf'
import './App.css'

/**
  * @Renders the component of the reading's shelfs of the user
  * @return {object} : MyReading 
*/
class MyReadings extends Component {
    
     /**
        * @Uses the proptypes to save and require a array of the shelfs of the users list and a func to use in case of an update from the parent component
    */
    static propTypes = {
        allBooks: PropTypes.array.isRequired,
        onUpdateShelf: PropTypes.func.isRequired
    }

    state = {
    allBooks: []
    }

    render() {
        /** saves the recived props in consts from the parent component*/
        const { allBooks, onUpdateShelf } = this.props
        
        return(  
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div>
                <Shelf
                    title = 'Currently Reading'
                    books = {allBooks.filter((book) => "currentlyReading" === book.shelf)}
                    onUpdateShelf={onUpdateShelf}
                />
                <Shelf
                    title = 'Want To Read'
                    books = {allBooks.filter((book) => "wantToRead" === book.shelf)}
                    onUpdateShelf={onUpdateShelf}
                />
                <Shelf 
                    title = 'Read'
                    books = {allBooks.filter((book) => "read" === book.shelf)}
                    onUpdateShelf={onUpdateShelf}
                />
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
       )
    }
}

export default MyReadings