import React, { Component } from 'react'
import axios from 'axios'
import { FaSave, FaTimes, FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";
import { Button, Modal, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

class Profesiones extends Component {
    constructor() {
        super();
        this.state = {
          data: [],
          modal: false
        };
        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount(){
        // OBTIENE DATA DEL SERVIDOR-------------------------------------------------------
        axios.get('http://localhost:3000/profesiones')
        .then((res) => {
            // console.log('rest',res.data);
            this.setState({
                data: res.data
            })
        })
        .catch(function (error) {
            console.log('ocurrió un error al realizar la petición GET',error);
        });
    }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        // ENVIA DATOS AL SERVIDOR-------------------------------------------------------
        axios.post('http://localhost:3000/profesiones', {
            nombProfesion: data
          })
          .then(function (res) {
            console.log(res);
          })
          .catch(function (error) {
            console.log(`Ocurrió un error al enviar el nombre de la profesion :`,error);
          });

        console.log('>data>', data);
        
    }
    render() {
        const { data } = this.state;
        return (
            <div>
                <div className="card">
                    <div className="card-header p-1">
                            <label className="float-left pt-2"><b> LISTA DE PROFESIONES</b></label>
                            <button className="btn btn-sm float-right m-0" onClick={this.toggle}><FaPlus /> Nuevo</button>
                    </div>
                    <div className="card-body p-0">
                        <table className="table table-hover m-0">
                            <thead>
                                <tr>
                                    <th> N°</th>
                                    <th> NOMBRE DE PROFESION</th>
                                    <th> OPCIONES</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((profesion, i)=>

                                    <tr key={i}>
                                        <td>{ i+1 } </td>
                                        <td> {profesion.nombProfesion}</td>
                                        <td> 
                                            <button className="btn btn-sm btn-outline-success p-1"><FaEdit /></button>
                                            <button className="btn btn-sm btn-outline-danger ml-1 p-1"><FaTrashAlt /></button>
                                        </td>
                                    </tr>
                                
                                )}                                
                            </tbody>
                        </table>
                    </div>
                </div>
               {/* MODAL PROFESIONES */}
               <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle} className={this.props.className} size="sm">
                    <Form onSubmit={this.handleSubmit}>
                        <ModalBody>
                            <FormGroup>
                                <Label for="exampleEmail"><b>REGISTRAR NUEVA PROFESIÓN</b></Label>
                                <Input type="text" name="nombProfesion" placeholder="Ejem. ENFERMERIA" className="text-uppercase" />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter className="p-2 bg-light">
                            <Button color="primary" className="btn btn-sm btn-outline-primary ml-1 p-1"><FaSave size="1em"/> Guardar</Button>{' '}
                            <Button color="secondary" className="btn btn-sm btn-outline-danger ml-1 p-1" onClick={this.toggle}> <FaTimes /> Cancelar</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Profesiones;

