import React, { Component } from 'react'
import axios from 'axios'
import {UrlServer} from '../Utils/ServerUrlConfig'
import ReactTable from 'react-table'
import { FaSave, FaTimes, FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";
import { Button, Modal, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import "react-table/react-table.css";

class Profesiones extends Component {
    constructor() {
        super();
        this.state = {
          data: [],
          modal: false,
          InputnombProfesion: '',
          toastId: null
        };
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        
    }
    
    componentDidMount(){
        // OBTIENE DATA DEL SERVIDOR-------------------------------------------------------
        axios.get(`${UrlServer}/profesiones`)
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
    handleChange(event) {
        this.setState({InputnombProfesion: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();        
        const { InputnombProfesion } = this.state
        
        // ENVIA DATOS AL SERVIDOR-------------------------------------------------------
        axios.post(`${UrlServer}/profesiones`, {
            nombProfesion: InputnombProfesion.toUpperCase()
          })
          .then((res)=> {
            alert(`PERFECT!!!`, res)         
            console.log(res);
            
          })
          .catch( (error)=> {         
            alert(`Ocurrió un error al tratar de crear la profesión`, error)
            console.log(`Ocurrió un error al enviar el nombre de la profesion, `,error);
          });

        console.log('data>', InputnombProfesion);
        
    }

    handleDelete(e, id){
        e.preventDefault()
        if(confirm('Estas seguro de eliminar la prefesón?')){
            console.log('hola tu mensaje', );
            axios.delete(`${UrlServer}/profesiones/${id}`,{

            })
            .then((res)=>{
                console.log(res);
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    }
    handleUpdate(){
        alert('¿Estas seguro de actualizar la profesión?');
        
    }

    render() {
        const { data } = this.state;
        const columns = [
            {
                Header:  props => <b>NOMBRE DE PROFESION</b>,
                accessor: 'nombProfesion',
            }, 
           
            {
                Header: props => <b>OPCIONES</b>, // Custom header components!
                accessor: '_id',
                Cell: row => (
                    <span>
                        <button className="btn btn-sm btn-outline-success p-1" onClick={(e)=>this.handleUpdate(e, row.value)} ><FaEdit /></button>
                        <button className="btn btn-sm btn-outline-danger ml-1 p-1"  onClick={(e)=>this.handleDelete(e, row.value)} ><FaTrashAlt /></button>
                    </span>
                )
            }
        ]
        return (
            <div>
                <div className="card">
                    <div className="card-header p-1">
                        <label className="float-left pt-2"><b> LISTA DE PROFESIONES</b></label>
                        <button className="btn btn-sm float-right m-0" onClick={this.toggle}><FaPlus /> Nuevo</button>
                    </div>
                    <div className="card-body p-0">
                        <ReactTable
                            data={data}
                            columns={columns}
                            defaultPageSize={10}
                            className="-striped -highlight"
                            style={{
                                height: "-webkit-fill-available" // This will force the table body to overflow and scroll, since there is not enough room
                            }}
                        /> 
                    </div>
                </div>

               
               {/* MODAL PROFESIONES */}
               <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle} className={this.props.className} size="sm">
                    <Form onSubmit={this.handleSubmit}>
                        <ModalBody>
                            <FormGroup>
                                <Label for="nombProfesion"><b>REGISTRAR NUEVA PROFESIÓN</b></Label>
                                <Input type="text"  name="nombProfesion" placeholder="Ejem. ENFERMERIA" className="text-uppercase" value={this.state.InputnombProfesion} onChange={this.handleChange} />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter className="p-2 bg-light">
                            <Button color="primary" type="submit" className="btn btn-sm btn-outline-primary ml-1 p-1"><FaSave size="1em"/> Guardar</Button>{' '}
                            <Button color="secondary" className="btn btn-sm btn-outline-danger ml-1 p-1" onClick={this.toggle}> <FaTimes /> Cancelar</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Profesiones;

