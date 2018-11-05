import React, { Component } from "react";
import { PageHeader, Table } from "react-bootstrap";
import CreateCostModal from './createNewCost';
import EditCostModal from './EditCost';
import DeleteCostModal from './DeleteCost';
import './DisplayCost.css';
import  { API } from 'aws-amplify';


class DisplayCost extends Component {
    constructor(props) {
        super(props)
        this.state = { cost: [], editCost: [], isLoading: true };
        this.getAllCosts = this.getAllCosts.bind(this);
    }

    componentDidMount() {
        this.getAllCosts();        
    }

    componentDidUpdate() {
        this.getAllCosts()
    }

    getAllCosts() {
        let apiName = 'TheCostTableCRUD';
        let path = '/TheCostTable';
        API.get(apiName, path).then(response => {
            //console.log(response)
            if (response !== null) {
                this.setState({
                    cost: Array.from(response.data),
                    isLoading: false,
                });
            }
        });
    }

    getACost(id) {
        let apiName = 'TheCostTableCRUD';
        let single_path = '/TheCostTable/' + id;
        API.get(apiName, single_path).then(response => {
            console.log(response)
            this.setState({
                editCost: Array.from(response),
            }); 
        });
    }

    getTotal() {
        let sum = 0;
        this.state.cost.map((cost, index) => (
            sum += parseInt(cost.price)
        ));
        return sum;
    }

    render() {
        const theCost = this.state.cost;
        return (
            <div className="costs">               
                <PageHeader>Your Expense</PageHeader>                       
                <Table className="table-responsive table-striped" responsive>                   
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Item Price</th>
                            <th>Edit</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody >
                        {theCost.map((cost, index) => (
                            <tr key={index} onClick={() => this.getACost(cost.ID)}>
                                <td>{cost.name}</td>
                                <td>{cost.price}</td>
                            <EditCostModal editCost={Object.values(this.state.editCost)} />
                            <DeleteCostModal editCost={Object.values(this.state.editCost)} />
                            </tr>
                          ))}
                    </tbody>                    
                </Table> 
                <CreateCostModal />
                <p className="sum">
                    The total cost is <span id="balance">{this.getTotal()}</span>
                </p>               
            </div>
        );
    }
}
export default DisplayCost;