import React, { Component } from 'react';
import './App.css';
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import Amplify, { API } from 'aws-amplify';
import aws_exports from './aws-exports';
import DisplayCost from './component/DisplayCost';

Amplify.configure(aws_exports);
let apiName = 'TheCostTableCRUD';
let path = '/TheCostTable';

class App extends Component {

    componentDidMount() {
        API.get(apiName, path).then(response => {
            console.log(response)
        });
    }



    render() {
        return (
        <div className="App">
            <Navbar fluid collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Welcome to the Budget App</Link>
                    </Navbar.Brand>
                </Navbar.Header>
            </Navbar>
                
                <DisplayCost/>
         </div>
    );
    }
}

export default App;
