import React, { Component } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { FaEnvelope } from "react-icons/fa";

class MensajeNav extends Component {
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
                <Button id="Popover1" onClick={this.toggle}  size="sm" color="success">
                    <FaEnvelope />
                </Button>
                <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}  >
                    <PopoverHeader>
                        MENSAJES 
                    </PopoverHeader>
                    <PopoverBody>
                        Ang = german apaza ninaraque
                        Ang = german apaza ninaraque
                        Ang = german apaza ninaraque
                        Ang = german apaza ninaraque
                        Ang = german apaza ninaraque
                        <div className="border-top border-bottom bg-success">
                                demo
                            </div>
                            <div className="border-top border-bottom">
                                demo
                            </div>
                            <div className="border-top border-bottom">
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

export default MensajeNav;