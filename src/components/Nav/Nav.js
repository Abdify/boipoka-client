import { faBars, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../App";
import { auth } from "../Login/firebase";
import "./Nav.css";

const Nav = () => {
    const [currentUser, setCurrentUser] = useContext(userContext);
    const [showNav, setShowNav] = useState(false);
    return (
        <nav>
            {/* Logo */}
            <h2 className="logo">Boipoka</h2>

            {/* Nav toggle bars */}
            <span className="toggleNav" onClick={() => setShowNav(!showNav)}>
                <FontAwesomeIcon icon={faBars} color="white" />
            </span>

            {/* Nav items */}
            <ul className={showNav ? "on" : "off" }>
                <Link to="/">
                    <li><FontAwesomeIcon icon={faHome} size="lg" /></li>
                </Link>

                <Link to="/orders">
                    <li>Orders</li>
                </Link>

                <Link to="/admin">
                    <li>Admin</li>
                </Link>

                {/* Show log in or log out accordingly */}
                {currentUser.email ? (
                    <span>
                        <Link to="/admin">
                            <li>{currentUser.displayName || "User"}</li>
                        </Link>
                        <li onClick={logOut} style={{ cursor: "pointer" }}>
                            Log Out
                        </li>
                    </span>
                ) : (
                    <Link to="/login">
                        <li>Log in</li>
                    </Link>
                )}
            </ul>
        </nav>
    );


    function logOut() {
        auth.signOut()
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                // An error happened.
            });
    }
};

export default Nav;
