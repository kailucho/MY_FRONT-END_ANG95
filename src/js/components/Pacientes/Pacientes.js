import React, { Component } from 'react';
import axios from 'axios';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardHeader, CardText, CardBody, Row, Col } from 'reactstrap';
import classnames from 'classnames';

class Pacientes extends Component {
  constructor() {
    super();

    this.state = {
      activeTab: '1',
      dataExamenes:[],
      inputBuscarUsuario:'',
      DataUsuario:[]
    };

    
    this.toggle = this.toggle.bind(this);
    this.buscar = this.buscar.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.convertirFecha = this.convertirFecha.bind(this);

  }

  componentWillMount(){
    axios.get('http://localhost:3000/examenes')
      .then((res) => {
          // console.log('rest',res.data);
          this.setState({
            dataExamenes: res.data
          })
      })
      .catch((error)=> {
          console.log('ocurrió un error al realizar la petición GET',error);
      });
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  buscar(event){
    event.preventDefault();

    axios.get(`http://localhost:3000/usuarios/${this.state.inputBuscarUsuario}`)
    .then((res)=>{
      //  console.log(res.data);
       this.setState({
        DataUsuario: res.data[0]
       })

       console.log('datausuario del state', this.state.DataUsuario);
       
    })
    .catch((err)=>{
      console.log('algo salió mal en realizar el reequest', err);
    });
  }

  handleChange(event) {
    this.setState({inputBuscarUsuario: event.target.value});
  }

  convertirFecha(fecha){
    var fechar = fecha;
    
    var date = new Date(fechar);
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var dt = date.getDate();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }
    console.log(year+'-' + month + '-'+dt);

    return ( dt +'-'+ month +'-'+ year);

  }

  render() {
    const { apellidos, dni, fnacimiento, nombre, sexo } = this.state.DataUsuario;
    return (
      <div>
        <Card>
          <CardHeader>
            <b>REGISTRAR NUEVA ATENCIÓN</b> 
          </CardHeader>
          <CardBody>
            <Card className="p-2 mb-2">
              <Row className="pb-2">
                <Col sm="6">
                  <fieldset>
                    <legend><b>DATOS DEL PACIENTE:</b></legend>
                    <form onSubmit={this.buscar}>
                      <div className ="input-group  input-group-sm mb-3">
                        <input type="text" className="form-control" placeholder="EL DNI DEL PACIENTE" value={this.state.inputBuscarUsuario} onChange={this.handleChange} />
                        <div className ="input-group-append">
                          <button className ="input-group-text btn" type="submit">BUSCAR</button>
                        </div>
                      </div>
                    </form>
                    <hr/>
                    
                      <div className="input-group input-group-sm mb-2">
                        <div className="input-group-prepend">
                          <span className="input-group-text">N° DNI</span>
                        </div>
                        <label className="form-control mr-2">{dni}</label>

                        <div className="input-group-prepend">
                          <span className="input-group-text">HCL</span>
                        </div>
                        <label className="form-control"></label>
                      </div>

                      <div className="input-group input-group-sm mb-2">
                        <div className="input-group-prepend">
                          <span className="input-group-text">F. DE NACIEMIENTO</span>
                        </div>
                        <label className="form-control mr-2">{this.convertirFecha(fnacimiento)}</label>

                        <div className="input-group-prepend">
                          <span className="input-group-text">EDAD</span>
                        </div>
                        <label className="form-control">{this.convertirFecha(fnacimiento)}</label>
                      </div>

                      <div className="input-group input-group-sm mb-2">
                        <div className="input-group-prepend">
                          <span className="input-group-text">NOMBRE</span>
                        </div>
                        <label className="form-control">{nombre}</label>
                      </div>
                      
                      <div className="input-group input-group-sm mb-2">
                        <div className="input-group-prepend">
                          <span className="input-group-text">APELLIDOS</span>
                        </div>
                        <label className="form-control">{apellidos}</label>
                        
                      </div>

                      <div className="input-group input-group-sm mb-2">
                        <div className="input-group-prepend">
                          <span className="input-group-text">SEXO</span>
                        </div>
                        <label className="form-control mr-2">{sexo}</label>

                        <div className="input-group-prepend">
                          <span className="input-group-text">SEXO</span>
                        </div>
                        <label className="form-control"></label>
                      </div>

                      <div className="input-group input-group-sm mb-2">
                        <div className="input-group-prepend">
                          <span className="input-group-text">DNI</span>
                        </div>
                        <label className="form-control"></label>
                      </div>

                      <div className="input-group input-group-sm mb-2">
                        <div className="input-group-prepend">
                          <span className="input-group-text">DNI</span>
                        </div>
                        <label className="form-control"></label>
                      </div>

                  </fieldset> 
                </Col>
                <Col sm="6">
                  <fieldset>
                    <legend><b>REFERIR AL COSULTORIO:</b></legend>
                    <select className="form-control-sm form-control">
                      <option>Seleccione:</option>
                      <option>Laboratorio</option>
                      <option>Medicina</option>
                      <option disabled >Odontologia</option>
                      <option disabled >Enfermeria</option>
                    </select>
                  </fieldset> 
                </Col>
              </Row>
            </Card>
            <Nav tabs className="border border-button-0">
              {this.state.dataExamenes.map((examen , i)=>
                <NavItem key={ i }>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === (i+1).toString() })}
                    onClick={() => { this.toggle((i+1).toString()); }}
                  >
                    {examen.nomb_examen}
                  </NavLink>
                </NavItem>
              )}
            </Nav>

            <TabContent activeTab={this.state.activeTab} className="border border-top-0 p-2 bg-white">

              {this.state.dataExamenes.map((examen , i)=>
              
                <TabPane tabId={(i+1).toString()} key={ i }>
                  <Row>
                    {examen.grupo1.map((subExam , ind ) =>

                      <Col sm="3" key={ ind }>
                        <fieldset>
                          <legend>{subExam.nomb_examenGrupo1} </legend>
                    
                              <form action="">
                                <div className="d-flex flex-column-reverse">
                                  {subExam.grupo2.map((subExam2, inde)=>

                                    <label key={ inde }>
                                      <input type="checkbox" name={subExam2.nombExamen2} value="opcion1" /> { ' ' }
                                        {subExam2.nombExamen2}                              
                                    </label>
                                  )}

                                </div>
                                <div className="border-top p-1 clearfix">
                                  <button className="btn btn-sm btn-outline-primary pt-0 pb-0  float-right">
                                    Guardar
                                  </button>
                                </div>
                              </form>
                              
                        </fieldset>
                      </Col>
                    )}
                  </Row>
                </TabPane>
              )}

            </TabContent>
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default Pacientes;