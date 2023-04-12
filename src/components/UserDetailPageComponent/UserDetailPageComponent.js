import React, { Component } from 'react';
import Axios from 'axios';
import './UserDetailPageComponent.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useLocation } from "react-router-dom";

const withLocation = Component => props => {
    const location = useLocation();
  
    return <Component {...props} location={location} />;
};

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const user_id = urlParams.get('user_id')

class UserDetailPageComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: [],
            company: "",
            street: "",
            suite: "",
            city: "",
            zip: "",
        };
     };

    async componentDidMount() {
        let resultAll = await Axios.get('https://jsonplaceholder.typicode.com/users/'+user_id);
		this.setState({user: resultAll.data});
    };	

    render() {

        var prop;
	  
        for (prop in this.state.user.company) {
            if (prop=="name") {
                this.setState({company: this.state.user.company["name"]});
            }     
        }

        for (prop in this.state.user.address) {
            if (prop=="street") {
                this.setState({street: this.state.user.address["street"]});
            } else if (prop=="suite") {
                this.setState({suite: this.state.user.address["suite"]});
            } else if (prop=="city") {
                this.setState({city: this.state.user.address["city"]});
            } else if (prop=="zipcode") {
                this.setState({zip: this.state.user.address["zipcode"]}); 
            } else {

            }
                  
        }

        return (
            <div className="DetailPage">
                <Card>
                    <Card.Body>
                        <ul>
                            <li>Name: {this.state.user.name}</li>
                            <li>Username: {this.state.user.username}</li>
                            <li>Email: {this.state.user.email}</li>
                            <li>Phone: {this.state.user.phone}</li>
                            <li>Company: {this.state.company}</li>
                            <li>Website: {this.state.user.website}</li>
                            <li>Address:
                                <ul>
                                    <li>Street: {this.state.street}</li>
                                    <li>Suite: {this.state.suite}</li>
                                    <li>City: {this.state.city}</li>
                                    <li>Zip: {this.state.zip}</li>
                                </ul>
                            </li>
                        </ul>
                        <Button variant="primary" onClick={() => window.location.replace('/')}>GO BACK TO HOME</Button>
                    </Card.Body>
                </Card>
            </div>
            );
	};

}

export default withLocation(UserDetailPageComponent);