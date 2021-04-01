import { faBook, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useHistory } from "react-router";
import "./DisplayBook.css";

const DisplayBook = ({ book }) => {
    const { coverPhotoLink, name, author, price } = book;
    const history = useHistory();
    return (
        <div className="book">
            <div>
                <div className="cover-photo">
                    <img src={coverPhotoLink} alt="" />
                </div>
                <h4>
                    <FontAwesomeIcon icon={faBook} /> &nbsp;
                    {name}
                </h4>
                <small>By {author}</small>
            </div>
            <div className="book-bottom">
                <del>${price}</del>
                <h2>${price - price * 0.05}</h2>
                <button onClick={() => handleBuy(book._id)}>
                    <FontAwesomeIcon icon={faShoppingCart} />
                </button>
            </div>
        </div>
    );
    function handleBuy(id) {
        localStorage.setItem("selectedBook", id);
        history.push("/checkout");
    }
};

export default DisplayBook;
