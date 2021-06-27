import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import Navbar from './navBar/Navbar';
import Success from './Messages_Alert/Success';

import * as IoIcons from 'react-icons/io';
import * as FiIcon from "react-icons/fi";
import "./ClientEdit.css";
class ClientEdit extends Component {

    emptyItem = {
        nom: '',
        prenom: '',
        email: '',

    };

    constructor(props) {
        super(props);
        this.vButton = true;
        this.testnom = false;
        this.testpnom = false;
        this.testemail = false;
        this.state = {
            item: this.emptyItem,
            alert_message: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const client = await (await fetch(`/projet/clients/${this.props.match.params.id}`)).json();
             this.vButton = false;
             this.testnom = true;
             this.testpnom = true;
             this.testemail = true;
            this.setState({ item: client });
          
        }
    }
    handleChange(event) {
        const target = event.target;
        const value = target.value;


        if (target.name === "nom") {

            const reg = /^[a-zA-ZÀ-ú\-\s]*/;
            if (target.value === "") {
                this.testnom = false;
                target.id = ""
            }
            else if ((!reg.test(target.value) === false) && (target.value.length > 2)) {

                target.id = "emailValid"
                this.testnom = true;
            } else {
                this.testnom = false;
                target.id = "emailINvalid"

            }
        }
        if (target.name === "prenom") {

            const reg = /^[a-zA-ZÀ-ú\-\s]*/;
            if (target.value === "") {
                this.testpnom = false;
                target.id = ""
            }
            else if ((!reg.test(target.value) === false) && (target.value.length > 2)) {
                this.testpnom = true;
                target.id = "emailValid"
            } else {
                this.testpnom = false;
                target.id = "emailINvalid"

            }
        }
        if (target.name === "email") {
            const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (target.value === "") {
                this.testemail = false;
                target.id = ""
            }
            else if (!reg.test(target.value) === false) {
                this.testemail = true;
                target.id = "emailValid"
            } else {
                this.testemail = false;
                target.id = "emailINvalid"

            }

        }


        if (this.testemail && this.testpnom && this.testnom) {

            this.vButton = false;
        } else
            this.vButton = true;

        const name = target.name;
        let item = { ...this.state.item };
        item[name] = value;
        this.setState({ item });



    }
    async handleSubmit(event) {
        event.preventDefault();
        const { item } = this.state;

        await fetch('/projet/clients' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.setState({alert_message:'Saccess !'})
   //     this.props.history.push('/clients/new');
    }
    render() {
        const { item } = this.state;
        const title = <h2 id="title">{item.id ? 'Modifier le client ' : 'Ajouter un client'}{item.id}</h2>;
    
         
        return <div>
           <Navbar />
           <Container>
                {title}<br></br>
            {this.state.alert_message === 'Saccess !' ? <Success/>:null}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <div className="question">

                            <Input type="text" name="nom" id="isValid" value={item.nom || ''}
                                onChange={this.handleChange} autoComplete="email" required />
                            <Label for="name">Nom :</Label>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="question">

                            <Input type="text" name="prenom" id="prenom" value={item.prenom || ''}
                                onChange={this.handleChange} autoComplete="email" required />
                            <Label for="prenom">Prénom :</Label>
                        </div>
                    </FormGroup>

                    <FormGroup>
                        <div className="question">

                            <Input type="text" name="email" id={this.emptyItem.vemail} value={item.email || ''}
                                onChange={this.handleChange} autoComplete="email" required />
                            <Label for="email">Email :</Label>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div id="bgButton" className="float-right" >

                            <Button id="returnButton" tag={Link} to="/clients"><IoIcons.IoMdReturnLeft id="my-icons" /> <span>Retour</span></Button>


                            <Button disabled={this.vButton} id="engButton" type="submit" ><FiIcon.FiSave id="my-icons" /> <span>Enregistrer</span></Button>


                        </div>
                    </FormGroup>
                </Form>
            </Container>

        </div>
    }
}

export default withRouter(ClientEdit);