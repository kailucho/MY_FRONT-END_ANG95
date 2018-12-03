import React, { Component } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { FaBell } from "react-icons/fa";

class NotificacionNav extends Component {
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
                <Button id="Popover2" onClick={this.toggle}  size="sm" color="success">
                    <FaBell />
                </Button>
                <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover2" toggle={this.toggle}  >
                    <PopoverHeader>
                        NOTIFICACIONES
                    </PopoverHeader>
                    <PopoverBody>
                        Ang = german apaza ninaraque

                        <div className="border-top border-bottom bg-success">
                                demo
                            </div>
                            <div className="border-top border-bottom bg-danger text-light">
                                demo
                            </div>
                            <div className="border-top border-bottom bg-info">
                                demo
                            </div>
                            <div className="border-top border-bottom">
                                demo
                            </div>
                    </PopoverBody>
                </Popover>
            </div>
        );
    }
}

export default NotificacionNav;