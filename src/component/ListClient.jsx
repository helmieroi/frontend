import React from "react";
import { Button, Container, Table  } from 'reactstrap';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { Link } from 'react-router-dom';
import "./ListClient.css";
import Navbar from './navBar/Navbar';

class ListClient extends React.Component {


  
  state = {
        filter: "",
        clients: [],
        offset : 0,
        perPage : 10,
        currentPage : 0
    };
 
    



    async componentDidMount() {
        const response = await fetch('/clients');
        const body = await response.json();
        this.setState({ clients: body });
    }



    searchTxt(e) {
        this.setState({ filter: e.target.value });
    }

 
    render() {
   
        let { filter, clients } = this.state;
        let Datasearch = clients.filter(item => {
            return Object.keys(item).some(key =>
                typeof item[key] === "string" && item[key].toLowerCase().includes(filter.toLowerCase()))

        }

        );




        return (
            <div>
                <Navbar />
            
                <Container fluid className="test">
                    <p className="headerlist">
                    <h4>Gestion des Clients</h4>

                    <h6>{clients.length} élement affiche</h6></p>
                    <div class="search__container">

                        <input class="search__input" type="text" onChange={this.searchTxt.bind(this)} placeholder="Search" />
                    </div>

                    <hr />
                    <center>
                    <div class="container-list">
                      <div class="wrap-list">
                    <Table id="table">
                        <thead>
                            <tr id="en-tete">
                                <th width="10%">Id</th>
                                <th width="25%">nom</th>
                                <th width="25%">Prénom</th>
                                <th width="40%">E-mail</th>



                            </tr>
                        </thead>
                        <tbody>

                            { 
                                Datasearch.map(client =>

                                    <tr id="list-tr" key={client.id} ><Link id="list-tr-a"  to={"/clients/" + client.id}>

                                        <td>{client.id}</td>
                                        <td >{client.nom}</td>
                                        <td>{client.prenom}</td>
                                        <td>{client.email}</td>

                                    </Link>
                                    </tr>

                                )

                            }



                        </tbody>
                    </Table>
                    </div>
                    </div></center>
                    <br /><br />
                    <div id="bgButton" className="float-right" >
                        <Button id="returnButton" tag={Link} to="/"><IoIcons.IoMdReturnLeft id="my-icons" /> <span>Retour</span></Button>
                        <Button id="addButton" tag={Link} to="/clients/new"><AiIcons.AiOutlineUserAdd id="my-icons" /> <span>Ajouter</span></Button>

                    </div>
                   
                </Container>
            </div>
        );
    }
}
export default ListClient;
