import React, { Component } from 'react';
import {  Modal, Button } from "react-bootstrap";
import  { API } from 'aws-amplify';

class EditCostModal extends Component {
    constructor(props) {
        super(props)       
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);  
        this.state = { editCost: this.props.editCost, name: '', price: '' };        
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }

    open = () => this.setState({ showModal: true })
    close = () => this.setState({
        showModal: false,
        name: '',
        price: '' })

    handleSubmit(event) {
        let apiName = 'TheCostTableCRUD';
        let path = '/TheCostTable';
        let editCost = {
            body: {
                ID: this.props.editCost[0].ID, name: this.state.name, price: this.state.price
            }
        }
        API.put(apiName, path, editCost).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error.response)
            });
        this.setState({
            name: '',
            price: ''
        });
        this.close();
        event.preventDefault();
    }

    validation() {
        return (
            this.state.name.length > 0 &&
            this.state.price.length > 0 &&
            isNaN(this.state.price) === false
        );
    }

    render() {
        return (
            <td className="static-modal">
                <Button onClick={this.open}><span className="glyphicon glyphicon-pencil"></span></Button>
                <Modal show={this.state.showModal} onHide={this.close} animation={true} >
                    <Modal.Header>
                        <Modal.Title>Edit a Cost</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="form-group col-md-4">
                                <label>Item Name:</label>
                                <input name='name' type="text" value={this.state.name} onChange={this.handleChange} className="form-control"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-4">
                                <label>Item Price:</label>
                                <input name='price' type="text" pattern="[0-9]*" value={this.state.price} onChange={this.handleChange} className="form-control" />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                        <Button type="submit" value="Submit" disabled={!this.validation()} onClick={this.handleSubmit} >Save</Button>
                    </Modal.Footer>
                </Modal>
            </td>
        );
    }
}
export default EditCostModal;