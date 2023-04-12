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
        };
     };

    async componentDidMount() {
        let resultAll = await Axios.get('https://jsonplaceholder.typicode.com/users/'+user_id);
		this.setState({user: resultAll.data});
    };	

    render() {
	  
        return (
            <div className="DetailPage">
                <Card>
                    <Card.Body>
                        <p>Name: {this.state.user.name}</p>
                        <p>Username: {this.state.user.username}</p>
                        <p>Email: {this.state.user.email}</p>
                        <p>Phone: {this.state.user.phone}</p>
                        <p>Company: </p>
                        <p>Website: {this.state.user.website}</p>
                        <p>Address: </p>
                        <Button variant="primary" onClick={() => window.location.replace('/')}>GO BACK TO HOME</Button>
                    </Card.Body>
                </Card>
            </div>
            );
	};

}

export default withLocation(UserDetailPageComponent);