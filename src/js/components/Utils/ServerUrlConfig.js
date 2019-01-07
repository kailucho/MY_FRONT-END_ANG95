const axios = require('axios')

const UrlServer = "http://localhost:3000";
const Token = axios.defaults.headers.common['Authorization'] = `bearer ${sessionStorage.getItem('TuToken')}`;


module.exports = {
    UrlServer,
    Token
} 