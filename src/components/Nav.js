import React, { Component } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {
    state = {
        wines: []
    }

    render() {
        return (
            <nav className="wine-shop-nav">
                <h3 className="nav-logo">Loja de Vinhos</h3>
                <ul>
                    <Link to="/">
                        <li>Comprar Vinho</li>
                    </Link>
                    <Link to="/register-wine">
                        <li>Adicionar vinho</li>
                    </Link>
                </ul>
            </nav>
        );
    }
}

export default Nav;