import React, { Component } from "react"
import PropTypes from "prop-types";

class ChangeShelves extends Component{
    static propTypes = {
        book: PropTypes.object.isRequired,
        changeShelf: PropTypes.func.isRequired
    }
    state = {
        currentShelf: this.props.book.shelf,
        updating: false
    }

    changeShelf = (event) => {
        this.props.changeShelf(this.props.book, event.target.value);
        this.setState({
            currentShelf: event.target.value,
            updating: true
        });
    };

    componentWillReceiveProps(){
        this.setState({
            updating: false
        });
    }

    render() {
        const { book, shelves} = this.props
        return(
            <div className="book-shelf-changer">
                <select
                    value={this.state.currentShelf}
                    onChange={this.changeShelf}
                >
                    <option value="move" disabled>Move to...</option>
                    {
                        shelves.map(function(shelf) {
                            return <option
                                key={shelf.id + '-choice-' + book.id}
                                value={shelf.id}
                            >
                                {shelf.title}
                            </option>
                        })
                    }
                    <option value="none">None</option>
                </select>
            </div>
        )
    }
}


export default ChangeShelves;