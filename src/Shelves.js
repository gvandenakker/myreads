import React, { Component } from 'react'
import ListBooks from './Books'


class ListShelves extends Component {
    render() {
        const { shelves, books, changeShelf } = this.props

        return(
            <div className="list-books-content">
                { shelves.map((shelf) => (
                    <div
                        key={shelf.id}
                        className="bookshelf"
                    >
                        <h2>{shelf.title}</h2>
                        <ListBooks
                            books={books.filter(book => book.shelf === shelf.id)}
                            shelves={shelves}
                            changeShelf = {changeShelf}
                        />
                    </div>
                ))}
            </div>
        )
    }
}

export default ListShelves