import React, { Component } from 'react';
import axios from 'axios'
import { FaEdit } from "react-icons/fa";
import { Button, Modal, ModalBody } from 'reactstrap';
import ReactTable from 'react-table'
import "react-table/react-table.css";
import { UrlServer } from '../Utils/ServerUrlConfig'
import CompResult from './CompResult'

class AtenPendientes extends Component {
    constructor(){
        super()
        this.state={
            DataAtenPendientes:[],
            modal: false,
            DataFilter:[]
        };
    
        this.toggle = this.toggle.bind(this);
    }
    componentWillMount(){
        axios.get(`${UrlServer}/atenciones`)
        .then((res)=>{
            console.log(res.data);
            this.setState({
                DataAtenPendientes:res.data
            })
        })
        .catch((error)=>{
            console.log(error);
            
        })
    }

    toggle(cero){
        var result = this.state.DataAtenPendientes.filter((IdFiltrado)=>{
           return IdFiltrado._id === cero
        })

        this.setState({
            modal: !this.state.modal,
            DataFilter:result[0]
        });

        // console.log('dataFilter', result[0])
        console.log('SATATE dataFilter', this.state.DataFilter)
        // console.log('DataAtenPendientes',  this.state.DataAtenPendientes);
        
    }

    render() {
        const { DataAtenPendientes, DataFilter } = this.state;
        const columns = [
            {
                Header:  props => <b>USUARIO</b>,
                accessor: 'IdPaciente',
            },
            {
                Header:  props => <b>EXAMEN</b>,
                id: 'Examen',
                accessor: d => d.Examen[0].nomb_examen
            }, 
           
            {
                Header: props => <b>OPCIONES</b>, // Custom header components!
                accessor: '_id',
                Cell: row => (
                    <span>
                        <Button color="danger" className="btn btn-sm btn-outline-success ml-1 p-1" onClick={(e)=>this.toggle(row.value)}><FaEdit /></Button>
                    </span>
                )
            }
        ]
        
        const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '-23px', right: 'auto', right: '-16px' }} onClick={(e)=>this.toggle( this.state.DataFilter._id )}>&times;</button>;

        return (
            <div>
                <div className="card">
                    <div className="card-header p-1">
                        <label className="float-left pt-2"><b>LISTA DE ATENCIONES PENDIENTES </b></label>
                        <label className="float-right pt-2"><i> Cantidad de atenciones pendientes </i> 
                            <span className="badge badge-info">{ DataAtenPendientes.length }</span>
                        </label>
                       
                    </div>
                    <div className="card-body p-0">
                        <ReactTable
                            data={DataAtenPendientes}
                            columns={columns}
                            defaultPageSize={10}
                            className="-striped -highlight"
                            style={{
                                height: "-webkit-fill-available"
                            }}
                        /> 
                    </div>
                </div>

                <Modal isOpen={this.state.modal} fade={false} toggle={(e)=>this.toggle(this.state.DataFilter._id )} size='lg'>
                    {externalCloseBtn}
                    <ModalBody className="p-1 shadow-sm">
                        <div className="border">
                            <CompResult DatosActualizar = {DataFilter}/>
                        </div>
                    </ModalBody>
                </Modal>                
            </div>
            
        );
    }
}

export default AtenPendientes;