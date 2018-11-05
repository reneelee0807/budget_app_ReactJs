import React, { Component } from 'react';
import { Modal, Button } from "react-bootstrap";
import { API } from 'aws-amplify';


class CreateCostModal extends Component {   
    constructor(props) {
        super(props)
        this.state = { name: '', price: ''}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }

    handleSubmit(event) {
        const uuidv1 = require('uuid/v1');
        let apiName = 'TheCostTableCRUD';
        let path = '/TheCostTable';
        let newItem = {
            body: {
                ID: uuidv1(), name: this.state.name, price: this.state.price
            }
        }
        API.post(apiName, path, newItem).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error.response)
        });
        event.preventDefault();

        this.setState({
            name : '',
            price : ''
        });

        this.close()        
    }

    validation() {
        return (
            this.state.name.length > 0 &&
            this.state.price.length > 0 &&
            isNaN(this.state.price) === false
            );
    }

    open = () => this.setState({ showModal: true })
    close = () => this.setState({
        showModal: false,
        name: '',
        price: ''})

    render() {
        return (
            
            <div className="static-modal">
                <Button onClick={this.open} className="btn pull-right btn-info">Add New Expense</Button>
                <Modal id="mymodal" show={this.state.showModal}  onHide={this.close} animation={true} >

                    <Modal.Header>
                        <Modal.Title>Add a Cost</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="row">
                            <div className="form-group col-md-4">
                                <label>Item Name:</label>
                                <input name='name' type="text" value={this.state.name} onChange={this.handleChange} className="form-control" placeholder='Enter Item Name...' />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-4">
                                <label>Item Price:</label>
                                <input name='price' type="text" value={this.state.price} onChange={this.handleChange} className="form-control" placeholder='Enter Item Price...' />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                        <Button color="primary" type="submit" disabled={!this.validation()} value="Submit" onClick={this.handleSubmit}  id="saveBtn">Save</Button>
                    </Modal.Footer>
                </Modal>
            </div>
    );
    }
}
export default CreateCostModal;