import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Book from './Book'
import './App.css'

/**
  * @Renders the component of a shelf of the categorized reading status
  * @return {object} : Shelf
*/
class Shelf extends Component {
    
     /**
        * @Uses the proptypes to save and require a title, books list of the current shelf and a updated func in case of an update from the parent component
    */
    static propTypes = {
        title: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        onUpdateShelf: PropTypes.func.isRequired
    }
    
    render() {
        
        /** saves the recived props in consts from the parent component*/
        const { title, books, onUpdateShelf } = this.props
        
        return(
                <div className="bookshelf">
                  <h2 className="bookshelf-title">{title}</h2>
                  <div className="bookshelf-books">
                    <Book
                        books={books}
                        onUpdateShelf={onUpdateShelf}
                    />
                  </div>
                </div>
        )
    }
}

export default Shelf