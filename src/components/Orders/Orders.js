import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../App";
import loadingImage from "../../images/loading.gif";
import "./Orders.css";

const Orders = () => {
    const [orderedBooks, setOrderedBooks] = useState({});
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useContext(userContext);

    useEffect(() => {
        fetch("https://boi-poka.herokuapp.com/orderedBooksByUser", {
            method: "GET",
            headers: {
                currentUser: currentUser.email,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setOrderedBooks(data);
                setLoading(false);
            });
    }, []);
    if (loading) {
        return (
            <div className="loading">
                <h1>Processing your request...</h1>
                <img src={loadingImage} alt="" />
            </div>
        );
    }
    return (
        <div>
            <h1>Your ordered books</h1>
            <div className="order-book">
                <div className="titles">
                    <h4>Name</h4>
                    <h4>Quantity</h4>
                    <h4>Price</h4>
                    <h4>Ordered At</h4>
                </div>
                {orderedBooks &&
                    orderedBooks.map((book) => {
                        return (
                            <div>
                                <h4>
                                    {book.name.length < 40
                                        ? book.name
                                        : book.name.slice(0, 40) + "..."}
                                </h4>
                                <p>{book.quantity || 1} piece</p>
                                <p>${book.price - book.price * 0.05}</p>
                                <p>
                                    {
                                        (new Date(book.orderedAt).toLocaleTimeString()+ " on " + 
                                        new Date(book.orderedAt).toLocaleDateString())
                                    }
                                </p>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default Orders;
