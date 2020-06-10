import React, { Component } from "react";
import floatToMoney from '../functions/FloatToMoney'

const axios = require('axios').default;

class CartFooter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            totalItems: 0,
            shipping: 0,
            total: 0,
            distance: 0,
        }

        this.getValues = this.getValues.bind(this);
        this.handleDistanceChange = this.handleDistanceChange.bind(this);
        this.handleSale = this.handleSale.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.wines !== nextProps.wines) {
            return true;
        }
        if (this.state.totalItems !== nextState.totalItems) {
            return true;
        }
        if (this.state.shipping !== nextState.shipping) {
            return true;
        }
        if (this.state.total !== nextState.total) {
            return true;
        }
        if (this.state.distance !== nextState.distance) {
            return true;
        }
        return false;
    }

    getValues() {
        if (this.props.wines.length === 0) return;
        
        const wines = [];
        this.props.wines.map(wine => {
            wines.push(`${wine.wine_id}:${wine.quantity}`);
        })

        axios.get(`http://localhost/wine-shop-api/calculate-total?distance=${this.state.distance}&wines=${wines.join(",")}`)
        .then(response => {
            console.log(response.data);
            this.setState({
                totalItems: response.data.totalItems,
                shipping: response.data.shipping,
                total: response.data.total
            })
        })
        .catch(error => {
            console.log(error);
        });
    }

    handleDistanceChange(event) {
        this.setState({distance: event.target.value});
    }

    handleSale() {
        const wines = [];
        this.props.wines.map(wine => {
            const item = {};
            item[wine.wine_id] = wine.quantity;
            wines.push(item);
        })

        const data = {
            distance: this.state.distance,
            wines: wines
        }
        console.log(data);

        axios.post(`http://localhost/wine-shop-api/sales`, data)
        .then(response => {
            // TODO: Mostrar venda concluída
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }

    render() {
        this.getValues();

        return (
            <div className="cart-footer">
                <div className="total title">
                    <div>total itens</div>
                    <div>R$ {floatToMoney(this.state.totalItems)}</div>
                </div>
                <div className="total info">
                    <div>Distancia</div>
                    <div>
                        <input type="number" className="input" value={this.state.distance} onChange={this.handleDistanceChange} /> Km
                    </div>
                </div>
                <div className="total title">
                    <div>frete</div>
                    <div>R$ {floatToMoney(this.state.shipping)}</div>
                </div>
                <div className="total total-final">
                    <div>total</div>
                    <div>R$ {floatToMoney(this.state.total)}</div>
                </div>

                <button className="green btn" onClick={this.handleSale}>Finalizar compra</button>
            </div>
        );
    }
}

export default CartFooter;