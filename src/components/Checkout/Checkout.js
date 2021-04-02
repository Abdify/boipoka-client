import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { userContext } from "../../App";
import loadingImage from "../../images/loading.gif";

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
                    <div className="titles">
                        <h4>Name</h4>
                        <h4>Quantity</h4>
                        <h4>Price</h4>
                    </div>
                    <div>
                        <h4>
                            {book.name.length < 40 ? book.name : book.name.slice(0, 40) + "..."}
                        </h4>
                        <p>{book.quantity || 1} piece</p>
                        <p>${book.price - book.price * 0.05}</p>
                    </div>
                </div>
            )}
            <button onClick={() => handleCheckout(book)}>CheckOut</button>
        </div>
    );

    function handleCheckout(orderedBook){
        const orderInfo = {
            bookId: orderedBook._id,
            bookBy: orderedBook.email,
            name: orderedBook.name,
            author: orderedBook.author,
            price: orderedBook.price,
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
                alert('Could not place the order!')
            }
        })
    }
};

export default Checkout;
