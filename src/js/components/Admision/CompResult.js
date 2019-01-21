import React, { Component } from 'react';
import { TabContent, TabPane, Nav, tooltip, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import classnames from 'classnames';

class CompResult extends Component {
    constructor(props){
        super(props)
        this.toggle = this.toggle.bind(this);
        this.tabVertical = this.tabVertical.bind(this);
        this.state = {
          activeTab: '0',
          activeTabVertical: '0',
          DatosActualizar: props.DatosActualizar,
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
    }

    tabVertical(tabVertical){
        if (this.state.activeTabVertical !== tabVertical) {
            this.setState({
                activeTabVertical: tabVertical
            });
        }
        console.log(typeof(tabVertical))
        
    }
    render() {
        const { activeTab, DatosActualizar, activeTabVertical } = this.state
        return (
            <div>
                <Nav tabs>
                    {DatosActualizar.Examen.map((NombExamen, IExamen)=>
                        <NavItem key={IExamen}>
                            <NavLink className={classnames({ active: activeTab === IExamen.toString() })} onClick={() => { this.toggle(IExamen.toString()); }} >
                                {NombExamen.nomb_examen}
                            </NavLink>
                        </NavItem>
                    )}
                </Nav>
                <TabContent activeTab={activeTab} className="p-1">
                    { DatosActualizar.Examen.map((NombExamen, IExamen)=>

                        <TabPane tabId={IExamen.toString()}  key={IExamen} className="border">
                            <Row >
                                <Col sm="3">
                                    <Nav vertical>
                                        {NombExamen.grupo1.map((ExamenG1, IExamenG1)=>
                                            <NavItem key={ IExamenG1 } className="pl-1">
                                                <NavLink className={classnames({ active: activeTabVertical === IExamenG1.toString() })} onClick={() => { this.tabVertical(IExamenG1.toString()) }} className={ activeTabVertical === IExamenG1.toString()? 'border border-right-0 font-weight-bold' :'border-right'}>
                                                    {ExamenG1.nomb_examenGrupo1}
                                                </NavLink>
                                            </NavItem>
                                        )}
                                    </Nav>
                                </Col>

                                <Col sm="9">
                                    <TabContent activeTab={activeTabVertical}>
                                        {NombExamen.grupo1.map((ExamenG1, IExamenG1)=>
                                            <TabPane tabId={IExamenG1.toString()} key={ IExamenG1 }>
                                                <table className="table table-sm table-bordered table-hover mt-2 mr-4">
                                                    <thead>
                                                        <tr>
                                                            <th>NOMBRE DEL EXÁMEN </th>
                                                            <th>RESULTADO </th>
                                                            <th>UNIDAD DE MEDIDA </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {ExamenG1.grupo2.map((ExamenG2, IExamenG2)=>
                                                            <tr key={IExamenG2}>
                                                                <td>{ExamenG2.nombExamen2}</td>
                                                                <td> 
                                                                    <FormGroup>
                                                                        <Input valid  placeholder={ExamenG2.resultado} className="form-control form-control-sm"/>
                                                                        <FormFeedback valid>Ingrese el resultado de:</FormFeedback>
                                                                    </FormGroup>
                                                                </td>
                                                                <td>{ExamenG2.unidadMedida}</td>
                                                            </tr>
                                                        
                                                        ) }
                                                    </tbody>
                                                </table>

                                                
                                            </TabPane>
                                        )}

                                    </TabContent>

                                </Col>
                            </Row>
                        </TabPane>
                    )}
                </TabContent>
                <ModalFooter className="bg-light p-2">
                    <Button color="primary" onClick={this.modal}>Guardar</Button>                
                </ModalFooter>
            </div>
        );
    }
}

export default CompResult;