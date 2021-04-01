import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import loadingImage from '../../images/loading.gif';
import DisplayBook from '../DisplayBook/DisplayBook';
import './Home.css';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetch('https://boi-poka.herokuapp.com/books')
        .then(res => res.json())
        .then(data => {
            setBooks(data);
            setLoading(false);
        })
    }, [])
    if(loading){
        return (
            <div className="loading">
                <h1>Processing your request...</h1>
                <img src={loadingImage} alt=""/>
            </div>
        )
    }
    return (
        <div>
            <form className="search-form">
                <input placeholder="Search Book" />
                <button><FontAwesomeIcon icon={faSearch} /></button>
            </form>
            <div className="books-container">
                {books &&
                    books.map((book) => {
                        return <DisplayBook book={book} key={book._id} />;
                    })}
            </div>
        </div>
    );
};

export default Home;