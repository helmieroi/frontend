import React, { Component } from 'react';
import './App.css';
import Navbar from './component/navBar/Navbar';

import { Container } from 'reactstrap';

class Home extends Component {
    render() {
        return (
            <div>
              <Navbar/>
            <Container fluid>
                    <center><h1 >Bienvenue</h1></center>
                </Container>
            </div>
        );
    }
}
export default Home;