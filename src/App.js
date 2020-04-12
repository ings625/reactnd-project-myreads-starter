import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'


class BooksApp extends React.Component {
  state = {
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        // console.log(books)
        this.setState(() => ({
          books
        }))
      })
  }


  updateBook = (book,shelf) => {
    BooksAPI.update(book,shelf)
      .then(() => {
        this.setState((currentState) => {
          const newState = currentState.books.map((bookIter) => {
            if (book.id === bookIter.id) {
              const newBook = Object.assign({},bookIter)
              newBook.shelf = shelf
              return newBook
            } else {
              return bookIter
            }
          });
          return {
            books: newState
          }
        })
      })
  }

  addBook = (book,shelf) => {
    BooksAPI.update(book,shelf)
      .then((book) => {
        this.setState((currentState) => ({
          books: currentState.books.concat([book])
        }))
      })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.books}
            onUpdateBook={this.updateBook}
          />
        )} />
        <Route path='/search' render={() => (
          <SearchBooks
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
