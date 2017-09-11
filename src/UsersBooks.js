import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './App.css'
import AlRead from './AlRead'
import CurrRead from './CurrRead'
import WanRead from './WanRead'

class UsersBooks extends Component {
    static propTypes = {
        allBooks: PropTypes.array.isRequired,
        onUpdateShelf: PropTypes.func.isRequired
    }

    render() {
        const { allBooks, onUpdateShelf } = this.props
        
        let currReading = allBooks.filter((book) => "currentlyReading" == book.shelf)
        let wantToRead = allBooks.filter((book) => "wantToRead" == book.shelf)
        let alreadyRead = allBooks.filter((book) => "read" == book.shelf)
        
        //filterbooks(allBooks)
        
        return(  
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div>
                <CurrRead
                    books = {currReading}
                    onUpdateShelf={onUpdateShelf}
                />
                <WanRead
                    books = {wantToRead}
                    onUpdateShelf={onUpdateShelf}
                />
                <AlRead 
                    books = {alreadyRead}
                    onUpdateShelf={onUpdateShelf}
                />
            </div>
            <div className="open-search">
              <Link to='/addbook'>Add a book</Link>
            </div>
          </div>
       )
    }
}

export default UsersBooks