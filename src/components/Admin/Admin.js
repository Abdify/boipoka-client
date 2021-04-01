import { faEdit, faPlus, faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import AddBook from "../AddBook/AddBook";
import ManageBooks from "../ManageBooks/ManageBooks";
import "./Admin.css";

const Admin = () => {
    return (
        <div>
            <Link to="/">
                <h2 className="home-link">Boipoka</h2>
            </Link>
            <div className="admin">
                <Router>
                    <div className="side-bar">
                        <Link to="/admin/manage">
                            <li>
                                <FontAwesomeIcon icon={faTasks} />
                                Manage Books
                            </li>
                        </Link>
                        <Link to="/admin/addBook">
                            <li>
                                <FontAwesomeIcon icon={faPlus} size="lg" /> Add Book
                            </li>
                        </Link>
                        <Link to="/admin">
                            <li>
                                <FontAwesomeIcon icon={faEdit} />
                                Edit book
                            </li>
                        </Link>
                    </div>
                    <Switch>
                        <Route exact path="/admin">
                            <ManageBooks />
                        </Route>
                        <Route path="/admin/addBook">
                            <AddBook />
                        </Route>
                        <Route path="/admin/manage">
                            <ManageBooks />
                        </Route>
                    </Switch>
                </Router>
            </div>
        </div>
    );
};

export default Admin;
