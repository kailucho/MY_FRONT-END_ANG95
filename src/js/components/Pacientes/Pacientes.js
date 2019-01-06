import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';

import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardHeader, CardText, CardBody, Row, Col } from 'reactstrap';
import classnames from 'classnames';

class Pacientes extends Component {
  constructor() {
    super();

    this.state = {
      activeTab: '1',
      dataExamenes:[],
      inputBuscarUsuario:'',
      DataUsuario:[],
      DataSubmit:[],
      DataSend:[],
      StatePushCheckBox:[]
    };

    
    this.toggle = this.toggle.bind(this);
    this.FormBuscar = this.FormBuscar.bind(this)
    this.inputBuscarUsuario = this.inputBuscarUsuario.bind(this);
    this.CalculEdad = this.CalculEdad.bind(this);
    this.FrmGuardarAtencion = this.FrmGuardarAtencion.bind(this);
    this.CapturaImputs = this.CapturaImputs.bind(this)

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

  FormBuscar(event){
    event.preventDefault();

    axios.get(`http://localhost:3000/usuarios/${this.state.inputBuscarUsuario}`)
    .then((res)=>{
      //  console.log(res.data);
       this.setState({
        DataUsuario: res.data[0]
       })       
    })
    .catch((err)=>{
      console.log('algo salió mal en realizar el reequest', err);
    });
  }

  inputBuscarUsuario(event) {
    this.setState({inputBuscarUsuario: event.target.value});
  }

  CalculEdad(fn){
    var fecha = new Date();
    var anoActual = fecha.getFullYear();
    var mesActual = fecha.getMonth()+1;
    
    var date = new Date(fn);
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var dt = date.getDate()+1;

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }
    var edad = anoActual - year
    // console.log('fecha normal', dt+'-' + month + '-'+ year + 'edad>', edad+ 'MESES>', month);

    return ( 
      <div className="input-group input-group-sm mb-2">
        <div className="input-group-prepend">
          <span className="input-group-text">F. NACIEMIENTO</span>
        </div>
        <label className="form-control mr-2">{ dt + '-' + month + '-'+ year }</label>

        <div className="input-group-prepend">
          <span className="input-group-text">EDAD</span>
        </div>
        <label className="form-control">{ edad }</label>
        
        <div className="input-group-prepend">
          <span className="input-group-text">MESES</span>
        </div>
        <label className="form-control">{ mesActual - month }</label>
      </div>
    );
  }

  FrmGuardarAtencion(e,i){
    e.preventDefault()
    var response = [];
    var estructSubmit = []

    var groupDeep = _.groupBy(this.state.DataSend, "nomb_examen");

    Object.keys(groupDeep).forEach(deep1 => {

      let grupo1 = _.map(groupDeep[deep1], x => {

        var groupDeep2 = _.groupBy(this.state.DataSend, "nomb_examen");

        return x["grupo1"][0]
      });

      var groupDeep3 = _.groupBy(grupo1, "nomb_examenGrupo1");

      response.push({
        nomb_examen: deep1,
        grupo1: Object.keys(groupDeep3).map(key => ({

          nomb_examenGrupo1: key,

          grupo2: groupDeep3[key].map(x => x["grupo2"])
        }))
      })
      
      
    });
    estructSubmit.push({
      EstAtencion:false,
      FechaAtencion:new Date(),
      IdPaciente:"12660",
      Examen: response
    })
    this.setState({
      DataSubmit:estructSubmit
    })
    console.log('response', estructSubmit);
    

  }

  CapturaImputs(e, i, ind1, inde, unidadMedida, precio ) {
    console.log('uno>',i,' dos>',ind1 ,' tres>', inde);

    var content = {
      [e.target.name]: e.target.value,
      unidadMedida: unidadMedida,
      precio: precio,
      resultado:""
    }

    // if(i === 0){
      // accecedo al state principal

      var nomb_examen = this.state.dataExamenes[i].nomb_examen
      // console.log('nomb_examen>', nomb_examen);

      const nomb_examenGrupo1 =  this.state.dataExamenes[i].grupo1[ind1].nomb_examenGrupo1
      // console.log('grupo1>', nomb_examenGrupo1);
      console.log('>>>', this.state.dataExamenes[i].grupo1[ind1].grupo2[inde]);
      
        
      this.state.StatePushCheckBox.push(this.state.dataExamenes[i].grupo1[ind1].grupo2[inde])
        
      // console.log('content>', this.state.StatePushCheckBox);
        
      this.state.DataSend.push({
        nomb_examen,
        "grupo1": [
          {
            nomb_examenGrupo1,
            grupo2:this.state.dataExamenes[i].grupo1[ind1].grupo2[inde]
          }
        ]
      })
      console.log('DataSend0>', this.state.DataSend);

  }

  render() {
    const { hcl, apellidos, dni, fnacimiento, nombre, sexo } = this.state.DataUsuario;
    return (
      <div>
        <Card>
          <CardHeader>
            <b>REGISTRAR NUEVA ATENCIÓN</b> 
          </CardHeader>
          <CardBody>
            <Card className="p-2 mb-2">
              <Row className="pb-2">
              <Col sm="8">
                  <fieldset>
                    <legend><b>DATOS DEL PACIENTE:</b></legend>
                    {/* <code><pre>{JSON.stringify(this.state.DataSubmit, null , ' ')}</pre></code> */}

                    <form onSubmit={this.FormBuscar}>
                      <div className="pb-2 ">
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" defaultChecked={true} />
                          <label className="form-check-label" htmlFor="inlineRadio1">DNI</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" disabled/>
                          <label className="form-check-label" htmlFor="inlineRadio2">HCL</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" disabled/>
                          <label className="form-check-label" htmlFor="inlineRadio3">NOMBRE Y APELLIDOS</label>
                        </div>
                      </div>
                      <div className ="input-group  input-group-sm mb-3">
                       
                        <input type="text" name="inputBuscarUsuario" className="form-control" placeholder="Ingrese el dni" required value={this.state.inputBuscarUsuario} onChange={this.inputBuscarUsuario} />
                        <div className ="input-group-append">
                          <button className ="input-group-text btn" type="submit">BUSCAR</button>
                        </div>
                      </div>
                    </form>
                    <hr/>
                    {fnacimiento === undefined ? "":
                    <div>
                      <div className="input-group input-group-sm mb-2">
                        <div className="input-group-prepend">
                          <span className="input-group-text">N° DNI</span>
                        </div>
                        <label className="form-control mr-2">{dni}</label>

                        <div className="input-group-prepend">
                          <span className="input-group-text">HCL</span>
                        </div>
                        <label className="form-control">{ hcl }</label>
                      </div>


                      {this.CalculEdad(fnacimiento)}
                      

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
                    </div>}
                  </fieldset> 
                  {/* <code><pre>{JSON.stringify(this.state.DataSend, null, ' ')}</pre></code> */}

                </Col>
                <Col sm="4">
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
            <fieldset>
              <legend><b>REGISTRAR EXÁMEN DE LABORATORIO </b></legend>
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
                    <form onSubmit={(e)=> this.FrmGuardarAtencion(e, i)} className="form-group">

                      <Row>
                        {examen.grupo1.map((subExam , ind1 ) =>

                          <Col sm="3" key={ ind1 }>
                              <fieldset>
                                <legend>{subExam.nomb_examenGrupo1} </legend>
                                  <div className="d-flex flex-column-reverse">
                                    {subExam.grupo2.map((subExam2, inde)=>

                                      <label key={ inde }>
                                        <input type="checkbox" name="nombExamen2" value={subExam2.nombExamen2} onClick={(e) => this.CapturaImputs(e, i, ind1, inde, subExam2.unidadMedida, subExam2.precio) } /> { ' ' }
                                          {subExam2.nombExamen2}                          
                                      </label>
                                    )}
                                  </div>                                
                              </fieldset>
                          </Col>
                        )}
                        
                      </Row> 
                        <button className="btn btn-xl btn-outline-primary pt-0 pb-0  float-right" type="submit">
                          Guardar
                        </button>
                    </form>
                  </TabPane>
                )}

              </TabContent>
            </fieldset>
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default Pacientes;