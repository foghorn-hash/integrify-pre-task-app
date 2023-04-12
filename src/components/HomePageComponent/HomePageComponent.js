import React, { Component } from 'react';
import Axios from 'axios';
import './HomePageComponent.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import photo from './user-backgroud-image.png';
import { useLocation } from "react-router-dom";

const withLocation = Component => props => {
    const location = useLocation();
  
    return <Component {...props} location={location} />;
  };

class HomePageComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            totalCount: 0,
        };
     };

    async componentDidMount() {
        let resultAll = await Axios.get('https://jsonplaceholder.typicode.com/users');
		this.setState({totalCount: resultAll.data.length});
		this.setState({users: resultAll.data});
    };	

    render() {
	  
        return (
            <div className="HomePage">
                <Row xs={1} md={2} className="g-4">
                {this.state.users.map(user => (
                    <Col key={user.id}>
                    <Card>
                        <Card.Img className="CardImg" variant="top" src={photo} />
                        <Card.ImgOverlay className="CardOverLay">
                            <Card.Title className="CardTitle">{user.name.charAt(0)}</Card.Title>
                        </Card.ImgOverlay>
                        <Card.Body>
                        <Card.Title>{user.name}</Card.Title>
                        <Card.Text>
                            <p>{user.email}</p>
                            <p>{user.website}</p>
                        </Card.Text>
                        <Button variant="primary" onClick={() => window.location.replace('/details?user_id='+user.id)}>MORE DETAILS</Button>
                        </Card.Body>
                    </Card>
                    </Col>
                ))}
                </Row>
            </div>
            );
	};

}

export default withLocation(HomePageComponent);