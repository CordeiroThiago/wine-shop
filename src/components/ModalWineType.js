import React, { Component } from "react";
import { toast } from 'react-toastify';

const axios = require('axios').default;

class ModalWineType extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newType: ""
        }
        
        this.handleTypeNameChange = this.handleTypeNameChange.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleSaveNewType = this.handleSaveNewType.bind(this);
    }

    componentWillUnmount() {
        toast.dismiss();
    }

    handleCloseModal() {
        this.props.closeModal();
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
            toast.success("Cadastrado tipo de vinho: " + this.state.newType);

            this.setState({newType: ""});
        })
        .catch(error => {
            console.log(error);
            toast.error("Ocorreu um erro de comunicação com o servidor");
        });
    }

    render() {
        return (
            <div id="myModal" className="modal" style={{display: this.props.display}}>
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
        );
    }
}

export default ModalWineType;