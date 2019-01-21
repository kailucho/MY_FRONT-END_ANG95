import React from "react";
import ReactDOM from "react-dom";
import AppAng from './js/components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import './css/bs4.css';

const wrapper = document.getElementById("zoe");
wrapper ? ReactDOM.render(<AppAng />, wrapper) : 'cargarndo desde el componente de react false';
