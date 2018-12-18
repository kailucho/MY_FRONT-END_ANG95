import React, { Component } from 'react';
import { FaAlignJustify, FaChartLine, FaHome, FaHouseDamage, FaInfinity, FaPeopleCarry, FaLinode, FaSuperscript, FaAngleRight } from 'react-icons/fa';
import { UncontrolledCollapse } from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import UserNav from './Otros/UserNav';
import NotificacionNav from './Otros/NotificacionNav';
import MensajeNav from "./Otros/MensajesNav";
import Inicio from './Inicio/Inicio';
import Pacientes from './Pacientes/pacientes';
import Ingreso from './Otros/Ingreso';
import Profesiones from './Administracion/Profesiones'    
import Login from './Login/Login'    

class AppAng extends Component {
    constructor(){
        super();
        this.state = {
            navbarExpland: true,
            btnActivo: true
        }

        this.ButtonToogle = this.ButtonToogle.bind(this);
        this.BtnActivo = this.BtnActivo.bind(this);
    }

    
    ButtonToogle(){
        this.setState({
            navbarExpland: !this.state.navbarExpland
        });
        localStorage.setItem('opcionBtnToogle', this.state.navbarExpland);

        // console.log('>>',JSON.parse( localStorage.getItem('opcionBtnToogle')));
        // console.log('>><<',this.state.navbarExpland);
    }
   

    BtnActivo(){
        this.setState({
            btnActivo: !this.state.btnActivo
        });
        // debugger;
    };



    render() {
        return (
            <Router>
                <div>
                    <nav className="navbar navbar-dark fixed-top bg-success flex-md-nowrap p-0 shadow">
                        <span className="navbar-brand col-sm-3 col-md-2 mr-0">
                            <FaInfinity /> LAB. ORION
                            <button className="btn btn-link btn-sm m-0 p-0 float-right text-white" onClick={ this.ButtonToogle }>
                            <FaAlignJustify />
                            </button>
                        </span>
                        <div className="clearfix d-none d-sm-block p-0 m-0">
                            <div className="float-right"><UserNav/></div>
                            <div className="float-right"><MensajeNav /></div>
                            <div className="float-right"><NotificacionNav /></div>
                        </div>
                    </nav>

                    <div className="container-fluid">
                        <div className="row">
                            <nav className={JSON.parse(localStorage.getItem('opcionBtnToogle')) ? 'col-md-2 navbarExpland d-none d-md-block bg-light sidebar': "navbarCollapse bg-light sidebar"}>
                                <div className="sidebar-sticky">
                                    <ul className="nav flex-column ull">
                                        <li className="lii border-top">
                                            <Link to="/Inicio" className="nav-link"> <FaHouseDamage /><span> INICIO</span> </Link>
                                        </li>
                                        <li className="lii">
                                            <Link to="/Ingreso" onClick={ this.BtnActivo } className={this.state.btnActivo ? "nav-link" : "nav-link btn-activo" } ><FaChartLine/><span> ESTADISTICAS</span></Link>
                                        </li>

                                        <li className="lii">
                                            <a className="nav-link"  href="#about" id="ADMINS"><FaSuperscript /><span> ADMINISIÓN <div className="float-right"><FaAngleRight /></div> </span> </a>
                                                <UncontrolledCollapse toggler="#ADMINS">
                                                    <ul className="nav flex-column ull">
                                                        <li className="lii">
                                                            <Link to="NuevaAtencion" className="nav-link"><FaLinode /> Pacientes</Link>
                                                        </li>
                                                        <li className="lii">
                                                            <a className="nav-link" href="#about"> <FaLinode /> Referir</a>
                                                        </li>
                                                    </ul>
                                                </UncontrolledCollapse>
                                        </li>

                                        <li className="lii">
                                            <a className="nav-link"  href="#about" id="CONFIG"><FaPeopleCarry /><span> CONFIGURACIÓN <div className="float-right"><FaAngleRight /></div> </span> </a>
                                                <UncontrolledCollapse toggler="#CONFIG">
                                                    <ul className="nav flex-column ">
                                                        <li className="lii">
                                                            <Link to="NuevaAtencion" className="nav-link"><FaLinode /> Diarios</Link>
                                                        </li>
                                                        <li className="lii">
                                                            <a className="nav-link" href="#about">sub--</a>
                                                        </li>
                                                        <li className="lii">
                                                            <a className="nav-link" href="#about">sub---</a>
                                                        </li>
                                                    </ul>
                                                </UncontrolledCollapse>
                                        </li>
                                        
                                        <li className="lii">
                                            <a className="nav-link" href="#about" id="ADMIM"><FaSuperscript /><span> ADMINISTRACIÓN <div className="float-right"><FaAngleRight /></div> </span> </a>
                                                <UncontrolledCollapse toggler="#ADMIM">
                                                    <ul className="nav flex-column ">
                                                        <li className="lii">
                                                            <Link to="NuevaAtencion" className="nav-link pl-4"><FaLinode /> Empleados</Link>
                                                        </li>
                                                        <li className="lii">
                                                            <a className="nav-link pl-4" href="#about">Empleados</a>
                                                        </li>
                                                        <li className="lii">
                                                            <a className="nav-link pl-4" href="#about">Consultorios</a>
                                                        </li>
                                                        <li className="lii">
                                                            <Link to="Profesiones" className="nav-link pl-4">Profesiones</Link>
                                                        </li>
                                                    </ul>
                                                </UncontrolledCollapse>
                                        </li>
                                    </ul>
                                </div>
                            </nav>

                            <main role="main" className="col ml-sm-auto col-lg px-2">
                                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                    <h6 className="">
                                        BIENVENIDO HOY ES : {Date()}
                                    </h6>
                                    <div className="btn-toolbar mb-2 mb-md-0">
                                        <div className="btn-group mr-2">
                                            <button type="button" className="btn btn-sm btn-outline-secondary">Exportar</button>
                                            <button type="button" className="btn btn-sm btn-outline-secondary">PDF</button>
                                        </div>
                                        <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
                                            <span data-feather="calendar"></span>
                                            OPCIONES
                                        </button>
                                    </div>
                                </div>

                                <div className="px-1">
                                    <Route exact path="/" component={Login} />
                                    <Route path ="/Inicio" component={Inicio} />
                                    <Route path="/NuevaAtencion" component={Pacientes} />
                                    <Route path="/Profesiones" component={Profesiones} />
                                    <Route path="/Ingreso" component={Ingreso} />
                                    <Route path="/topics" component={Topics} />
                                    {/* <br/>
                                    <ButtonParent /> */}
                                </div>

                            </main>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}
export default AppAng;



class ButtonParent extends Component {
    constructor() {    
      super();
      this.state = {
        condition: false
      }
      this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
      this.setState({
        condition: !this.state.condition
      })
    }

    render() {
      return (
        <div>
            <button onClick={ this.handleClick } className="btn btn-rounded btn-dark">
                demo press 
            </button>

            <div className={ this.state.condition ? " btn button  toggled" : "btn button bg-success " }>
                <canvas className="my-4 w-100 border m-2W" id="myChart" width="900" height="380"></canvas>
            </div>
        </div>
            
      )
    }
  }
// ssssssssssssss

const Home = () => (
    <div>
      <h2>Homesssssss</h2>
    </div>
  );
  

  
  const Topics = () => (
    <div>
      <h2>topics como la vaina como sin nada</h2>
      <ButtonParent/>
    </div>
  );