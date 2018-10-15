import React, { Component } from 'react'
import ChangeShelves from './ChangeShelves'

class ListBooks extends Component {
    render() {
        const { books, shelves, changeShelf } = this.props

        return(
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book) => (
                        <li
                            key={book.id}
                        >
                            <div className='book'>
                                <div className="book-top">
                                    <div className="book-cover" style={{
                                        width: '100%',
                                        height: '100%',
                                        backgroundImage: 'url("' + book.imageLinks.thumbnail + '")'
                                    }}/>
                                    <ChangeShelves
                                        book={book}
                                        shelves={shelves}
                                        changeShelf = {changeShelf}
                                    />
                                </div>
                                <div className="book-title">{book.title}</div>
                                {book.authors ?
                                    Object.entries(book.authors).map(([key, value]) => {
                                        return  <div
                                            className='book-author'
                                            key={key}
                                        >{value}</div>
                                    }) : <div/>
                                }
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        )
    }
}

export default ListBooks