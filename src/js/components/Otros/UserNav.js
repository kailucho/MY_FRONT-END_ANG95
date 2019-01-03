import React, { Component } from 'react';
import { Button, Popover, PopoverBody } from 'reactstrap';
import { FaPowerOff } from "react-icons/fa";


class UserNav extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          popoverOpen: false
        };
      }
    
      toggle() {
        this.setState({
          popoverOpen: !this.state.popoverOpen
        });
      }
    render() {
        return (
            <div>
                <Button id="userLogin" onClick={this.toggle}  size="sm" color="success" className="mr-1">
                    Hola: {sessionStorage.getItem('user')}
                </Button>
                <Popover placement="bottom" isOpen={this.state.popoverOpen} target="userLogin" toggle={this.toggle}  >
                    <PopoverBody>
                        <label>Configuración</label>
                        <div className="divider"></div>
                        <label>Contraseña</label>
                        <div className="divider"></div>
                        <label>Actualizaciones</label>
                        <div className="divider"></div>
                        <label> <FaPowerOff color="red" className="p-0"/> Salir</label>
                    </PopoverBody>
                </Popover>
            </div>
        );
    }
}

export default UserNav;
