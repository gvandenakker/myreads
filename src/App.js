import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import * as DefaultData from './DefaultData'
import Main from './PageMain'
import AddBook from './PageAddBook'
import './App.css'


class BooksApp extends React.Component {
    state = {
        shelves: [],
        books: []
    }

    componentDidMount(){
        BooksAPI.getAll().then((books) => {
            this.setState({ books})
        })
    }

    changeShelf = (book, newShelf) => {
        BooksAPI.update(book, newShelf).then(() => {
            book.shelf = newShelf
            this.setState(state => ({
                books: state.books.filter(b => b.id !== book.id).concat([ book ])
            }))
        })
    }

    render() {
        return (
            <BrowserRouter>
                <div className={"app"}>
                    <Route exact path='/' render={() => (
                        <Main
                            text = {DefaultData.defaultText}
                            shelves = {DefaultData.defaultShelves}
                            books = {this.state.books}
                            shelvesNew = {this.state.shelves}
                            booksNew = {DefaultData.defaultBooks}
                            changeShelf = {this.changeShelf}
                        />
                    )}/>
                    <Route exact path='/addbook' render={(history) => (
                        <AddBook
                            text = {DefaultData.defaultText}
                            shelves = {DefaultData.defaultShelves}
                            changeShelf = {this.changeShelf}
                            onAddBook = {(book) => {
                            history.push('/')
                            }}
                        />
                    )}/>
                </div>
            </BrowserRouter>
        )
    }
}

export default BooksApp
