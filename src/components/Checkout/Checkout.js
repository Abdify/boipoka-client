import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { userContext } from "../../App";
import loadingImage from "../../images/loading.gif";
import "./Checkout.css";

const Checkout = () => {
    const bookId = localStorage.getItem("selectedBook");
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const [currentUser, setCurrentUser] = useContext(userContext);
    
    useEffect(() => {
        fetch(`https://boi-poka.herokuapp.com/books/${bookId}`)
            .then((res) => res.json())
            .then((data) => {
                setBook(data);
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
            <h1>Checkout</h1>
            {book && (
                <div className="order-book">
                    <div>
                        <h4>Name</h4>
                        <h4>Quantity</h4>
                        <h4>Price</h4>
                    </div>
                    <div>
                        <h3>
                            {book.name.length < 40 ? book.name : book.name.slice(0, 40) + "..."}
                        </h3>
                        <h2>{book.quantity || 1} piece</h2>
                        <h2>${book.price - book.price * 0.05}</h2>
                    </div>
                </div>
            )}
            <button onClick={() => handleCheckout(book)}>CheckOut</button>
        </div>
    );

    function handleCheckout(orderedBook){
        const orderInfo = {
            ...orderedBook,
            orderedAt: new Date(),
            orderedBy: currentUser.email
        }
        fetch(`https://boi-poka.herokuapp.com/orderBook`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(orderInfo)
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                history.push('/orders');
            } else {
                alert('Could not place the order! May be you have ordered the book already!')
            }
        })
    }
};

export default Checkout;
