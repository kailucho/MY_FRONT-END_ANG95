import React, { Component } from 'react';
import axios from 'axios';

class Ingreso extends Component {
    constructor() {
        super();
        this.state = {
            dataUsuarios: []
        }

        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount() {
        axios.get('http://localhost:4200/strains')
            .then((res) => {
                console.log('rest',res.data);
                this.setState({
                    dataUsuarios: res.data
                })
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log(this.state.dataUsuarios)
    }
    render() {
        return (
            <div>
                <div className="card">
                    <div className="card-header">
                        sss
                    </div>
                    <div className="card-body">
                        <fieldset>
                            <legend>usuarios {this.state.dataUsuarios.length}</legend>
                            
                            {this.state.dataUsuarios.map((user, i) =>
                                <div key={i}>
                                    <h1>{user.nomb_usuario}</h1>
                                </div>
                            )}
                        </fieldset>
                    </div>
                </div>
            </div>
        )
    }
}
export default Ingreso;