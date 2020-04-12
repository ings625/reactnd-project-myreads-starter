import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from'./BookShelf'


class ListBooks extends Component {



	render() {
		const shelves = [{
			name: "Currently Reading",
			shelf: 'currentlyReading'
		},{
			name: "Read",
			shelf: 'read'
		},{
			name: "Want to Read",
			shelf: 'wantToRead'
		}
		]
		return (
 		<div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
              {shelves.map((shelf) => (
              		<BookShelf key={shelf.shelf} name={shelf.name} books={this.props.books.filter(book => book.shelf === `${shelf.shelf}`)} />
              	))}
              </div>
            <div className="open-search">
            	<Link to="/search">
              	<button>Add a book</button>
              </Link>
            </div>
          </div>
          </div>
        )
	}

}

export default ListBooks