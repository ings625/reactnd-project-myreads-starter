import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'


class SearchBooks extends Component {

	render() {
		const { results, onAddBook, onSearch, onClearResults } = this.props

		return (
          <div className="search-books">
            <div className="search-books-bar">
            <Link to="/">
              <button onClick={() => onClearResults()} className="close-search">Close</button>
              </Link>
              <div className="search-books-input-wrapper">
                <input onChange={(event) => onSearch(event.target.value)} type="text" placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {results.map((book) => (
                  <li key={book.id}>
                    <Book book={book} onUpdateBook={onAddBook} />
                  </li>
                ))}   
              </ol>
            </div>
          </div>
        )
	}

}

export default SearchBooks