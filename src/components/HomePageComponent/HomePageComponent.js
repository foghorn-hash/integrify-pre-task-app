import React, { Component } from 'react';
import Axios from 'axios';
import './HomePageComponent.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import InfiniteScroll from 'react-infinite-scroller';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import photo from './user-backgroud-image.png';
import LOADING from "../../1487-loading.gif";
import { useLocation } from "react-router-dom";

const withLocation = Component => props => {
    const location = useLocation();
  
    return <Component {...props} location={location} />;
};

function paginator(items, current_page, per_page_items) {
    let page = current_page || 1,
    per_page = per_page_items || 10,
    offset = (page - 1) * per_page,

    paginatedItems = items.slice(offset).slice(0, per_page_items),
    total_pages = Math.ceil(items.length / per_page);

    return {
        page: page,
        per_page: per_page,
        prev_page: page - 1 ? page - 1 : null,
        next_page: (total_pages > page) ? page + 1 : null,
        total: items.length,
        total_pages: total_pages,
        data: paginatedItems
    };
};

class HomePageComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            usersAll: [],
            currentPage: 1
        };
    };

    async componentDidMount() {
        let resultAll = await Axios.get('https://jsonplaceholder.typicode.com/users');
        this.setState({usersAll: resultAll.data});
        this.setState({users: paginator(resultAll.data, 1, 6).data});
    };

    render() {

        if (this.state.users.length == 0) {
            return <div className="loading-screen"><img src={LOADING} alt="Loading..." /></div>;
        }

        const getNewUsers = async () => {
            const currentPage = this.state.currentPage + 1;
            const paginatedUsers = paginator(this.state.usersAll, currentPage, 6);
            this.setState({ users: [...this.state.users, ...paginatedUsers.data], currentPage });
        }
      
        return (
            <div className="HomePage">
                <InfiniteScroll
                    pageStart={1}
                    loadMore={getNewUsers}
                    hasMore={this.state.usersAll.length > this.state.users.length}
                    threshold={100}
                > 
                    <Row xs={1} md={3} className="g-4">
                    {this.state.users.map((i, index) => (
                            <Col style={{ flexBasis: "33%" }}>
                                <div className="animated-card">
                                    <Card className="Card">
                                        <Card.Img className="CardImg" variant="top" src={photo} />
                                        <Card.ImgOverlay className="CardOverLay d-flex justify-content-center align-items-center">
                                            <Card.Title className="CardTitle">{i.name.charAt(0)}</Card.Title>
                                        </Card.ImgOverlay>
                                        <Card.Body>
                                        <Card.Title>{i.name}</Card.Title>
                                        <Card.Text>
                                            <p>{i.email}</p>
                                            <p>{i.website}</p>
                                        </Card.Text>
                                        <Button className="CardButton" variant="primary" onClick={() => window.location.replace('/details?user_id='+i.id)}>MORE DETAILS</Button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Col>
                    ))}
                    </Row>
                </InfiniteScroll>
            </div>
            );
	};

}

export default withLocation(HomePageComponent);