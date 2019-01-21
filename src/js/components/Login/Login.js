import React, { Component } from 'react';
import { Col, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios'

class Login extends Component {
    constructor(){
        super()
        this.state = {
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:3000/loginusuarios/login', {
            "username": "german",
            "password": "german"
          })
          .then((res)=> {
            console.log(res.data);

            sessionStorage.setItem('user', res.data.userUsername)
            sessionStorage.setItem('TuToken', res.data.token)
          })
          .catch((error)=> {
            console.log(error);
          });
    }
    render() {
        return (
            <div className="d-flex justify-content-center" >
                <div className="card p-4">
                    <h4> Bienvenido: {sessionStorage.getItem('user')} </h4>
                    <Form onSubmit={this.handleSubmit} >
                        <FormGroup row>
                            <Label for="Email" sm={5} size="sm">Email</Label>
                            <Col sm={8}>
                                <Input type="email" name="text" placeholder="german"   bsSize="sm" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="Contraseña" sm={5} size="sm">Contraseña</Label>
                            <Col sm={8}>
                                <Input type="text" name="text"  placeholder="german" bsSize="sm" />
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <button type="submit" className="btn btn-outline-primary mr-2"> INGRESAR</button>
                            <button type="submit" className="btn btn-outline-danger"> CANCELAR</button>
                            
                        </FormGroup>
                    </Form>
          
                </div>
            </div>
        );
    }
}

export default Login;