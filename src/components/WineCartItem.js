import React, { Component } from "react";
import '../pages/styles/WineShop.scss'


class WineItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }

        this.handleAddQuantity = this.handleAddQuantity.bind(this);
        this.handleRemoveQuantity = this.handleRemoveQuantity.bind(this);
    }

    handleAddQuantity() {
        this.props.add(this.props.wine);
    }

    handleRemoveQuantity() {
        this.props.remove(this.props.wine);
    }

    render() {
        return (
            <div className="card item-container">
                <div className="item-info">
                    <div className="title">Vinho</div>
                    <div>{this.props.wine.name}</div>
                </div>
                <div className="item-info">
                    <div className="title">Preço</div>
                    <div>{this.props.wine.price}</div>
                </div>
                <div className="item-info horizontal" style={{flexGrow: 1}}>
                    <button onClick={() => this.handleRemoveQuantity(this.props.wine)}
                        className="remove"
                    >
                        -
                    </button>
                    <div>{this.props.wine.quantity}</div>
                    <button onClick={() => this.handleAddQuantity(this.props.wine)}
                        className="add"
                    >
                        +
                    </button>
                </div>
            </div>
        );
    }
}

export default WineItem;