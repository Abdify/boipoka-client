import firebase from "firebase/app";
import React, { useContext, useRef, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { userContext } from "../../App";
import { auth } from "./firebase";
import "./Login.css";


const LogIn = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState();
    const [currentUser, setCurrentUser] = useContext(userContext);

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    function handleLogIn(e) {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                const { displayName, email } = user;
                const newUser = { displayName, email };
                setCurrentUser(newUser);
                history.replace(from);
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage);
            });
    }
    function googleLogIn() {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then((result) => {
                var user = result.user;
                setCurrentUser(user);
                history.replace(from);
            })
            .catch((error) => {
                // Handle Errors
                var errorMessage = error.message;
                setError(errorMessage);
            });
    }

    return (
        <div className="log-in">
            <LogInForm />
            <span className="divider">Or</span>
            <button className="btn other-log-in-btn" onClick={googleLogIn}>
                Continue with Google
            </button>
        </div>
    );
    function LogInForm() {
        return (
            <form onSubmit={handleLogIn} className="log-in-form">
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <input
                    ref={emailRef}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    required
                    placeholder="Email"
                    onInvalid={(e) => e.target.setCustomValidity("Enter your valid email here")}
                />
                <input
                    type="password"
                    ref={passwordRef}
                    pattern="(?=.*\d)(?=.*[a-z]).{6,}"
                    required
                    placeholder="password"
                    onInvalid={(e) =>
                        e.target.setCustomValidity(
                            "Passwords without numbers and less than 6 characters are not passwords!"
                        )
                    }
                />
                <div className="form-bottom">
                    <div>
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">Remember me</label>
                    </div>
                    <a href="#" className="link-text">
                        Forgot password?
                    </a>
                </div>
                <button className="btn submit-btn">Log in</button>
                <small>
                    Don't have an account?{" "}
                    <Link to="/signup" className="link-text">
                        Create an account
                    </Link>
                </small>
            </form>
        );
    }
};

export default LogIn;
