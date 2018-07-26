import React from "react";
import Search from "./Search"
import logo from "../img/logo.png";
import { Link } from "react-router-dom"

const Header = ({ title }) => (
            <div id="header">
                <div className="container">
                    <div className="header">
                        <div className="title">
                            <Link to="/"><img src={logo} alt="Website Logo" className="logo"/></Link>
                            <h1>{title}</h1>
                        </div>
                        <Search />
                    </div>
                </div>
            </div>
        )

export default Header;