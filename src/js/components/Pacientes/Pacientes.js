import React, { Component } from 'react';
import axios from 'axios';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardHeader, CardText, CardBody, Row, Col } from 'reactstrap';
import classnames from 'classnames';

class MetradosDiarios extends Component {
  constructor() {
    super();

    this.toggle = this.toggle.bind(this);

    this.state = {
      activeTab: '1',
      dataExamenes:[]
    };
  }

  componentWillMount(){
    axios.get('http://localhost:3000/examenes')
      .then((res) => {
          // console.log('rest',res.data);
          this.setState({
            dataExamenes: res.data
          })
      })
      .catch(function (error) {
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
  render() {
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
                    <input type="text" className="form-control-sm form-control" />
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
export default MetradosDiarios;