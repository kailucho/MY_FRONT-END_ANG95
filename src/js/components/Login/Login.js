import React, { Component } from 'react';
import { Col, Form, FormGroup, Label, Input } from 'reactstrap';

class Login extends Component {

    render() {
        return (
            <div className="d-flex justify-content-center" >
                <div className="card p-4" style={{width: '40%'}}>
                    <h4> Bienvenido </h4>
                    <Form>
                        <FormGroup row>
                            <Label for="Email" sm={4} size="sm">Email</Label>
                            <Col sm={8}>
                                <Input type="email" name="email" id="Email" placeholder="lg" bsSize="sm" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="Contraseña" sm={4} size="sm">Contraseña</Label>
                            <Col sm={8}>
                                <Input type="text" name="email" id="Contraseña" placeholder="default" bsSize="sm" />
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Login;