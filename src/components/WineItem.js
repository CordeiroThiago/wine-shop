import React, { Component } from "react";
import '../pages/styles/WineShop.scss'


class WineItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }

        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleButtonClick() {
        this.props.buttonClick(this.props.wine);
    }

    render() {
        return (
            <div className="card item-container">
                <div className="item-info">
                    <div className="title">Vinho</div>
                    <div>{this.props.wine.name}</div>
                </div>
                <div className="item-info">
                    <div className="title">Tipo</div>
                    <div>{this.props.wine.type}</div>
                </div>
                <div className="item-info">
                    <div className="title">Peso</div>
                    <div>{this.props.wine.weight}</div>
                </div>
                <div className="item-info">
                    <div className="title">Preço</div>
                    <div>{this.props.wine.price}</div>
                </div>
                <div className="item-info" style={{flexGrow: 1}}>
                    <button onClick={this.handleButtonClick}
                        className={this.props.inCart? "red" : "green"}
                    >
                        {this.props.inCart? "remover" : "comprar"}
                    </button>
                </div>
            </div>
        );
    }
}

export default WineItem;