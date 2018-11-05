import React, { Component } from 'react';
import { Modal, Button } from "react-bootstrap";
import { API } from 'aws-amplify';
import './deleteCost.css';


class DeleteCostModal extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = { editCost: this.props.editCost, isLoading: false };
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }

    open = () => this.setState({ showModal: true })
    close = () => this.setState({ showModal: false })

    handleDelete(event) {
        let apiName = 'TheCostTableCRUD';
        let path = "/TheCostTable/object/" + this.props.editCost[0].ID
        if (typeof this.props.editCost !== 'undefined') {
            API.del(apiName, path).then(response => {
                console.log(response)
            });
        }
        this.close()
    }

    render() {
        return (
            <td className="static-modal">
                <Button onClick={this.open}><span className="glyphicon glyphicon-remove"></span></Button>
                <Modal show={this.state.showModal} onHide={this.close} animation={true} >
                    <Modal.Header>
                        <Modal.Title>Delete this expense?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row description">
                            <p>Are you sure you want to delete this?</p>
                            <p>Please take a few seconds to think about it.</p> 
                            <p>Press "Yes" to delete, "No" to return</p> 
                        </div>                        
                        <Button className="btn" type="submit" value="Submit" onClick={this.handleDelete} id="yesBtn">Yes</Button>
                        <Button className="btn pull-right" onClick={this.close}>No</Button>
                    </Modal.Body>

                </Modal>
            </td>
        );
    }
}
export default DeleteCostModal;