import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ListShelves from "./Shelves";
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class Main extends Component {
    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }

    clearQuery = () => {
        this.setState({ query: '' })
    }

    render() {
        const { text, shelves, books, shelvesNew, booksNew, changeShelf } = this.props
        const { query } = this.state

        console.log(books)
        console.log(booksNew)
        console.log(shelves)
        console.log(shelvesNew)

        let showingBooks
        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i')
            showingBooks = books.filter((book) => match.test(book.title))
        } else {
            showingBooks = books
        }

        let showingShelves
        if (query) {
            showingShelves = shelves.filter(function(o1){
                return showingBooks.some(function(o2){
                    return o1.id === o2.shelf
                })
            })
        } else {
            showingShelves = shelves
        }

        showingBooks.sort(sortBy('name'))

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>{text.title}</h1>
                    <input
                        placeholder={text.searchText}
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                    {showingBooks.length !== books.length && (
                        <div className='showing-books'>
                            <span>{text.searchResultText.replace('$0', showingBooks.length).replace('$1', books.length)}</span>
                            <button onClick={this.clearQuery}>Show all</button>
                        </div>
                    )}
                </div>
                <ListShelves
                    shelves = {showingShelves}
                    books = {showingBooks}
                    changeShelf = {changeShelf}
                />
                <Link
                    to='/addbook'
                    className="open-search"
                >
                    <div className="open-search">
                    <p>Add a book</p>
                    </div>
                </Link>
            </div>
        )
    }
}

export default Main