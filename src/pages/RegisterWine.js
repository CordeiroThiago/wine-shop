import React, { Component } from "react";
import './styles/RegisterWine.scss'

const axios = require('axios').default;

class RegisterWine extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectTypeValues: [],
            selectedtype: 0,
            name: "",
            weight: 0,
            price: 0,
            display: "none",
            newType: ""
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleWeightChange = this.handleWeightChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.getTypes = this.getTypes.bind(this);
        this.handleTypeNameChange = this.handleTypeNameChange.bind(this);
        this.handleAddNewType = this.handleAddNewType.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleSaveNewType = this.handleSaveNewType.bind(this);
        this.handleAddWine = this.handleAddWine.bind(this);
    }

    componentDidMount() {
        this.getTypes();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (JSON.stringify(this.state.selectTypeValues) !== JSON.stringify(nextState.selectTypeValues)) {
            return true;
        }
        if (this.state.name !== nextState.name) {
            return true;
        }
        if (this.state.weight !== nextState.weight) {
            return true;
        }
        if (this.state.price !== nextState.price) {
            return true;
        }
        if (this.state.display !== nextState.display) {
            return true;
        }
        if (this.state.newType !== nextState.newType) {
            return true;
        }
        return false;
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    handleTypeChange(event) {
        this.setState({selectedtype: event.target.value});
    }

    handleWeightChange(event) {
        this.setState({weight: event.target.value});
    }

    handlePriceChange(event) {
        this.setState({price: event.target.value});
    }

    getTypes() {
        axios.get(`http://localhost/wine-shop-api/wine-types`)
        .then(response => {
            const types = [];
            response.data.forEach(type => {
                types.push(type)
            });
            this.setState({selectTypeValues: types});

            if (types.length > 0) {
                this.setState({selectedtype: types[0].wine_type_id});
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    handleAddNewType() {
        this.setState({display: "block"})
    }

    handleCloseModal() {
        this.setState({display: "none"})
    }

    handleTypeNameChange(event) {
        this.setState({newType: event.target.value});
    }

    handleSaveNewType() {
        const data = {
            type: this.state.newType
        }

        axios.post(`http://localhost/wine-shop-api/wine-types`, data)
        .then(() => {
            this.getTypes();
        })
        .catch(error => {
            console.log(error);
        });
    }

    handleAddWine() {
        const data = {
            name: this.state.name,
            weight: this.state.weight,
            price: this.state.price,
            wine_type_id: this.state.selectedtype
        }

        axios.post(`http://localhost/wine-shop-api/wines`, data)
        .then(response => {
            // TODO: Mostrar venda concluída
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <div className="register-container card">
                    <h2>Cadastro de vinhos</h2>
                    <div className="grid-item">
                        <div className="field">
                            Nome:
                        </div>
                        <div className="value">
                            <input type="text"
                                className="input value-field"
                                value={this.state.distance}
                                onChange={this.handleNameChange}
                            />
                        </div>
                    </div>
                    <div className="grid-item">
                        <div className="field">
                            Tipo:
                        </div>
                        <div className="value">
                            <div>
                                <select className="input" onChange={this.handleTypeChange}>
                                    {this.state.selectTypeValues.map((type, key) => 
                                        <option key={key} value={type.wine_type_id}>{type.type}</option>
                                    )}
                                </select>
                                <button className="add-item" onClick={this.handleAddNewType}>+</button>
                            </div>
                        </div>
                    </div>
                    <div className="grid-item">
                        <div className="field">
                            Peso:
                        </div>
                        <div className="value">
                            <input type="number"
                                className="input value-field"
                                value={this.state.distance}
                                onChange={this.handleWeightChange}
                            />
                        </div>
                    </div>
                    <div className="grid-item">
                        <div className="field">
                            Preço:
                        </div>
                        <div className="value">
                            <input type="number"
                                className="input value-field"
                                value={this.state.distance}
                                onChange={this.handlePriceChange}
                            />
                        </div>
                    </div>

                    <button className="green btn" style={{width:200}} onClick={this.handleAddWine}>Adicionar Vinho</button>
                </div>

                <div id="myModal" className="modal" style={{display: this.state.display}}>
                    <div className="modal-content card register-container">
                        <div className="modal-header">
                            <h3>Cadastrar de tipo de vinho</h3>
                            <span className="close" onClick={this.handleCloseModal}>&times;</span>
                        </div>
                        <div className="register-container">
                            <div className="grid-item">
                                <div className="field">
                                    tipo de vinho:
                                </div>
                                <div className="value">
                                    <input type="text"
                                        className="input value-field"
                                        value={this.state.newType}
                                        onChange={this.handleTypeNameChange}
                                    />
                                </div>
                            </div>
                            <button className="green btn" style={{width:200}} onClick={this.handleSaveNewType}>Cadastrar Tipo</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterWine;