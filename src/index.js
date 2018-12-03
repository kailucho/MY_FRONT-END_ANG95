import React from "react";
import ReactDOM from "react-dom";
import AppAng from './js/components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';

const wrapper = document.getElementById("zoe");
wrapper ? ReactDOM.render(<AppAng />, wrapper) : false;
