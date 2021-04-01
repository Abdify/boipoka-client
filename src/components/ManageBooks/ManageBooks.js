import { faBook, faDollarSign, faEdit, faPen, faTrash, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../App";
import loadingImage from "../../images/loading.gif";
import "./ManageBooks.css";

const ManageBooks = () => {
    const [currentUserBooks, setCurrentUserBooks] = useState([]);
    const [currentUser, setCurrentUser] = useContext(userContext);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch("https://boi-poka.herokuapp.com/booksByUser", {
            method: "GET",
            headers: {
                currentUser: currentUser.email,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setCurrentUserBooks(data);
                setLoading(false);
            });
    }, []);
    if (loading) {
        return (
            <div style={{ width: "80%" }} className="loading">
                <h1>Processing your request...</h1>
                <img src={loadingImage} alt="" />
            </div>
        );
    }

    return (
        <div className="current-user-books">
            <h1>Manage your books</h1>
            <div className="titles">
                <h4>
                    <FontAwesomeIcon icon={faBook} />
                </h4>
                <h4>
                    <FontAwesomeIcon icon={faPen} />
                </h4>
                <h4>
                    <FontAwesomeIcon icon={faDollarSign} />
                </h4>
                <h4>
                    <FontAwesomeIcon icon={faUserEdit} />
                </h4>
            </div>
            {currentUserBooks &&
                currentUserBooks.map((book) => {
                    return <Books book={book} key={book._id} />;
                })}
        </div>
    );

    function Books({ book }) {
        return (
            <div className="book-list">
                <p>{book.name.length < 30 ? book.name : book.name.slice(0, 30) + "..."}</p>
                <p>{book.author}</p>
                <p>${book.price - book.price * 0.05}</p>
                <p>
                    <span>
                        <FontAwesomeIcon icon={faEdit} size="lg" color="teal" />
                    </span>
                    &nbsp;
                    <span
                        onClick={() => deleteBook(book._id, book.name)}
                        style={{ cursor: "pointer" }}
                    >
                        <FontAwesomeIcon icon={faTrash} size="lg" color="crimson" />
                    </span>
                </p>
            </div>
        );

        function deleteBook(id, name) {
            const confirm = window.confirm("Are you sure to delete: " + name.slice(0, 20) + "...");
            if (confirm) {
                setLoading(true);
                fetch(`https://boi-poka.herokuapp.com/books/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        setLoading(false);
                        if (data.deleted) {
                            alert("Successfully deleted the book!");
                            const reload = window.confirm('You need to reload to stop the book from displaying, do you want to reload now?');
                            if(reload) window.location.reload();
                        } else {
                            alert(data.message);
                        }
                    })
                    .catch((err) => {
                        setLoading(false);
                        alert("Could not delete the selected book!");
                    });
            }
        }
    }
};

export default ManageBooks;
