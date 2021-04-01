import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { userContext } from "../../App";
import "./AddBook.css";


const AddBook = () => {
    const bookNameRef = useRef();
    const authorNameRef = useRef();
    const priceRef = useRef();
    const [coverPhotoLink, setCoverPhotoLink] = useState("");
    const [currentUser, setCurrentUser] = useContext(userContext);
    const [success, setSuccess] = useState(false);
    return (
        <div className="add-book">
             <h2>Add Book</h2>
            {
                success && <h3>Successfully added the book, thank you!</h3>
            }
            <form className="add-book-form" onSubmit={addBook}>
                <div>
                    <label>Book Name</label><br/>
                    <input placeholder="Enter Name" required ref={bookNameRef} />
                </div>
                <div>
                    <label>Author Name</label><br/>
                    <input placeholder="Enter Author Name" required ref={authorNameRef} />
                </div>
                <div>
                    <label>Add Price</label><br/>
                    <input placeholder="Enter Price" type="number" required ref={priceRef} />
                </div>
                <div>
                    <label>Add book cover photo</label><br/>
                    <input type="file" className="file-input" required onChange={getPhotoLink} />
                </div>
                <button className="submit-btn"><FontAwesomeIcon icon={faPlus} size="lg" /></button>
            </form>
        </div>
    );

    function addBook(e) {
        e.preventDefault();
        if(coverPhotoLink){
            const newBook = {
                email: currentUser.email,
                name: bookNameRef.current.value,
                author: authorNameRef.current.value,
                price: priceRef.current.value,
                coverPhotoLink,
            };

            fetch("https://boi-poka.herokuapp.com/addBook", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(newBook),
            }).then((data) => {
                if (data) {
                    console.log(data);
                    setSuccess(true);
                    // bookNameRef.current.value = "";
                } else {
                    alert("Something went wrong, please try again!");
                }
            });
        } else {
            alert("Photo was not uploaded! Please wait")
        }
    }

    function getPhotoLink(e) {
        setSuccess(false);
        const imageData = new FormData();
        imageData.set("key", "944474bba0b71f9545ba1025a047dc94");
        imageData.append("image", e.target.files[0]);
        axios
        .post("https://api.imgbb.com/1/upload", imageData)
        .then((response) => {
                setCoverPhotoLink(response.data.data.display_url);
            })
            .catch((err) => {
                console.log(err);
            });
    }
};

export default AddBook;
