import React, { Component } from 'react';
import axios from 'axios';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
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
    axios.get('http://localhost:4200/Atenciones')
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
        <Nav tabs className="border border-button-0">
          {this.state.dataExamenes.map((examen , i)=>
            <NavItem key={ i }>
              <NavLink
                className={classnames({ active: this.state.activeTab === (i+1).toString() })}
                onClick={() => { this.toggle((i+1).toString()); }}
              >
                {examen.nomb_examen_1}
              </NavLink>
            </NavItem>
          )}
        </Nav>

        <TabContent activeTab={this.state.activeTab} className="border border-top-0 p-2">

          {this.state.dataExamenes.map((examen , i)=>
          
            <TabPane tabId={(i+1).toString()} key={ i } >
              <Row>
                {examen.sub2.map((subExam , ind ) =>

                  <Col sm="3" key={ ind }>
                    <fieldset>
                      <legend>{subExam.nomb_examen_2} </legend>
                
                          <form action="">
                            <div className="d-flex flex-column-reverse">
                              {subExam.sub3.map((subExam3, inde)=>

                                <label key={ inde }>
                                  <input type="checkbox" name="" id="" value="opcion1" /> { ' ' }
                                    {subExam3.nomb_examen_3}                              
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
      </div>
    );
  }
}
export default MetradosDiarios;