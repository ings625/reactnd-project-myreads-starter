import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'


class BooksApp extends React.Component {
  state = {
    books: [],
    searchBooks: []
  }
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        // console.log(books)
        this.setState(() => ({
          books: books
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
      .then(() => {
        this.setState((currentState) => {
          book.shelf = shelf
          return {
            books: currentState.books.concat([book])
          }
        })
      })
  }


  search = (searchQuery) => {
    // console.log(searchQuery)
    if (searchQuery === '') {
      this.setState(() => ({
        searchBooks: []
      }))
    } else {
    BooksAPI.search(searchQuery)
      .then((searchBooks) => {
        // console.log(searchBooks)
        if (searchBooks.error) {
          this.setState(() => ({
            searchBooks: []
          }))
        } else {
          this.setState(() => {
            const results = searchBooks.filter((b) => b.imageLinks)
            results.map((r) => {
              const existingBook = this.state.books.find((bo) => bo.id === r.id)
              if (existingBook) {
                r.shelf = existingBook.shelf
              }
              return r
            })
            return {
              searchBooks: results
            }
          })
        }
      })
    }
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
            results={this.state.searchBooks}
            onAddBook={this.addBook}
            onSearch={this.search}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
