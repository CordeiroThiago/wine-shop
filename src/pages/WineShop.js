import React, { Component } from "react";
import './styles/WineShop.scss';
import WineItem from '../components/WineItem'
import WineCartItem from '../components/WineCartItem'
import CartFooter from '../components/CartFooter'
import floatToMoney from '../functions/FloatToMoney'

const axios = require('axios');

class WineShop extends Component {
    constructor(props) {
        super(props);

        this.state = {
            wines: [],
            winesChoosed: []
        }

        this.getInCart = this.getInCart.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.addWineQuantity = this.addWineQuantity.bind(this);
        this.removeWineQuantity = this.removeWineQuantity.bind(this);
    }

    componentDidMount() {
        this.getWines();
    }

    getWines() {
        axios.get('http://localhost/wine-shop-api/wines')
        .then(response => {
            const wines = [];
            console.log(response.data[0])
            response.data.map(wine =>
                wines.push(
                    {
                        wine_id: wine.wine_id,
                        name: wine.name,
                        wine_type_id: wine.wine_type_id,
                        type: wine.type,
                        weight: wine.weight.toString().replace(".", ",") + " kg",
                        price: "R$ " + floatToMoney(wine.price)
                    }
                )
            )
            this.setState({wines: wines});
        })
        .catch(error => {
            console.log(error);
        });
    }

    getInCart(wineId) {
        return this.state.winesChoosed.some((wine) => wine.wine_id === wineId);
    }

    addToCart(wine) {
        const cart = [...this.state.winesChoosed];
        wine.quantity = 1;
        cart.push(wine);
        this.setState({winesChoosed: cart});
    }

    removeFromCart(wine) {
        const cart = [...this.state.winesChoosed];
        this.setState({winesChoosed: cart.filter(item => item.wine_id !== wine.wine_id)});
    }

    addWineQuantity(wine) {
        const cart = [...this.state.winesChoosed];
        cart.map(item => {
            if (item.wine_id === wine.wine_id) {
                item.quantity++;
            }
        })
        this.setState({winesChoosed: cart});
    }

    removeWineQuantity(wine) {
        if (wine.quantity === 1) {
            this.removeFromCart(wine);
            return;
        }

        const cart = [...this.state.winesChoosed];
        cart.map(item => {
            if (item.wine_id === wine.wine_id) {
                item.quantity--;
            }
        })
        this.setState({winesChoosed: cart});
    }

    render() {
        return (
            <div className="shop-container">
                <div className="card wine-stock">
                    {this.state.wines.map((item, key) => 
                        <WineItem key={key}
                            wine={item}
                            inCart={this.getInCart(item.wine_id)}
                            buttonClick={this.getInCart(item.wine_id) ? this.removeFromCart : this.addToCart}
                        />
                    )}
                </div>
                <div className="card cart">
                    {this.state.winesChoosed.map((item, key) => 
                        <WineCartItem key={key}
                            wine={item}
                            add={this.addWineQuantity}
                            remove={this.removeWineQuantity}
                        />
                    )}
                    <CartFooter wines={this.state.winesChoosed} />
                </div>
            </div>
        );
    }
}

export default WineShop;