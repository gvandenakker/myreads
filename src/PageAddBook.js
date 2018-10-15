// Todo: implement a hidden shelf for the add-book page.
// Todo: implement a comparison between the search results and the non-hidden shelves, so that a book that has been
// added won't be displayed in the search results.

import React, { Component } from 'react'
import { Link } from "react-router-dom"
import ListBooks from "./Books"
import * as BooksAPI from './BooksAPI'

class AddBook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '',
            searchBooks: []
        }
    }

    updateQuery = (query) => {
        this.setState({
            query: query.trim()
        })
        if (query) {
            BooksAPI.search(query, this.props.text.searchResultAmount).then(
                response => {
                    if (response.error) {
                        console.log('The following error occurred while retrieving search results: ' + response.error)
                        console.log('Resetting the search results.')
                        this.setState({
                            searchBooks: []
                        })
                    } else {
                        this.setState({
                            searchBooks: response
                        })
                    }
                },
                error => {
                    console.log('The following error occurred while retrieving search results: ' + error)
                }
            )
        } else {
            this.setState({
                searchBooks: []
            });
        }
    }

    render() {
        const { text, shelves, changeShelf} = this.props
        const { query, searchBooks } = this.state
        return (
            <div className = "search-books">
                <div className = "search-books-bar">
                    <Link className = "close-search" to="/">Close</Link>
                    <div className = "search-books-input-wrapper">
                        <input
                          placeholder = {text.searchTextAdd}
                          value = {query}
                          onChange = {(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        <ListBooks
                            books = {searchBooks}
                            shelves = {shelves}
                            changeShelf = {changeShelf}
                      />
                    </ol>
                </div>
            </div>
        )
    }
}

export default AddBook